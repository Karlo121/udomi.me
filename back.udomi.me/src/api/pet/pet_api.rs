use chrono::Utc;
use poem::error::InternalServerError;
use poem::{web::Data, Error, Result};
use poem_openapi::param::Path;
use poem_openapi::{payload::Json, payload::PlainText, OpenApi};
use sqlx::PgPool;

use crate::api::tags::ApiTags;
use crate::models::pet::{CreatePet, Gender, Pet};
pub struct PetApi;

type PetResponse = Result<Json<Vec<Pet>>>;

#[OpenApi]
impl PetApi {
    #[oai(path = "/pets", method = "post", tag = "ApiTags::Pet")]
    async fn create_pet(&self, pool: Data<&PgPool>, pet: Json<CreatePet>) -> Result<Json<Pet>> {
        let new_pet = sqlx::query_as!(
            Pet,
            r#"
            INSERT INTO pets (name, breed_id, age, description, gender, adopted, created_at, created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id, name, breed_id, age, description, gender as "gender: Gender", adopted, created_at, created_by
            "#,
            pet.name,
            pet.breed_id,
            pet.age,
            pet.description,
            pet.gender as Gender,
            false,
            Utc::now(),
            pet.created_by
        )
        .fetch_one(pool.0)
        .await
        .map_err(|e| {
            eprintln!("Error creating pet: {:?}", e);
            InternalServerError(e)
        })?;

        Ok(Json(new_pet))
    }

    #[oai(path = "/pets/:id", method = "get", tag = "ApiTags::Pet")]
    async fn get_pet_by_id(&self, pool: Data<&PgPool>, id: Path<i32>) -> Result<Json<Pet>> {
        let pet = sqlx::query_as!(
            Pet,
            r#"
            SELECT id, name, breed_id, age, description, gender as "gender: Gender", adopted, created_at, created_by
            FROM pets WHERE id = $1
            "#,
            *id
        )
        .fetch_one(pool.0)
        .await
        .map_err(|e| {
            eprintln!("Error fetching pet: {:?}", e);
            InternalServerError(e)
        })?;

        Ok(Json(pet))
    }
}
