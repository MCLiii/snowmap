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
* Table weather (resort_name, latitude, longitude, date, tavg, tmin, tmax, snowfall)
  - <B>resort_name</B>: name of the ski resort in the United States 
  - latitude: the latitude of the ski resort (given by Google Map APIs)
  - longitude: the longitude of the ski resort (given by Google Map APIs)
  - date: the date (dates format: YYYY-MM-DD) 
  - tavg(°C):	average Temperature of the day
  - tmin(°C):	minimum Temperature of the day
  - tmax(°C):	maximum Temperature of the day
  - snowfall(mm): snowfall of the day
* Optional Table skiInfo (resort_name, url, daily_ticket_price, num_of_green, num_of_blue, num_of_black)

<h3> Reference/Data Source </h3>

* American ski resorts list: https://en.wikipedia.org/wiki/List_of_ski_areas_and_resorts_in_the_United_States
* The snow weather is not always reported on each weather station. Take other snow weather reports as references
  - https://www.snow-forecast.com/resorts/Cloudmont/history
  - https://www.weather.gov/wrh/Climate?wfo=bou
  - https://openweathermap.org/history-bulk
* Weather Data Source: https://weatherstack.com/documentation
* Google API token Generate: https://developers.google.com/maps/documentation/embed/get-api-key
* Google APIs
  - get latitude, longitude, state, city, zipcode, address based on ski resort name(https://maps.googleapis.com/maps/api/geocode/json)
  - get elevation based on latitude and longitude (https://maps.googleapis.com/maps/api/elevation/json?locations={latitude},{longitude}&key={api_key})
  - get ski resort url (https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&key={api_key})
