use poem::{Error, IntoResponse, Request, Response};
use poem::http::StatusCode;
use poem::error::ResponseError;


use poem_openapi::{
    registry::{MetaResponses, Registry},
    ApiResponse,
};
use serde::Serialize;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum ApiError {
    #[error("Database error")]
    DatabaseError(#[from] sqlx::Error),
    #[error("Internal server error")]
    InternalServerError,
}

impl ResponseError for ApiError {
    fn status(&self) -> StatusCode {
        match *self {
            ApiError::DatabaseError(_) => StatusCode::INTERNAL_SERVER_ERROR,
            ApiError::InternalServerError => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }

    fn as_response(&self) -> Response {
        let status = self.status();
        let body = format!("{}: {}", status, self);
        Response::builder()
            .status(status)
            .body(body)
    }
}

