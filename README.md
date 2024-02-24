<h3> What we are doing </h3>

Create an interactive google maps website with the ski resort info about weather for USA ski resorts.

<h3> Dataset </h3>

* Table location (resort_name, latitude, longitude, elevation, location_catalog, state, city, zipcode, address, url)
  - <B>resort_name</B>: name of the ski resort in the United States 
  - latitude: the latitude of the ski resort (given by Google Map APIs)
  - longitude: the longitude of the ski resort (given by Google Map APIs)
  - elevation: the elevation of the ski resort based on latitude and longitude (given by Google Map APIs)
  - location_catalog: New England, Mid-Atlantic, Southeast, Midwest, Rocky Mountains, West Coast (based on the catalog on wikipedia)
  - state: the state of the ski resort (given by Google Map APIs)
  - city: the city of the ski resort (given by Google Map APIs)
  - zipcode: the zipcode of the ski resort (given by Google Map APIs)
  - address: the address of the ski resort (given by Google Map APIs)
  - url: the url of the ski resort (given by Google Map APIS)
* Table weather (latitude, longitude, elevation, date, tavg, tmin, tmax, snow)
  - latitude: the latitude of the ski resort (given by Google Map APIs)
  - longitude: the longitude of the ski resort (given by Google Map APIs)
  - elevation: the elevation of the ski resort based on latitude and longitude (given by Google Map APIs)
  - date: the date (dates format: YYYY-MM-DD) 
  - tavg(°C):	average Temperature of the day
  - tmin(°C):	minimum Temperature of the day
  - tmax(°C):	maximum Temperature of the day
  - snow(mm): snow depth
* Optional: skiInfo (resort_name, url, daily_ticket_price, num_of_green, num_of_blue, num_of_black)

<h3> Reference/Data Source </h3>

* American ski resorts list: https://en.wikipedia.org/wiki/List_of_ski_areas_and_resorts_in_the_United_States
* The snow weather is not always reported on each weather station. Take other snow weather reports as references
  - https://www.snow-forecast.com/resorts/Cloudmont/history
  - https://www.weather.gov/wrh/Climate?wfo=bou
* Weather report gathering(meteostat): https://github.com/meteostat/meteostat-python?tab=readme-ov-file
  - pip install meteostat
  - can gather future 8 days weather
  - parameter interpretation and unit: https://dev.meteostat.net/formats.html#meteorological-parameters
  - go to the source of the data and interpret snow N/A as 0, snow unit as inch: https://www.weather.gov/wrh/Climate?wfo=bou
  - Historical observations and statistics are obtained from Meteostat's bulk data interface and consist of data provided by different public interfaces, most of which are governmental. Among the data sources are national weather services like the National Oceanic and Atmospheric Administration (NOAA) and Germany's national meteorological service (DWD).
* Google API token Generate: https://developers.google.com/maps/documentation/embed/get-api-key
* Google APIs
  - get latitude, longitude, state, city, zipcode, address based on ski resort name(https://maps.googleapis.com/maps/api/geocode/json)
  - get elevation based on latitude and longitude (https://maps.googleapis.com/maps/api/elevation/json?locations={latitude},{longitude}&key={api_key})
  - get ski resort url (https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&key={api_key})
