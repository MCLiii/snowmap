from fastapi import APIRouter
import sqlite3

router = APIRouter()

@router.get("/get-graph")
async def get_dest(resort: str = '', start_date: str = '', end_date: str = '', data_type: str = ''):
    """ Pass in a comma-separated string of ski resort regions"""
    allowed_columns = ['snowfall', 'tmax', 'tmin', 'tavg']
    if data_type not in allowed_columns:
        raise ValueError(f"Invalid data_type: {data_type}")

    conn = sqlite3.connect('../skiDataset.db')
    cursor = conn.cursor()

    if data_type == 'snowfall':
        if start_date[5:] > end_date[5:]:
            cursor.execute(f'''
                SELECT date, 
                       CASE 
                           WHEN l.location_catalog IN ('Rocky Mountains', 'West Coast') THEN w.snowfall * 8 
                           ELSE w.snowfall 
                       END AS snowfall
                FROM weather w 
                JOIN location l ON w.resort_name = l.resort_name
                WHERE w.resort_name = ? AND ((SUBSTR(w.date, 6) >= ? AND SUBSTR(w.date, 6) <= ?) OR
                    (SUBSTR(w.date, 6) >= ? AND SUBSTR(w.date, 6) <= ?))
                ORDER BY date ASC
            ''', (resort, start_date[5:], '12-31', '01-01', end_date[5:]))
        else:
            cursor.execute(f'''
                SELECT date, 
                       CASE 
                           WHEN l.location_catalog IN ('Rocky Mountains', 'West Coast') THEN w.snowfall * 8 
                           ELSE w.snowfall 
                       END AS snowfall
                FROM weather w 
                JOIN location l ON w.resort_name = l.resort_name
                WHERE w.resort_name = ? AND SUBSTR(w.date, 6) BETWEEN ? AND ?
                ORDER BY date ASC
            ''', (resort, start_date[5:], end_date[5:]))
    else:
        if start_date[5:] > end_date[5:]:
            cursor.execute(f'''
                SELECT date, {data_type}
                FROM weather 
                WHERE resort_name = ? AND ((SUBSTR(date, 6) >= ? AND SUBSTR(date, 6) <= ?) OR
                    (SUBSTR(date, 6) >= ? AND SUBSTR(date, 6) <= ?))
                ORDER BY date ASC
            ''', (resort, start_date[5:], '12-31', '01-01', end_date[5:]))
        else:
            cursor.execute(f'''
                SELECT date, {data_type}
                FROM weather 
                WHERE resort_name = ? AND SUBSTR(date, 6) BETWEEN ? AND ?
                ORDER BY date ASC
            ''', (resort, start_date[5:], end_date[5:]))

    # Fetch all the results
    result = cursor.fetchall()

    # Close the database connection
    conn.close()

    # Process the data to create the desired format
    formatted_data = {}
    for row in result:
        date, value = row
        year, month_day = date.split('-', 1)

        # Create year entry if not exists
        if year not in formatted_data:
            formatted_data[year] = {}

        # Create month-day entry if not exists
        formatted_data[year][month_day] = value

    return {"data": formatted_data}
