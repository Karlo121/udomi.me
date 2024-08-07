#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_imports)]

use color_eyre::eyre::Report;
use dotenv::dotenv;
use poem::{
    error::InternalServerError, listener::TcpListener, middleware::Cors, web::Data, EndpointExt,
    Result, Route, Server,
};
use poem_openapi::{
    payload::{Json, PlainText},
    Object, OpenApi, OpenApiService,
};
use sqlx::postgres::PgPoolOptions;
use std::env;
use std::fmt::{self, Display};

mod api;
mod models;
use api::breed::BreedApi;
use api::pet::PetApi;
use api::user::UserApi;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await?;

    let endpoints = (PetApi, UserApi, BreedApi);
    let api_service =
        OpenApiService::new(endpoints, "Udomi_me", "1.0.0").server("http://localhost:3000");

    let ui = api_service.openapi_explorer();

    let cors = Cors::new()
        .allow_methods(vec!["GET", "POST", "OPTIONS", "PUT", "DELETE"])
        .allow_origin("http://localhost:5173")
        .allow_credentials(true);

    let route = Route::new()
        .nest("/", api_service)
        .nest("/ui", ui)
        .data(pool)
        .with(cors);

    Server::new(TcpListener::bind("127.0.0.1:3000"))
        .run(route)
        .await?;

    Ok(())
}
