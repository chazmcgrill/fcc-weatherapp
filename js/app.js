
$(document).ready(function(){
  var APIurl = "https://fcc-weather-api.glitch.me/";

  // get geolocation request populate obj
  navigator.geolocation.getCurrentPosition(position => {
    const LAT = position.coords.latitude;
    const LON = position.coords.longitude;
    const URL = `${APIurl}api/current?lat=${LAT}&lon=${LON}`;
    getWeather(URL);
  });

  // find weather ajax request
  function getWeather(url) {
    $.ajax({
      url: url,
      success: function(data) {
        console.log(data);
        let tempVal = data.main.temp;
        $(".icon").attr("src", data.weather[0].icon);
        $(".weather").html(data.weather[0].main);
        $(".location").html(data.name);
        $("#tempc").html(Math.round((tempVal - 32) * 5 / 9) + "&deg;C");
        $("#tempf").html(Math.round(tempVal) + "&deg;F");
      },
      error: function(error){
        $(".weather").html("Error Please Retry");
      },
    });
  }

  // button for farenheit to celcius
  $(".tempChange").click(function(){
    $('.temp').toggleClass('hidden');
    $('.altTemp').html($('.altTemp').text() == 'C' ? 'F' : 'C');
  });

});
