$(document).ready(function() {

    var locations = JSON.parse(localStorage.getItem("Cities")) || [];

// New locationName function takes city as a parameter and fetches data from the Geocoding API, returning the longitude and latitude.

$('form').submit(function(event) {
    event.preventDefault();
    var city = $('#search-input').val()

  
    locations.push(city);

    localStorage.setItem("Cities", JSON.stringify(locations))
    
renderButtons()

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
}


}

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

// Create the blocks and cycle through 5 times, adding a new day each time.

const currentDay = dayjs()

let indexes = [7, 15, 23, 31, 39]
additionalDay = 1

for (let i=0; i<indexes.length; i++) {
    const dayPlusOne = currentDay.add(additionalDay++, 'day')
const formattedDayPlusOne = dayPlusOne.format('DD/MM/YYYY')
 const dayPlusOneTemp = (fiveDayData.list[indexes[i]].main.temp - 273.15).toFixed(2)
 const dayOneTemp = $('<p>').text(`Temp: ${dayPlusOneTemp}\u00B0C`)
 const dayPlusOneWind = fiveDayData.list[indexes[i]].wind.speed
 const dayOneWind = $('<p>').text(`Wind: ${dayPlusOneWind} KPH`)
 const dayPlusOneHumidity = fiveDayData.list[indexes[i]].main.humidity
 const dayOneHumidity = $('<p>').text(`Humidity: ${dayPlusOneHumidity}%`)

var dayOneWeather = $(`.forecast-card-${indexes[i]}`).html(`<h4>${formattedDayPlusOne}</h4>`)

$(dayOneWeather).append(dayOneTemp, dayOneWind, dayOneHumidity);
}


    })

}

//   // This is the fetch for today's weather and current weather HTML

function currentWeather (longitude, latitude) {

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2ad7462410efb4917d0b0e1cf80ba5f6`

fetch(currentWeatherUrl)
.then((response) => {
    return response.json();
  })
  .then((currentData) => {

    var time = dayjs()
    var formattedTime = time.format("DD/MM/YYYY")
    var temp = (currentData.main.temp - 273.15).toFixed(2)
    var city = currentData.name
    var currentTemp = $('<p>').text(`Temp: ${temp}\u00B0C`)
    var wind = (currentData.wind.speed).toFixed(1)
    var currentWind = $('<p>').text(`Wind: ${wind} KPH`)
    var humidity = currentData.main.humidity
    var currentHumidity = $('<p>').text(`Humidity: ${humidity}%`)
    var weatherIcon = currentData.weather[0].icon
    var currentWeatherIcon = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    var weatherIconData = $('<img>').attr("src", JSON.stringify(currentWeatherIcon))
console.log(weatherIconData)
console.log(weatherIconData[0].attributes[0].textContent)
    var currentWeather = $('#today').html(`<h3>${city} (${formattedTime}) ${weatherIconData}</h3>`)
    

    
    
    $(currentWeather).append(currentTemp, currentWind, currentHumidity)
   
  })

}


// Dynamically adding searched items.

function renderButtons () {

    $('#history').empty()

for (let i=0; i<locations.length; i++) {

    var location = $('<button>')
    location.attr('type', "submit")
    location.addClass("btn search-button d-block")
    location.attr('id', locations[i])
    location.text(locations[i])
    $('#history').append(location)
    location.click(function () {
        let city = this.textContent
        
        if (city) {
            locationName(city) 
             .then(({ longitude, latitude }) => {
               return Promise.all([
                   fiveDayForecast(longitude, latitude),
                   currentWeather(longitude, latitude)
               ]);
           })
         }
    })
}
}

renderButtons()
    
  
    // Calling renderButtons which handles the processing of our locations array
    
  
  



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
