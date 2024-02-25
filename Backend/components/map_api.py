from fastapi import APIRouter
import sqlite3
router = APIRouter()

@router.get("/get-dest")
async def get_dest(region: str = '', start_date: str = '', end_date: str = ''):
    """ Pass in a comma separated string of ski resort regions"""
    #start_date = "2024-01-01" 
    #end_date = "2024-02-24"
    # region = "Mid-Atlantic"
    conn = sqlite3.connect('../../skiDataset.db') 
    cursor = conn.cursor()
    cursor.execute('''
        SELECT
            l.resort_name AS name,
            l.state,
            l.latitude AS lat,
            l.longitude AS lon,
            SUM(w.snowfall) AS snowfall
        FROM location l
        JOIN weather w ON l.resort_name = w.resort_name
        WHERE l.location_catalog = ? AND w.date BETWEEN ? AND ?
        GROUP BY l.resort_name, l.state, l.latitude, l.longitude
        ORDER BY snowfall DESC
    ''', (region, start_date, end_date))

    # Fetch all the results
    result = cursor.fetchall()

    # Close the database connection
    conn.close()
    formatted_data = {
        "data": [{
            "name": row[0],
            "state": row[1],
            "lat": str(row[2]),
            "lon": str(row[3]),
            "snowfall": str(row[4])
        } for row in result]
    }

    return formatted_data