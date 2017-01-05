var Weather = require('./../js/weather.js').weatherModule;



$(document).ready(function() {
  var currentWeatherObject = new Weather();
  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    currentWeatherObject.getWeather(city);
  });
});


//
// {
//   "coord": {
//     "lon": -122.68,
//     "lat": 45.52
//   },
//   "weather": [
//     {
//       "id": 501,
//       "main": "Rain",
//       "description": "moderate rain",
//       "icon": "10n"
//     }
//   ],
//   "base": "cmc stations",
//   "main": {
//     "temp": 280.557,
//     "pressure": 999.59,
//     "humidity": 99,
//     "temp_min": 280.557,
//     "temp_max": 280.557,
//     "sea_level": 1035.08,
//     "grnd_level": 999.59
//   },
//   "wind": {
//     "speed": 4.77,
//     "deg": 209.501
//   },
//   "rain": {
//     "3h": 5.85
//   },
//   "clouds": {
//     "all": 92
//   },
//   "dt": 1454724246,
//   "sys": {
//     "message": 0.0031,
//     "country": "US",
//     "sunrise": 1454772350,
//     "sunset": 1454808259
//   },
//   "id": 5746545,
//   "name": "Portland",
//   "cod": 200
// }
