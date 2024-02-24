from fastapi import APIRouter

router = APIRouter()

@router.get("/get-pins")
async def get_pins(region: str, start_date: str, end_date: str):
    """ Pass in a comma separated string of ski resort regions"""
    return {
        "data":[{
            "name": "vail",
            "lat": "39.6433",
            "lon": "106.3781",
            "snowfall": "24"
        },
        {
            "name": "breckenridge",
            "lat": "39.4817",
            "lon": "106.0384",
            "snowfall": "30"
        }]
    }