pub mod pet {
    pub mod pet_api;

    pub use pet_api::PetApi;
}

pub mod user {
    pub mod user_api;

    pub use user_api::UserApi;
}

pub mod tags;
