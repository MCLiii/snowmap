from fastapi import FastAPI
from components import components_router

def register_route(app: FastAPI):
    app.include_router(components_router.router)