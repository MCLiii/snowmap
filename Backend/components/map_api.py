from fastapi import APIRouter

router = APIRouter()

@router.get("/get-dest")
async def get_dest(region: str = '', start_date: str = '', end_date: str = ''):
    """ Pass in a comma separated string of ski resort regions"""
    return {
        "data":[{
            "name": "vail",
            "state": "colorado",
            "lat": "39.6433",
            "lon": "-106.3781",
            "snowfall": "24"
        },
        {
            "name": "breckenridge",
            "state": "colorado",
            "lat": "39.4817",
            "lon": "-106.0384",
            "snowfall": "30"
        },
        {
            "name": "whistler",
            "state": "BC",
            "lat": "50.116667",
            "lon": "-122.954167",
            "snowfall": "11"
        }]
    }