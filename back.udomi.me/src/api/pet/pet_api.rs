use chrono::Utc;
use poem::error::InternalServerError;
use poem::http::StatusCode;
use poem::{web::Data, web::Multipart, Error, Result};
use poem_openapi::param::Path;
use poem_openapi::{payload::Json, OpenApi};
use sqlx::PgPool;

use crate::api::s3::upload_to_s3;
use crate::api::tags::ApiTags;
use crate::models::pet::{CreatePet, Gender, Pet};

pub struct PetApi;

type PetResponse = Result<Json<Vec<Pet>>>;

#[OpenApi]
impl PetApi {
    #[oai(path = "/pets", method = "post", tag = "ApiTags::Pet")]
    async fn create_pet(&self, pool: Data<&PgPool>, mut multipart: Multipart) -> Result<Json<Pet>> {
        let mut create_pet: CreatePet = CreatePet {
            name: String::new(),
            breed_id: 0,
            age: 0,
            description: String::new(),
            gender: Gender::Unknown,
            created_by: 0,
            location: None,
        };
        let mut image_data: Option<Vec<u8>> = None;

        while let Some(field) = multipart.next_field().await.unwrap() {
            match field.name() {
                Some("name") => create_pet.name = field.text().await.unwrap(),
                Some("breed_id") => {
                    create_pet.breed_id = field.text().await.unwrap().parse().unwrap()
                }
                Some("age") => create_pet.age = field.text().await.unwrap().parse().unwrap(),
                Some("description") => create_pet.description = field.text().await.unwrap(),
                Some("gender") => create_pet.gender = field.text().await.unwrap().parse().unwrap(),
                Some("created_by") => {
                    create_pet.created_by = field.text().await.unwrap().parse().unwrap()
                }
                Some("location") => create_pet.location = Some(field.text().await.unwrap()),
                Some("image") => image_data = Some(field.bytes().await.unwrap().to_vec()),
                _ => (),
            }
        }

        let image_url = if let Some(image) = image_data {
            let file_name = format!("{}.jpg", Utc::now().timestamp());
            match upload_to_s3(image, &file_name).await {
                Ok(url) => Some(url),
                Err(err) => {
                    return Err(Error::from_string(
                        err.to_string(),
                        StatusCode::INTERNAL_SERVER_ERROR,
                    ))
                }
            }
        } else {
            None
        };

        let new_pet = sqlx::query_as!(
            Pet,
            r#"
            INSERT INTO pets (name, breed_id, age, description, gender, adopted, created_at, created_by, image_url, location)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id, name, breed_id, age, description, gender as "gender: Gender", adopted, created_at, created_by, image_url, location
            "#,
            create_pet.name,
            create_pet.breed_id,
            create_pet.age,
            create_pet.description,
            create_pet.gender as Gender,
            false,
            Utc::now(),
            create_pet.created_by,
            image_url,
            create_pet.location
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
            SELECT id, name, breed_id, age, description, gender as "gender: Gender", adopted, created_at, created_by, image_url, location
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

    #[oai(path = "/pets", method = "get", tag = "ApiTags::Pet")]
    async fn get_all_pets(&self, pool: Data<&PgPool>) -> Result<Json<Vec<Pet>>> {
        let pets = sqlx::query_as!(
            Pet,
            r#"
            SELECT id, name, breed_id, age, description, gender as "gender: Gender", adopted, created_at, created_by, image_url, location
            FROM pets
            "#
        )
        .fetch_all(pool.0)
        .await
        .map_err(|e| {
            eprintln!("Error fetching pets: {:?}", e);
            InternalServerError(e)
        })?;

        Ok(Json(pets))
    }
}
