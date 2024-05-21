use poem::error::InternalServerError;
use serde::{Serialize, Deserialize};
use poem_openapi::Object;
use poem_openapi::{OpenApi, payload::Json, payload::PlainText};
use poem::{Error, Result, web::Data};
use sqlx::PgPool;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize, Object)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub password_hash: String,
    pub created_at: DateTime<Utc>,
    pub last_login: Option<DateTime<Utc>>,
}

#[derive(Debug, Deserialize, Serialize, Object)]
pub struct RegisterUser {
    pub username: String,
    pub email: String,
    pub password: String,
}

#[derive(Debug, Deserialize, Serialize, Object)]
pub struct LoginUser {
    pub username: String,
    pub password: String,
}