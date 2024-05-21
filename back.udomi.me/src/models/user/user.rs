use poem::error::InternalServerError;
use serde::{Serialize, Deserialize};
use poem_openapi::Object;
use poem_openapi::{OpenApi, payload::Json, payload::PlainText};
use poem::{Error, Result, web::Data};
use sqlx::PgPool;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize, Object)]
pub struct User {
    id: i32,
    username: String,
    email: String,
    password_hash: String,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
    last_login: Option<DateTime<Utc>>,
}

pub struct UserApi;

type UserResponse = Result<Json<Vec<User>>>;
