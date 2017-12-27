$(document).ready(() => {
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
      success: data => {
        let temp = {
          c: `${Math.round(data.main.temp)}&deg;C`,
          f: `${Math.round((data.main.temp * 1.8) + 32)}&deg;F`
        };
        $(".icon").attr("src", data.weather[0].icon);
        $(".weather").html(data.weather[0].main);
        $(".location").html(data.name);
        $("#tempc").html(temp.c);
        $("#tempf").html(temp.f);
      },
      error: error => {
        $(".weather").html("Error Please Retry");
      },
    });
  }

  // button for farenheit to celcius
  $(".tempChange").click(() => {
    $('.temp').toggleClass('hidden');
    $('.altTemp').html($('.altTemp').text() == 'C' ? 'F' : 'C');
  });

});
