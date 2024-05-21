#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_imports)]
use poem::{
    error::InternalServerError, listener::TcpListener, web::Data, EndpointExt,
    Result, Route, Server,
};
use poem_openapi::{
    payload::{Json, PlainText},
    Object, OpenApi, OpenApiService,
};
use sqlx::postgres::PgPoolOptions;
use color_eyre::eyre::Report;
use std::fmt::{self, Display};
use dotenv::dotenv;
use std::env;

mod models;
mod api;
use api::pet::PetApi;


#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await?;


    let endpoints = PetApi;
    let api_service = 
	    OpenApiService::new(endpoints, "Udomi_me", "1.0.0")
	    .server("http://localhost:3000");
    
    let ui = api_service.openapi_explorer();
     let route = Route::new()
        .nest("/", api_service)
        .nest("/ui", ui)
        .data(pool);
    Server::new(TcpListener::bind("127.0.0.1:3000"))
        .run(route).await?;

    
    Ok(())
}