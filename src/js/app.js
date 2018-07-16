const APIURL = "https://fcc-weather-api.glitch.me/";
let tempChange = document.querySelector('.tempChange'),
    locationEl = document.querySelector('.location'),
    weather = document.querySelector('.weather'),
    tempVal = document.querySelectorAll('.temp'),
    altTemp = document.querySelector('.altTemp'),
    icon = document.getElementById('icon'),
    temp = {};

// on page load get geolocation and generate api url
document.addEventListener('DOMContentLoaded', () => {
  navigator.geolocation.getCurrentPosition(position => {
    const LAT = position.coords.latitude;
    const LON = position.coords.longitude;
    const URL = `${APIURL}api/current?lat=${LAT}&lon=${LON}`;
    getWeather(URL);
  });
});

// call api using es6 promises
function getWeather(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      weatherUpdate(data);
    })
    .catch(error => {
      weather.innerText = error;
    });
}

function getIcon(weather) {
  console.log(weather);
  switch(weather) {
    case "rain":
      return "icon-rain";
    default:
      return "icon-cloud";
  }
}

// update screen with api data
async function weatherUpdate(data) {
  temp.f = `${Math.round((data.main.temp * 1.8) + 32)}<span>&deg;F</span>`;
  temp.c = `${Math.round(data.main.temp)}<span>&deg;C</span>`;

  const weatherMain = data.weather[0].main;
  icon.classList.add(getIcon(weatherMain.toLowerCase()));
  weather.innerText = weatherMain;
  locationEl.innerText = data.name;

  document.getElementById('tempc').innerHTML = temp.c;
  document.getElementById('tempf').innerHTML = temp.f;
}

// button for farenheit to celcius
tempChange.addEventListener('click', () => {
  tempVal.forEach(val => val.classList.toggle('hidden'));
  altTemp.innerText = altTemp.innerText === 'C' ? 'F' : 'C';
});


// weather conditions: rain, shower rain, light rain, moderate rain, snow, few clouds, scattered clouds, broken clouds, clouds, drizzling, clear sky, thunderstorm, mist, fog, or smoke
