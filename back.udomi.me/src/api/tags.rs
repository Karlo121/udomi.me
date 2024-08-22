use poem_openapi::Tags;

#[derive(Tags)]
pub enum ApiTags {
    Pet,
    User,
    Species,
    Breed,
    Adoption,
}
