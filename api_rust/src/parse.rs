use serde::Serialize;
use reqwest::blocking::{*};
use scraper::{*};
use std::error::Error;


#[derive(Serialize)]
pub struct ScrapeResult {
    name: String,               // 団体名
    grade: Vec<String>,         // 対象者
    people: i32,                // 推薦人数
    candidacy: String,          // 出願資格
    amount: i32,                // 月額
    period: Option<bool>,       // 支給期間
    duplication: Option<bool>,  // 他奨学金との重複
    note: String,               // 備考
}

pub fn scrape() -> Result<(), Box<dyn Error>> {

    let client = Client::builder().build()?;

    let url = "https://www.titech.ac.jp/students/tuition/financial-aid/scholarships";

    let response = client.get(url).send()?;
    let body = response.text()?;

    let document = Html::parse_document(&body);
    let selector = Selector::parse("h1").unwrap();
    let element = document.select(&selector).next().unwrap();
    let text = element.text().collect::<Vec<_>>();

    dbg!(&text);

    Ok(())

}

