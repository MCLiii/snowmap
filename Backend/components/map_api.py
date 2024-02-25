from fastapi import APIRouter
import sqlite3

router = APIRouter()

@router.get("/get-dest")
async def get_dest(region: str = '', start_date: str = '', end_date: str = ''):
    conn = sqlite3.connect('../skiDataset.db') 
    cursor = conn.cursor()

    regions = region.split(',')

    if "All" in regions:
        if start_date[5:] > end_date[5:]:
            cursor.execute('''
            SELECT
                l.resort_name AS name,
                l.state,
                l.latitude AS lat,
                l.longitude AS lon,
                SUM(w.snowfall)/10 AS avg_snowfall
            FROM location l
            JOIN weather w ON l.resort_name = w.resort_name
            WHERE 
                (SUBSTR(w.date, 6) >= ? AND SUBSTR(w.date, 6) <= ?) OR
                (SUBSTR(w.date, 6) >= ? AND SUBSTR(w.date, 6) <= ?)
            GROUP BY l.resort_name, l.state, l.latitude, l.longitude
            ORDER BY avg_snowfall DESC
        ''', (start_date[5:], '12-31', '01-01', end_date[5:]))
        else:
            cursor.execute('''
                SELECT
                    l.resort_name AS name,
                    l.state,
                    l.latitude AS lat,
                    l.longitude AS lon,
                    SUM(CASE WHEN l.location_catalog IN ('Rocky Mountains', 'West Coast') THEN w.snowfall * 8 ELSE w.snowfall END) / 10 AS avg_snowfall
                FROM location l
                JOIN weather w ON l.resort_name = w.resort_name
                WHERE SUBSTR(w.date, 6) BETWEEN ? AND ?
                GROUP BY l.resort_name, l.state, l.latitude, l.longitude
                ORDER BY avg_snowfall DESC
            ''', (start_date[5:], end_date[5:]))
    else:
        placeholders = ', '.join(['?' for _ in regions])
        if start_date[5:] > end_date[5:]:
            query = f'''
                SELECT
                    l.resort_name AS name,
                    l.state,
                    l.latitude AS lat,
                    l.longitude AS lon,
                    SUM(w.snowfall)/10 AS avg_snowfall
                FROM location l
                JOIN weather w ON l.resort_name = w.resort_name
                WHERE 
                    l.location_catalog IN ({placeholders}) AND 
                    ((SUBSTR(w.date, 6) >= ? AND SUBSTR(w.date, 6) <= ?) OR
                    (SUBSTR(w.date, 6) >= ? AND SUBSTR(w.date, 6) <= ?))
                GROUP BY l.resort_name, l.state, l.latitude, l.longitude
                ORDER BY avg_snowfall DESC
            '''
            cursor.execute(query, (*regions, start_date[5:], '12-31', '01-01', end_date[5:]))
        else:
            query = f'''
                SELECT
                    l.resort_name AS name,
                    l.state,
                    l.latitude AS lat,
                    l.longitude AS lon,
                    SUM(w.snowfall)/10 AS avg_snowfall
                FROM location l
                JOIN weather w ON l.resort_name = w.resort_name
                WHERE l.location_catalog IN ({placeholders}) AND SUBSTR(w.date, 6) BETWEEN ? AND ?
                GROUP BY l.resort_name, l.state, l.latitude, l.longitude
                ORDER BY avg_snowfall DESC
            '''
            cursor.execute(query, (*regions, start_date[5:], end_date[5:]))

    result = cursor.fetchall()
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
