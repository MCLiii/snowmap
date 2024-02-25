from fastapi import APIRouter
import sqlite3
router = APIRouter()

@router.get("/get-graph")
async def get_dest(resort: str = '', start_date: str = '', end_date: str = '', data_type: str = ''):
    """ Pass in a comma separated string of ski resort regions"""
    allowed_columns = ['snowfall', 'tmax', 'tmin', 'tavg'] 
    if data_type not in allowed_columns:
        raise ValueError(f"Invalid data_type: {data_type}")
    conn = sqlite3.connect('../skiDataset.db')  
    cursor = conn.cursor()
    #data_type, resort, start_date, end_date = "snowfall", "Buffalo Ski Club — Colden","2024-01-01", "2024-02-24"
    cursor = conn.cursor()
    cursor.execute(f'''
        SELECT date, {data_type}
        FROM weather w 
        WHERE w.resort_name = ? AND w.date BETWEEN ? AND ?
        ORDER BY date ASC
    ''', (resort, start_date, end_date))

    # Fetch all the results
    result = cursor.fetchall()

    # Close the database connection
    conn.close()

    # Process the data to create the desired format
    formatted_data = {}
    for row in result:
        date, value = row
        year, month_day = date.rsplit('-', 1) 

        # Create year entry if not exists
        if year not in formatted_data:
            formatted_data[year] = {}

        # Create month-day entry if not exists
        formatted_data[year][month_day] = value

    return {"data": formatted_data}

