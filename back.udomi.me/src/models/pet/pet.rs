use chrono::{DateTime, Utc};
use poem_openapi::{Enum, Object};
use serde::{Deserialize, Serialize};
use sqlx::Type;
use std::fmt;
use std::str::FromStr;

#[derive(Debug, Clone, Serialize, Deserialize, Enum, Type, Copy)]
#[sqlx(type_name = "gender", rename_all = "lowercase")]
pub enum Gender {
    Male,
    Female,
    Unknown,
}

impl FromStr for Gender {
    type Err = GenderParseError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_lowercase().as_str() {
            "male" => Ok(Gender::Male),
            "female" => Ok(Gender::Female),
            "unknown" => Ok(Gender::Unknown),
            _ => Err(GenderParseError::InvalidGender),
        }
    }
}

#[derive(Debug, Clone)]
pub enum GenderParseError {
    InvalidGender,
}

impl fmt::Display for GenderParseError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Invalid gender value")
    }
}

impl std::error::Error for GenderParseError {}

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
    pub image_url: Option<String>,
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
