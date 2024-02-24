from fastapi import APIRouter
from . import map_api

router = APIRouter()

router.include_router(map_api.router)