
$(document).ready(function(){
  // variables for global use
  var APIurl = "";
  var key = "cd99f109ad3acd2d64ff0e6a0e8f6a89/"
  var locationObj = {city: "", country: "", lat: 0,lng: 0};
  var icons = {
    clearday: 'fa-sun-o',
    clearnight: 'fa-moon-o',
    partlycloudyday: 'fa-cloud',
    partlycloudynight: 'fa-cloud',
    cloudy: 'fa-cloud',
    rain: 'fa-umbrella',
    sleet: 'fa-snowflake-o',
    snow: 'fa-snowflake-o',
    wind: 'fa-refresh',
    fog: 'fa-cloud-download'
  };

  // get geolocation request populate obj
  navigator.geolocation.getCurrentPosition(function(position) {
    locationObj.lat = position.coords.latitude;
    locationObj.lng = position.coords.longitude;
    getCity();
  });

  // find city ajax request
  function getCity(){
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + locationObj.lat + "," + locationObj.lng + "&sensor=false",
      success: function(data) {
        locationObj.city = data.results[0].address_components[3].long_name;
        locationObj.country = data.results[0].address_components[6].short_name;
        APIurl = "https://api.darksky.net/forecast/" + key + locationObj.lat + "," + locationObj.lng;
        getWeather();
      },
      error: function(error) {
        console.log("error finding city");
      }
    });
  }

  // find weather ajax request
  function getWeather(){
    $.ajax({
      url: APIurl,
      dataType:'jsonp', // allows access control origin
      // Get data from the api
      success: function(data){
        var iconType = (data.currently.icon).replace(/-/g,'');
        var tempVal = data.currently.temperature;
        $("#icon").addClass(icons[iconType]);
        $(".weather").html(data.currently.summary);
        $(".location").html(locationObj.city + " " + locationObj.country);
        $("#tempc").html(Math.round((tempVal - 32) * 5 / 9) + "&deg;C");
        $("#tempf").html(Math.round(tempVal) + "&deg;F");
      },
      // Report error message to user
      error: function(error){
        $(".weather").html("Error Please Retry");
      },
    });
  }

  // button for farenheit to celcius
  $("#tempChange").click(function(){
    $('h2').toggleClass('hidden');
    $('#altTemp').html($('#altTemp').text() == 'C' ? 'F' : 'C');
  });

});
