mod handlers;

use actix_web::{App, HttpServer, web};
use std::env;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
  env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

  let host = env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string());
  let port = env::var("PORT").unwrap_or_else(|_| "8080".to_string());
  let bind_addr = format!("{}:{}", host, port);

  println!("Starting server on {}", bind_addr);

  HttpServer::new(|| {
    App::new()
      .route("/hello", web::get().to(handlers::hello))
      .route("/cat", web::get().to(handlers::get_cat))
  })
  .bind(&bind_addr)?
  .run()
  .await
}
