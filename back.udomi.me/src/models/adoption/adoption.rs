use chrono::{DateTime, Utc};
use poem_openapi::{Enum, Object};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, Enum)]
pub enum AdoptionStatus {
    Pending,
    Approved,
    Rejected,
}

#[derive(Debug, Clone, Serialize, Deserialize, Object)]
pub struct Adoption {
    pub id: i32,
    pub pet_id: i32,
    pub user_id: i32,
    pub status: AdoptionStatus,
    pub request_date: DateTime<Utc>,
    pub adoption_date: Option<DateTime<Utc>>,
}
