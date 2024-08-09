use aws_sdk_s3::types::ByteStream;
use aws_sdk_s3::{Client, Config, Credentials, Region};
use std::env;
use std::error::Error;

pub async fn upload_to_s3(file_bytes: Vec<u8>, file_name: &str) -> Result<String, Box<dyn Error>> {
    let region = Region::new(env::var("AWS_REGION").unwrap_or_else(|_| "us-west-2".to_string()));
    let credentials = Credentials::new(
        &env::var("AWS_ACCESS_KEY_ID").unwrap(),
        &env::var("AWS_SECRET_ACCESS_KEY").unwrap(),
        None,
        None,
        "example",
    );

    let config = Config::builder()
        .region(region)
        .credentials_provider(credentials)
        .build();

    let client = Client::from_conf(config);

    let resp = client
        .put_object()
        .bucket(&env::var("S3_BUCKET").expect("S3_BUCKET must be set"))
        .key(file_name)
        .body(ByteStream::from(file_bytes))
        .send()
        .await?;

    Ok(format!(
        "https://{}.s3.amazonaws.com/{}",
        env::var("S3_BUCKET").unwrap(),
        file_name
    ))
}
