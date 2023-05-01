from fastapi import FastAPI
from fastapi.routing import APIRouter

from scrape import scrape

app = FastAPI()
router = APIRouter(prefix="/back")


@router.get("/")
def root():
    results = scrape()
    return results


app.include_router(router)
