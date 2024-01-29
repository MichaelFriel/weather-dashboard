$(document).ready(function() {

// New locationName function takes city as a parameter and fetches data from the Geocoding API, returning the longitude and latitude.

$('form').submit(function(event) {
    event.preventDefault();
    var city = $('#search-input').val()
   if (city) {
   locationName(city) 
    .then(({ longitude, latitude }) => {
      return Promise.all([
          fiveDayForecast(longitude, latitude),
          currentWeather(longitude, latitude)
      ]);
  })
}
else {
    alert("You need to enter a City Name")
}}

)

function locationName (city) {
    const locationNameUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=2ad7462410efb4917d0b0e1cf80ba5f6`


   return fetch(locationNameUrl)
    .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
            let longitude = data[0].lon;
            let latitude = data[0].lat;
            return {longitude, latitude};
        }
        // else {
        //     alert("You need to enter a City Name")
        // }
        
    })

}

// New fiveDayForecast fuction takes longitude and latitude as parameters and passes them to the 5 Day Forecast API

function fiveDayForecast (longitude, latitude) {

    const longLatUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=2ad7462410efb4917d0b0e1cf80ba5f6`

    fetch(longLatUrl)

    .then((response) => {
return response.json();
    })
    .then((fiveDayData) => {
    console.log(fiveDayData);

    })

}


 
//   // This is the fetch for today's weather

function currentWeather (longitude, latitude) {

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2ad7462410efb4917d0b0e1cf80ba5f6`

fetch(currentWeatherUrl)
.then((response) => {
    return response.json();
  })
  .then((currentData) => {

      console.log(currentData);
  })

}

// var city = $('#search-button').val()


// locationName function is called and takes the city as an argument and then passes the result to the fiveDayForecast function.





// Add function for creating HTML with jQuery



// Add click event to search button




// $('.btn').click(function () {
    
//     locationName(city)
//     .then(({ longitude, latitude }) => {
//       return Promise.all([
//           fiveDayForecast(longitude, latitude),
//           currentWeather(longitude, latitude)
//       ]);
//   })
    
// }
// )


// Add to local storage

// Copy get function from calendar


}
)
