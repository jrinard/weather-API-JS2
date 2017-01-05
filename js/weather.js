
var apiKey = require('./../.env').apiKey;

function Weather(){
}

Weather.prototype.getWeather = function(city) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
    $('.showWeather').html('<h2>' + city + '</h2>' + "Humidity: " + response.main.humidity + "%");
    $('.showTemp').html("Temperature: " + conversionK(response.main.temp) + "°F");
  }).fail(function(error) {
    $('.showWeather').text(error.responseJSON.message);
    $('.showTemp').text(error.responseJSON.message);
  });
};

exports.weatherModule = Weather;


// converts kelvin to fahrenheit
conversionK = function(temp){
  return Math.floor(temp * (9/5) - 459.67);
};

//old concat way
// $('.showTemp').text("Temperature in " + city + " is " + conversion(response.main.temp) + "°F");
