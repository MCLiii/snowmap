from fastapi import APIRouter

router = APIRouter()

@router.get("/get-graph")
async def get_dest(resort: str = '', start_date: str = '', end_date: str = '', data_type: str = ''):
    """ Pass in a comma separated string of ski resort regions"""
    return {
        "data":{
            "2018": {
                "2-1": 1,
                "2-2": 3,
                "2-3": 4,
                "2-4": 5,
                "2-5": 6,
                "2-6": 7,
                "2-7": 8
            },
            "2019": {
                "2-1": 1,
                "2-2": 3,
                "2-3": 4,
                "2-4": 5,
                "2-5": 6,
                "2-6": 7,
                "2-7": 8
            },
            "2020": {
                "2-1": 1,
                "2-2": 3,
                "2-3": 4,
                "2-4": 5,
                "2-5": 6,
                "2-6": 7,
                "2-7": 8
            },
        }
    }