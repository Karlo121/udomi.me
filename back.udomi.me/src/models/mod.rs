pub mod breed {
    pub mod breed;

    pub use breed::Breed;
}

pub mod pet {
    pub mod pet;

    pub use pet::Pet;
    pub use pet::CreatePet;
    pub use pet::Gender;
}

pub mod species {
    pub mod species;

    pub use species::Species;
}

pub mod user {
    pub mod user;
    
    pub use user::User;
    pub use user::LoginUser;
    pub use user::RegisterUser;
}