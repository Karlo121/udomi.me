use argon2::{self, Argon2, PasswordHash, PasswordHasher, PasswordVerifier};
use chrono::{DateTime, Utc};
use poem::error::InternalServerError;
use poem::http::StatusCode;
use poem::{web::Data, Error, Result};
use poem_openapi::param::Path;
use poem_openapi::{payload::Json, OpenApi};
use rand::rngs::OsRng;
use sqlx::PgPool;

use crate::api::tags::ApiTags;
use crate::models::user::{LoginUser, RegisterUser, User, UserResponse};

pub struct UserApi;

#[OpenApi]
impl UserApi {
    #[oai(path = "/register", method = "post", tag = "ApiTags::User")]
    async fn register_user(
        &self,
        pool: Data<&PgPool>,
        user: Json<RegisterUser>,
    ) -> Result<Json<UserResponse>> {
        let salt = argon2::password_hash::SaltString::generate(&mut OsRng);
        let argon2 = Argon2::default();
        let password_hash = argon2
            .hash_password(user.password.as_bytes(), &salt)
            .map_err(|e| Error::from_status(StatusCode::INTERNAL_SERVER_ERROR))?
            .to_string();

        let new_user = sqlx::query_as!(
            User,
            r#"
            INSERT INTO users (username, email, password_hash, phone_number)
            VALUES ($1, $2, $3, $4)
            RETURNING id, username, email, phone_number, password_hash, created_at, last_login
            "#,
            user.username,
            user.email,
            password_hash,
            user.phone_number
        )
        .fetch_one(pool.0)
        .await
        .map_err(InternalServerError)?;

        Ok(Json(UserResponse {
            id: new_user.id,
            username: new_user.username,
            email: new_user.email,
            phone_number: new_user.phone_number,
            created_at: new_user.created_at,
            last_login: new_user.last_login,
        }))
    }

    #[oai(path = "/login", method = "post", tag = "ApiTags::User")]
    async fn login_user(
        &self,
        pool: Data<&PgPool>,
        user: Json<LoginUser>,
    ) -> Result<Json<UserResponse>> {
        let stored_user = sqlx::query!(
            r#"
            SELECT id, username, email, phone_number, password_hash, created_at, last_login 
            FROM users WHERE username = $1
            "#,
            user.username
        )
        .fetch_one(pool.0)
        .await
        .map_err(InternalServerError)?;

        let parsed_hash = PasswordHash::new(&stored_user.password_hash)
            .map_err(|_| Error::from_status(StatusCode::INTERNAL_SERVER_ERROR))?;

        let argon2 = Argon2::default();

        let is_valid = argon2
            .verify_password(user.password.as_bytes(), &parsed_hash)
            .is_ok();

        if is_valid {
            sqlx::query!(
                "UPDATE users SET last_login = $1 WHERE id = $2",
                Utc::now(),
                stored_user.id
            )
            .execute(pool.0)
            .await
            .map_err(InternalServerError)?;

            Ok(Json(UserResponse {
                id: stored_user.id,
                username: stored_user.username,
                email: stored_user.email,
                phone_number: stored_user.phone_number,
                created_at: stored_user.created_at,
                last_login: stored_user.last_login,
            }))
        } else {
            Err(Error::from_status(StatusCode::UNAUTHORIZED))
        }
    }

    #[oai(path = "/users/:id", method = "get", tag = "ApiTags::User")]
    async fn get_user_by_id(
        &self,
        pool: Data<&PgPool>,
        id: Path<i32>,
    ) -> Result<Json<UserResponse>> {
        println!("{0}", *id);
        let user = sqlx::query_as!(
            UserResponse,
            r#"
            SELECT id, username, email, phone_number, created_at, last_login 
            FROM users WHERE id = $1
            "#,
            *id
        )
        .fetch_one(pool.0)
        .await
        .map_err(|e| {
            eprintln!("Error fetching user: {:?}", e);
            InternalServerError(e)
        })?;

        Ok(Json(user))
    }
}
