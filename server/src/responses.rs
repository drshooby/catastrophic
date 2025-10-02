use serde::Serialize;

#[derive(Serialize)]
pub struct CatResponse {
    pub message: String,
}
