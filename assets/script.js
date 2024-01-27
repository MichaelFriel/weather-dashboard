
// var long = -1.5486
// var lat = 52.4832224
// var city = "london"
// const longLatUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=2ad7462410efb4917d0b0e1cf80ba5f6`
// const locationNameUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=2ad7462410efb4917d0b0e1cf80ba5f6`
// const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=2ad7462410efb4917d0b0e1cf80ba5f6`


// New locationName function takes city as a parameter and fetches data from the Geocoding API, returning the longitude and latitude.

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
        else {
            alert("You need to enter a City Name")
        }
        
    })

}

// New fiveDayForecast fuction takes longitude and latitude as parameters and passes them to the 5 Day Forecast API

function fiveDayForecast (longitude, latitude) {

    const longLatUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=2ad7462410efb4917d0b0e1cf80ba5f6`

    fetch(longLatUrl)

    .then((response) => {
return response.json();
    })
    .then((data) => {
    console.log(data);

    })

}

// locationName function is called and takes the city as an argument and then passes the result to the fiveDayForecast function.

locationName("London")
    .then(({ longitude, latitude }) => fiveDayForecast(longitude, latitude))
    


 
//   // This is the fetch for today's weather


// fetch(currentWeatherUrl)
// .then((response) => {
//     return response.json();
//   })
//   .then((data) => {

//     //   console.log(data);
//   })





