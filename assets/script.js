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

// This should probably be in a for loop

const currentDay = dayjs()

let indexes = [7, 15, 23, 31, 39]
additionalDay = 0

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

Day One
const dayPlusOne = currentDay.add(1, 'day')
const formattedDayPlusOne = dayPlusOne.format('DD/MM/YYYY')
 const dayPlusOneTemp = (fiveDayData.list[7].main.temp - 273.15).toFixed(2)
 const dayOneTemp = $('<p>').text(`Temp: ${dayPlusOneTemp}\u00B0C`)
 const dayPlusOneWind = fiveDayData.list[7].wind.speed
 const dayOneWind = $('<p>').text(`Wind: ${dayPlusOneWind} KPH`)
 const dayPlusOneHumidity = fiveDayData.list[7].main.humidity
 const dayOneHumidity = $('<p>').text(`Humidity: ${dayPlusOneHumidity}%`)

var dayOneWeather = $(`.forecast-card-${indexes[i]}`).html(`<h4>${formattedDayPlusOne}</h4>`)

$(dayOneWeather).append(dayOneTemp, dayOneWind, dayOneHumidity);

// Day Two
const dayPlusTwo = currentDay.add(2, 'day')
const formattedDayPlusTwo = dayPlusTwo.format('DD/MM/YYYY')

const dayPlusTwoTemp = (fiveDayData.list[15].main.temp - 273.15).toFixed(2)
 const dayTwoTemp = $('<p>').text(`Temp: ${dayPlusTwoTemp}\u00B0C`)
 const dayPlusTwoWind = fiveDayData.list[15].wind.speed
 const dayTwoWind = $('<p>').text(`Wind: ${dayPlusTwoWind} KPH`)
 const dayPlusTwoHumidity = fiveDayData.list[15].main.humidity
 const dayTwoHumidity = $('<p>').text(`Humidity: ${dayPlusTwoHumidity}%`)

var dayTwoWeather = $('.forecast-card-2').html(`<h4>${formattedDayPlusTwo}</h4>`)

$(dayTwoWeather).append(dayTwoTemp, dayTwoWind, dayTwoHumidity);

//Day Three


const dayPlusThree = currentDay.add(3, 'day')
const formattedDayPlusThree = dayPlusThree.format('DD/MM/YYYY')
    
const dayPlusThreeTemp = (fiveDayData.list[23].main.temp - 273.15).toFixed(2)
const dayThreeTemp = $('<p>').text(`Temp: ${dayPlusThreeTemp}\u00B0C`)
const dayPlusThreeWind = fiveDayData.list[23].wind.speed
const dayThreeWind = $('<p>').text(`Wind: ${dayPlusThreeWind} KPH`)
const dayPlusThreeHumidity = fiveDayData.list[23].main.humidity
const dayThreeHumidity = $('<p>').text(`Humidity: ${dayPlusThreeHumidity}%`)

var dayThreeWeather = $('.forecast-card-3').html(`<h4>${formattedDayPlusThree}</h4>`)

$(dayThreeWeather).append(dayThreeTemp, dayThreeWind, dayThreeHumidity);

// Day Four

const dayPlusFour = currentDay.add(4, 'day')
const formattedDayPlusFour = dayPlusFour.format('DD/MM/YYYY')
    
const dayPlusFourTemp = (fiveDayData.list[31].main.temp - 273.15).toFixed(2)
const dayFourTemp = $('<p>').text(`Temp: ${dayPlusFourTemp}\u00B0C`)
const dayPlusFourWind = fiveDayData.list[31].wind.speed
const dayFourWind = $('<p>').text(`Wind: ${dayPlusFourWind} KPH`)
const dayPlusFourHumidity = fiveDayData.list[31].main.humidity
const dayFourHumidity = $('<p>').text(`Humidity: ${dayPlusFourHumidity}%`)

var dayFourWeather = $('.forecast-card-4').html(`<h4>${formattedDayPlusFour}</h4>`)

$(dayFourWeather).append(dayFourTemp, dayFourWind, dayFourHumidity);

// Day Five

     const dayPlusFive = currentDay.add(5, 'day')
const formattedDayPlusFive = dayPlusFive.format('DD/MM/YYYY')
    
const dayPlusFiveTemp = (fiveDayData.list[39].main.temp - 273.15).toFixed(2)
const dayFiveTemp = $('<p>').text(`Temp: ${dayPlusFiveTemp}\u00B0C`)
const dayPlusFiveWind = fiveDayData.list[39].wind.speed
const dayFiveWind = $('<p>').text(`Wind: ${dayPlusFiveWind} KPH`)
const dayPlusFiveHumidity = fiveDayData.list[39].main.humidity
const dayFiveHumidity = $('<p>').text(`Humidity: ${dayPlusFiveHumidity}%`)

var dayFiveWeather = $('.forecast-card-5').html(`<h4>${formattedDayPlusFive}</h4>`)

$(dayFiveWeather).append(dayFiveTemp, dayFiveWind, dayFiveHumidity);

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
