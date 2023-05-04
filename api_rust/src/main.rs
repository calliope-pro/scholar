pub mod scrape;
pub mod parse;

use actix_cors::Cors;
use actix_web::{*};

use crate::scrape::{*};

#[get("/")]
async fn root() -> impl Responder {
    let results = scrape::scrape();
    HttpResponse::Ok().json(results)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .wrap(
                Cors::default()
                    .allow_any_origin()
                    .allow_any_method()
                    .allow_any_header(),
                 )
            .service(root)
    })
    .bind("127.0.0.1:8000")?
    .run()
    .await
}
