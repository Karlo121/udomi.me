use poem_openapi::Object;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, Object)]
pub struct Breed {
    pub id: i32,
    pub name: String,
    pub species_id: i32,
}
