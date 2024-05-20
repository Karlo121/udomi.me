use poem::error::InternalServerError;
use serde::{Serialize, Deserialize};
use poem_openapi::Object;
use poem_openapi::{OpenApi, payload::Json, payload::PlainText};
use poem::{Error, Result, web::Data};
use sqlx::PgPool;

use super::error::ApiError;

#[derive(Debug, Clone, Serialize, Deserialize, Object)]
pub struct Pet {
    id: i32,
    name: String,
}

pub struct PetApi;

type PetResponse = Result<Json<Vec<Pet>>>;

#[OpenApi]
impl PetApi {
    #[oai(path = "/pets", method = "get")]
    async fn get_pets(&self, pool: Data<&PgPool>) -> PetResponse {
        let pets = sqlx::query_as!(Pet, "SELECT id, name FROM pets")
            .fetch_all(pool.0)
            .await
            .map_err(ApiError::DatabaseError)?;

        Ok(Json(pets))
    }

    #[oai(path = "/pets", method = "post")]
    async fn create_pet(
        &self,
        pool: Data<&PgPool>,
        name: PlainText<String>,
    ) -> Result<Json<i32>> {
        let id = sqlx::query!(
            "INSERT INTO pets (name) VALUES ($1) RETURNING id",
            name.0
        )
        .fetch_one(pool.0)
        .await
        .map_err(InternalServerError)?
        .id;

        Ok(Json(id))
    }
}
