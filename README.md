<h3> What we are doing </h3>

Create an interactive google maps website with the ski resort info about weather for USA ski resorts.
<h3> Dataset </h3>

* Table skiRank (resort_name, rank, rating, image_url, state)
  - primary key: <B>resort_name</B>
  - resort_name: the ski resort name
  - rank: the rank of the ski resort (given by the skiInfo.com)
  - rating: the rating of the ski resort (given by the skiInfo.com)
  - image_url: the image url (given by the skiInfo.com)
  - state: the state of the ski resort
* Table skiInfo (resort_name, elevation, min_elevation, max_elevation, total_slope, green_slope, blue_slope, black_slope, num_ski_lifts)
  - primary key: <B>resort_name</B>
  - resort_name: the ski resort name
  - elevation(m): the height of the mountain
  - min_elevation(m): the lowest elevation of the height
  - max_elevation(m): the highest elevation of the height
  - total_slope(km): the total length of the slopes
  - green_slope(km): the total easiest slope length
  - blue_slope(km): the total intermediate slope length
  - black_slope(km): the total difficult slope length
  - num_ski_lifts: the number of ski lifts in the ski resort
* Table location (resort_name, latitude, longitude, elevation, location_catalog, state, city, zipcode, address, url)
  - primary key: <B>resort_name</B>
  - resort_name: name of the ski resort in the United States 
  - latitude: the latitude of the ski resort (given by Google Map APIs)
  - longitude: the longitude of the ski resort (given by Google Map APIs)
  - elevation: the elevation of the ski resort based on latitude and longitude (given by Google Map APIs)
  - location_catalog: New England, Mid-Atlantic, Southeast, Midwest, Rocky Mountains, West Coast (based on the catalog on wikipedia)
  - state: the state of the ski resort (given by Google Map APIs)
  - city: the city of the ski resort (given by Google Map APIs)
  - zipcode: the zipcode of the ski resort (given by Google Map APIs)
  - address: the address of the ski resort (given by Google Map APIs)
  - url: the url of the ski resort (given by Google Map APIS)
* Table weather (resort_name, latitude, longitude, date, tavg, tmin, tmax, snowfall)
  - primary key: <B>(latitude, longitude)</B>
  - resort_name: name of the ski resort in the United States 
  - latitude: the latitude of the ski resort 
  - longitude: the longitude of the ski resort 
  - date: the date (dates format: YYYY-MM-DD) 
  - tavg(°C):	average Temperature of the day
  - tmin(°C):	minimum Temperature of the day
  - tmax(°C):	maximum Temperature of the day
  - snowfall(mm): snow fall of the day
* Table name_mapping(location_name, skiinfo_name)
  - primary key: <B>location_name</B>
  - location_name: resort name from the location table
  - skiinfo_name: resort name from the skiInfo table

<h3> Reference/Data Source </h3>

* American ski resorts list: https://en.wikipedia.org/wiki/List_of_ski_areas_and_resorts_in_the_United_States
* The snow weather is not always reported on each weather station. Take other snow weather reports as references
  - https://www.snow-forecast.com/resorts/Cloudmont/history
  - https://www.weather.gov/wrh/Climate?wfo=bou
  - https://openweathermap.org/history-bulk
* Google API token Generate: https://developers.google.com/maps/documentation/embed/get-api-key
* Google APIs
  - get latitude, longitude, state, city, zipcode, address based on ski resort name(https://maps.googleapis.com/maps/api/geocode/json)
  - get elevation based on latitude and longitude (https://maps.googleapis.com/maps/api/elevation/json?locations={latitude},{longitude}&key={api_key})
  - get ski resort url (https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&key={api_key})
  - 36 ski resort searching in Google is missing the coordinate. So we drop it. ex:
    * Kanc Rec Area — Lincoln
    * Mount Prospect — Lancaster
    * Big Squaw — Greenville
* Weather Data Source: https://weatherstack.com/documentation
  - Limitation: get history data requires subscription
  - Limitation: only can fetch 60 days data at one time
  - Limitation: only allow 50,000 requests API
  - GOOD: have the snow fall data everyday
* Weather Data Leftover Source: https://dev.meteostat.net/python/daily.html#data-structure
  - pip install meteostat
  - can gather future 8 days weather
  - parameter interpretation and unit: https://dev.meteostat.net/formats.html#meteorological-parameters
  - go to the source of the data and interpret snow N/A as 0, snow unit as inch: https://www.weather.gov/wrh/Climate?wfo=bou
  - Historical observations and statistics are obtained from Meteostat's bulk data interface and consist of data provided by different public interfaces, most of which are governmental. Among the data sources are national weather services like the National Oceanic and Atmospheric Administration (NOAA) and Germany's national meteorological service (DWD).
* skiInfo: https://www.skiresort.info/ski-resorts/usa/
  - Get resort_name, rank, rating, image_url, state from the website
  - Since the resort_name is different from table skiInfo and table location, use fuzzywuzzy to identify similar names and map them together(store in the table name_mapping)
