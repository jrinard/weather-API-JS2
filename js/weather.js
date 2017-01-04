
function Weather(){
}

conversion = function(temp){
  return Math.floor(temp * (9/5) - 459.67);
};

exports.weatherModule = Weather;
