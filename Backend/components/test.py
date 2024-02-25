from fastapi import APIRouter
import sqlite3
data_type, resort, start_date, end_date = "snowfall", "Buffalo Ski Club — Colden","2024-01-01", "2024-02-24"
allowed_columns = ['snowfall', 'tmax', 'tmin', 'tavg']
if data_type not in allowed_columns:
    raise ValueError(f"Invalid data_type: {data_type}")

conn = sqlite3.connect('../../skiDataset.db')
cursor = conn.cursor()

cursor.execute(f'''
    SELECT date, {data_type}
    FROM weather w 
    WHERE w.resort_name = ? AND SUBSTR(w.date, 6) BETWEEN ? AND ?
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

print(formatted_data.keys())
