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
}


// var temp = $('<p>').text("Temp: data.)
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
    var weatherIcon = currentData.weather.icon
    var currentWeatherIcon = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`


    var currentWeather = $('#today').html(`<h3>${city} (${formattedTime})</h3><p>`)
    
    $(currentWeather).append(currentTemp, currentWind, currentHumidity)
   
  })

}












// 
// <section id="today" class="" role="region" aria-live="polite">
//           <h3>Location & Day</h3>
//           <p>Temp: X</p>
//           <p>Wind: X</p>
//           <p>Humidity: X</p>
//         </section>
//         <section id="forecast" class="row mt-3" role="region" aria-live="polite">
//           <h3>5 Day Forecast</h3>
//           <div class="row forecast">
//             <div class="col-2 forecast-card">
//               <h4>Date</h4>
//               <p>😁</p>
//               <p>Temp: X</p>
//               <p>Wind: X</p>
//               <p>Humidity: X</p>
//             </div>
//             <div class="col-2 forecast-card">
//               <h4>Date</h4>
//               <p>😁</p>
//               <p>Temp: X</p>
//               <p>Wind: X</p>
//               <p>Humidity: X</p>
//             </div>
//             <div class="col-2 forecast-card">
//               <h4>Date</h4>
//               <p>😁</p>
//               <p>Temp: X</p>
//               <p>Wind: X</p>
//               <p>Humidity: X</p>
//             </div>
//             <div class="col-2 forecast-card">
//               <h4>Date</h4>
//               <p>😁</p>
//               <p>Temp: X</p>
//               <p>Wind: X</p>
//               <p>Humidity: X</p>
//             </div>
//             <div class="col-2 forecast-card">
//               <h4>Date</h4>
//               <p>😁</p>
//               <p>Temp: X</p>
//               <p>Wind: X</p>
//               <p>Humidity: X</p>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   </div>

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
