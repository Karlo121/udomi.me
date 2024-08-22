use chrono::{DateTime, Utc};
use poem_openapi::{Enum, Object};
use serde::{Deserialize, Serialize};
use sqlx::Type as SqlxType;

#[derive(Debug, Deserialize, Serialize, Object)]
pub struct CreateAdoption {
    pub pet_id: i32,
    pub user_id: i32,
    pub owner_id: i32,
    pub status: AdoptionStatus, // Use the enum instead of a String
    pub request_date: DateTime<Utc>,
}

#[derive(Debug, Deserialize, Serialize, Enum, SqlxType, Clone)]
#[sqlx(type_name = "adoption_status", rename_all = "lowercase")]
#[oai(rename_all = "lowercase")]
pub enum AdoptionStatus {
    Pending,
    Approved,
    Rejected,
}

#[derive(Debug, Deserialize, Serialize, Object)]
pub struct AdoptionResponse {
    pub id: i32,
    pub pet_id: i32,
    pub user_id: i32,
    pub owner_id: i32,
    pub status: AdoptionStatus,
    pub request_date: DateTime<Utc>,
    pub adoption_date: Option<DateTime<Utc>>,
}
