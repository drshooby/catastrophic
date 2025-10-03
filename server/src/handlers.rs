use crate::responses::CatResponse;
use actix_web::{HttpResponse, Responder};

pub async fn hello() -> impl Responder {
  HttpResponse::Ok().json(CatResponse {
    message: "meow".to_string(),
  })
}
