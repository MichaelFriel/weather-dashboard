

function longLat () {

}


let long = -1.8782903
let lat = 52.4832224
let city = "london"
const longLatUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=2ad7462410efb4917d0b0e1cf80ba5f6`
const locationNameUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=2ad7462410efb4917d0b0e1cf80ba5f6`

fetch(longLatUrl)


    .then((response) => {
return response.json();
    })
    .then((data) => {

        console.log(data);
    })

fetch(longLatUrl)



fetch(locationNameUrl)
.then((response) => {
    return response.json();
  })
  .then((data) => {

      console.log(data);
  })

  fetch(locationNameUrl)



