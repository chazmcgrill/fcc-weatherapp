const APIURL = "https://fcc-weather-api.glitch.me/";
let tempChange = document.querySelector('.tempChange'),
    locationEl = document.querySelector('.location'),
    weatherEl = document.querySelector('.weather'),
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

// ajax request using fetch with error handling
function getWeather(url) {
  try {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        weatherUpdate(data);
      })
      .catch(err => {
        weatherEl.innerText = err;
      });
  } catch (err) {
    weatherEl.innerText = err;
  }
}

// returns correct icon depending on weather 
function getIcon(weather) {
  switch(weather) {
    case "few clouds":
    case "scattered clouds":
    case "clouds":
      return "icon-cloud";
    case "broken clouds":
      return "icon-part-cloud-day";
    case "snow":
      return "icon-snow";
    case "thunderstorm":
      return "icon-thunderstorm"
    case "clear":
      return "icon-clear-day"
    case "mist":
    case "fog":
    case "smoke":
      return "icon-fog";
    default:
      return "icon-rain";
  }
}

// returns temperature markup
function tempMarkup(temp, metric) {
  const t = Math.round(metric === 'F' ? (temp * 1.8) + 32 : temp);
  return `${t}<span>&deg;${metric}</span>`; 
}

// update screen with api data
function weatherUpdate(data) {
  const { main, weather } = data;
  temp.c = tempMarkup(main.temp, 'C');
  temp.f = tempMarkup(main.temp, 'F');

  const weatherMain = weather[0].main;
  icon.classList.add(getIcon(weatherMain.toLowerCase()));
  weatherEl.innerText = weatherMain;
  locationEl.innerText = data.name;

  document.getElementById('tempc').innerHTML = temp.c;
  document.getElementById('tempf').innerHTML = temp.f;
}

// button for farenheit to celcius
tempChange.addEventListener('click', () => {
  tempVal.forEach(val => val.classList.toggle('hidden'));
  altTemp.innerText = altTemp.innerText === 'C' ? 'F' : 'C';
});



