from fastapi import FastAPI
from components import components_router
from fastapi.staticfiles import StaticFiles

def register_route(app: FastAPI):
    app.mount("/api/resort-images", StaticFiles(directory="resort_image"), name="resort-images")
    app.include_router(components_router.router, prefix="/api")