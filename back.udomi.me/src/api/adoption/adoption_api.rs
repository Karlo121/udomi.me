use chrono::Utc;
use poem::{http::StatusCode, web::Data, Error, Result};
use poem_openapi::{payload::Json, OpenApi};
use sqlx::PgPool;

use crate::api::tags::ApiTags;
use crate::models::adoption::{AdoptionResponse, AdoptionStatus, CreateAdoption};

pub struct AdoptionApi;

#[OpenApi]
impl AdoptionApi {
    #[oai(path = "/adoptions", method = "post", tag = "ApiTags::Adoption")]
    pub async fn create_adoption(
        &self,
        pool: Data<&PgPool>,
        Json(adoption): Json<CreateAdoption>,
    ) -> Result<Json<AdoptionResponse>, Error> {
        // First, check if the adoption already exists
        let existing_adoption = sqlx::query_scalar!(
            "SELECT 1 FROM adoptions WHERE pet_id = $1 AND user_id = $2",
            adoption.pet_id,
            adoption.user_id
        )
        .fetch_optional(pool.0)
        .await
        .map_err(|e| {
            Error::from_string(
                format!("Failed to check existing adoption: {:?}", e),
                StatusCode::INTERNAL_SERVER_ERROR,
            )
        })?;

        if existing_adoption.is_some() {
            // Adoption already exists, return conflict without attempting to insert
            return Err(Error::from_string(
                "This user has already requested adoption for this pet.".to_string(),
                StatusCode::CONFLICT,
            ));
        }

        // Proceed with insertion if no existing adoption
        let new_adoption = sqlx::query_as!(
            AdoptionResponse,
            r#"
            INSERT INTO adoptions (pet_id, user_id, owner_id, status, request_date)
            VALUES ($1, $2, $3, $4::adoption_status, $5)
            RETURNING id, pet_id, user_id, owner_id, status as "status: AdoptionStatus", request_date, adoption_date
            "#,
            adoption.pet_id,
            adoption.user_id,
            adoption.owner_id,
            adoption.status.clone() as AdoptionStatus,
            adoption.request_date,
        )
        .fetch_one(pool.0)
        .await
        .map_err(|e| {
            Error::from_string(
                format!("Failed to insert adoption: {:?}", e),
                StatusCode::INTERNAL_SERVER_ERROR,
            )
        })?;

        Ok(Json(new_adoption))
    }
}
