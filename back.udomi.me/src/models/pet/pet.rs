use chrono::{DateTime, Utc};
use poem_openapi::{Enum, Object};
use serde::{Deserialize, Serialize};
use sqlx::Type;

#[derive(Debug, Clone, Serialize, Deserialize, Enum, Type, Copy)]
#[sqlx(type_name = "gender", rename_all = "lowercase")]
pub enum Gender {
    Male,
    Female,
    Unknown,
}

#[derive(Debug, Clone, Serialize, Deserialize, Object)]
pub struct Pet {
    pub id: i32,
    pub name: String,
    pub breed_id: i32,
    pub age: i32,
    pub description: String,
    pub gender: Gender,
    pub adopted: bool,
    pub created_at: Option<DateTime<Utc>>,
    pub created_by: i32,
}

#[derive(Debug, Deserialize, Serialize, Object)]
pub struct CreatePet {
    pub name: String,
    pub breed_id: i32,
    pub age: i32,
    pub description: String,
    pub gender: Gender,
    pub created_by: i32,
}
