const APIURL = "https://fcc-weather-api.glitch.me/";

document.addEventListener('DOMContentLoaded', () => {

  // get geolocation and generate url
  navigator.geolocation.getCurrentPosition(position => {
    const LAT = position.coords.latitude;
    const LON = position.coords.longitude;
    const URL = `${APIURL}api/current?lat=${LAT}&lon=${LON}`;
    getWeather(URL);
  });

});


// call api using es6 promises update data
function getWeather(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let temp = {
        c: `${Math.round(data.main.temp)}&deg;C`,
        f: `${Math.round((data.main.temp * 1.8) + 32)}&deg;F`
      };

      $(".icon").attr("src", data.weather[0].icon);
      $(".weather").html(data.weather[0].main);
      $(".location").html(data.name);
      $("#tempc").html(temp.c);
      $("#tempf").html(temp.f);
    })
    .catch(error => {
      $(".weather").html("Error Please Retry");
    });
}

// button for farenheit to celcius
$(".tempChange").click(() => {
  $('.temp').toggleClass('hidden');
  $('.altTemp').html($('.altTemp').text() == 'C' ? 'F' : 'C');
});
