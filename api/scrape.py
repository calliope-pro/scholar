from typing import Final

import requests
from bs4 import BeautifulSoup, Tag


def tr_parser(tr: Tag) -> dict[str, str]:
    children: list[Tag] = tr.findChildren(recursive=False)
    res = {}
    res[children[0].get_text(strip=True)] = children[1].get_text(strip=True)
    if len(children) == 4:
        res[children[2].get_text(strip=True)] = children[3].get_text(strip=True)
    return res

def scrape() -> dict[str, str]:
    results = []
    URL: Final = "https://www.titech.ac.jp/students/tuition/financial-aid/scholarships"
    response = requests.get(URL)
    soup = BeautifulSoup(response.content, "lxml")

    tables = soup.select(".scholarWrap > table")
    for table in tables:
        res = {}
        trs = table.select('tr')
        for tr in trs:
            res.update(tr_parser(tr))
        results.append(res)
    return results

if __name__ == '__main__':
    scrape()
