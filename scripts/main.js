

$(function() {
  reloadDataFromYahoo();
  setInterval(reloadDataFromYahoo, 60000 * 10);

});

var weatherData = {};

var weatherIconsMapYahoo = {
  'Cloudy'          : 'wi-day-sunny-overcast',
  'Light Rain'      : 'wi-showers'
};

var weatherTextMapYahoo = {
  'Cloudy'          : '阴天',
  'Light Rain'      : '小雨'
};

function weatherIconHtmlYahoo ( weatherKey ) {
  var icon = weatherIconsMapYahoo[weatherKey];

  if ( !icon ) {
    icon = weatherKey;
    return '<small>' + icon + '</small>';
  }

  return '<i class=' + icon +'></i>';
}

function weatherTextHtmlYahoo ( weatherKey ) {
  var text = weatherTextMapYahoo[weatherKey];

  if ( !text ) {
    text = weatherKey;
  }

  return text;
}



function resetWeatherData( data ) {
  $('#now_temp').html( data.nowTemp + '°C');
  $('#now_weather_icon').html( weatherIconHtmlYahoo( data.nowWeather ) );
  $('#now_weather_text').html( weatherTextHtmlYahoo( data.nowWeather ) );
  $('#now_update_text').html( data.nowDate );
}


function reloadDataFromYahoo() {
  $weatherUrl = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D2151849%20AND%20u%3D%27c%27&format=json';

  $.get($weatherUrl, function(data) {
    weatherData.nowWeather = data.query.results.channel.item.condition.text;
    weatherData.nowTemp = data.query.results.channel.item.condition.temp;
    weatherData.nowDate = data.query.results.channel.item.condition.date;
    weatherData.nowWind = data.query.results.channel.wind;
    resetWeatherData( weatherData );
  });

}