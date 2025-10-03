use actix_web::{HttpResponse, Responder, Result};

pub async fn hello() -> impl Responder {
  HttpResponse::Ok().json(serde_json::json!({
      "message": "meow"
  }))
}

pub async fn get_cat() -> Result<impl Responder> {
  let response = reqwest::get("https://cataas.com/cat")
    .await
    .map_err(|_| actix_web::error::ErrorInternalServerError("Failed to fetch cat"))?;

  let bytes = response
    .bytes()
    .await
    .map_err(|_| actix_web::error::ErrorInternalServerError("Failed to read image"))?;

  Ok(
    HttpResponse::Ok()
      .content_type("image/jpeg")
      .body(bytes.to_vec()),
  )
}
