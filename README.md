<h3> What we are doing </h3>

Create an interactive google maps website with the ski resort info about weather for USA ski resorts.

<h3> Dataset </h3>

* Table location (resort_name, latitude, longitude, elevation, location_catalog, state, city, zipcode, address, url)
  - <B>resort_name</B>: name of the ski resort in the United States (scrape from https://en.wikipedia.org/wiki/List_of_ski_areas_and_resorts_in_the_United_States)
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
* Optional: skiInfo (resort_name, url, daily_ticket_price, num_of_green, num_of_blue, num_of_black)
