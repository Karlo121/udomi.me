use chrono::{DateTime, Utc};
use poem::error::InternalServerError;
use poem::{web::Data, Error, Result};
use poem_openapi::Object;
use poem_openapi::{payload::Json, payload::PlainText, OpenApi};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

#[derive(Debug, Clone, Serialize, Deserialize, Object)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub password_hash: String,
    pub phone_number: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
    pub last_login: Option<DateTime<Utc>>,
}

#[derive(Debug, Deserialize, Serialize, Object)]
pub struct RegisterUser {
    pub username: String,
    pub email: String,
    pub password: String,
    pub phone_number: Option<String>,
}

#[derive(Debug, Deserialize, Serialize, Object)]
pub struct LoginUser {
    pub username: String,
    pub password: String,
}

#[derive(Debug, sqlx::FromRow, Serialize, Deserialize, Object)]
pub struct UserResponse {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub phone_number: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
    pub last_login: Option<DateTime<Utc>>,
}
