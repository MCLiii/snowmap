from fastapi import APIRouter
from . import map_api, graph_api

router = APIRouter()

router.include_router(map_api.router)
router.include_router(graph_api.router)