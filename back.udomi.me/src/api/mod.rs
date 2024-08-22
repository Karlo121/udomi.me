pub mod pet {
    pub mod pet_api;

    pub use pet_api::PetApi;
}

pub mod user {
    pub mod user_api;

    pub use user_api::UserApi;
}

pub mod breed {
    pub mod breed_api;

    pub use breed_api::BreedApi;
}

pub mod adoption {
    pub mod adoption_api;

    pub use adoption_api::AdoptionApi;
}

pub mod s3;
pub mod tags;
