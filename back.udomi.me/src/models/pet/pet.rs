use serde::{Serialize, Deserialize};
use poem_openapi::Object;

#[derive(Debug, Clone, Serialize, Deserialize, Object)]
pub struct Pet {
    pub id: i32,
    pub name: String,
}
