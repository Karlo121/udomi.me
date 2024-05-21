use poem::error::InternalServerError;
use poem_openapi::{OpenApi, payload::Json, payload::PlainText};
use poem::{Error, Result, web::Data};
use sqlx::PgPool;

use crate::models::pet::Pet;
use crate::api::tags::ApiTags;
pub struct PetApi;

type PetResponse = Result<Json<Vec<Pet>>>;

#[OpenApi]
impl PetApi {
    #[oai(path = "/get_pets", method = "get", tag = "ApiTags::Pet")]
    async fn get_pets(&self, pool: Data<&PgPool>) -> PetResponse {
        let pets = sqlx::query_as!(Pet, "SELECT id, name FROM pets")
            .fetch_all(pool.0)
            .await
            .map_err(InternalServerError)?;

        Ok(Json(pets))
    }   

    #[oai(path = "/create_pet", method = "post", tag = "ApiTags::Pet")]
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
