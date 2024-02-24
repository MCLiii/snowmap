from fastapi import APIRouter

router = APIRouter()

@router.get("/get-graph")
async def get_dest(resort_name: str = '', start_date: str = '', end_date: str = ''):
    """ Pass in a comma separated string of ski resort regions"""
    return {
        "data":{
            "2018": {
                "2.1.2024": 1,
                "2.2.2024": 3,
                "2.3.2024": 4,
                "2.4.2024": 5,
                "2.5.2024": 6,
                "2.6.2024": 7,
                "2.7.2024": 8
            },
            "2019": {
                "2.1.2024": 1,
                "2.2.2024": 3,
                "2.3.2024": 4,
                "2.4.2024": 5,
                "2.5.2024": 6,
                "2.6.2024": 7,
                "2.7.2024": 8
            },
            "2020": {
                "2.1.2024": 1,
                "2.2.2024": 3,
                "2.3.2024": 4,
                "2.4.2024": 5,
                "2.5.2024": 6,
                "2.6.2024": 7,
                "2.7.2024": 8
            },
        }
    }