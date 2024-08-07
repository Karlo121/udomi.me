use poem::error::InternalServerError;
use poem::{web::Data, Error, Result};
use poem_openapi::{payload::Json, OpenApi};
use sqlx::PgPool;

use crate::api::tags::ApiTags;
use crate::models::breed::Breed;

pub struct BreedApi;

type BreedResponse = Result<Json<Vec<Breed>>>;

#[OpenApi]
impl BreedApi {
    #[oai(path = "/breeds", method = "get", tag = "ApiTags::Breed")]
    async fn get_all_breeds(&self, pool: Data<&PgPool>) -> Result<Json<Vec<Breed>>> {
        let breeds = sqlx::query_as!(
            Breed,
            r#"
            SELECT id, name, species_id
            FROM breeds
            "#
        )
        .fetch_all(pool.0)
        .await
        .map_err(|e| {
            eprintln!("Error fetching breeds: {:?}", e);
            InternalServerError(e)
        })?;

        Ok(Json(breeds))
    }
}
