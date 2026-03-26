var appid = "0eb3dd0ba0668c57db73cd53f861ee6f";

$(document).ready(function () {
  var SECONDS = 1000;
  var weather = {
    "01d": "wi-day-sunny",
    "01n": "wi-night-clear",
    "02d": "wi-day-sunny-overcast",
    "02n": "wi-night-cloudy",
    "03d": "wi-day-cloudy",
    "03n": "wi-night-cloudy",
    "04d": "wi-cloudy",
    "04n": "wi-cloudy",
    "09d": "wi-rain",
    "09n": "wi-rain",
    "10d": "wi-day-rain",
    "10n": "wi-night-rain",
    "11d": "wi-day-thunderstorm",
    "11n": "wi-night-thunderstorm",
    "13d": "wi-day-snow",
    "13n": "wi-night-snow",
    "50d": "wi-owm-701",
    "50n": "wi-owm-741",
  };

  // Initialize with loading messages
  $("#city").html("Loading...");
  $("#weather").html('<i class="wi wi-day-sunny"></i>');
  $("#sun").html('<i class="wi wi-sunrise fa-sm"></i>');
  $("#sun-time").html("--:--");

  getLocation(weather);

  updateClock();
  setInterval(updateClock, SECONDS);
  setInterval(function () {
    getLocation(weather);
  }, SECONDS * 25);
});

function updateClock() {
  var today = new Date();

  // Format time HH:MM
  var time =
    today.getHours() +
    (today.getMinutes() <= 9 ? ":0" : ":") +
    today.getMinutes();
  $("#clock").html(time);

  // Format date: Day, DD Month
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var dateString =
    days[today.getDay()] +
    ", " +
    today.getDate() +
    " " +
    months[today.getMonth()];
  $("#date").html(dateString);
}

function getLocation(weather) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      var url =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        position.coords.latitude +
        "&lon=" +
        position.coords.longitude +
        "&units=metric" +
        "&appid=" +
        appid;
      console.log("url is ", url);
      $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        timeout: 5000,
        success: function (res) {
          $("#temperature").html(res["main"]["temp"].toFixed(1));
          $("#humidity").html(res["main"]["humidity"]);
          $("#city").html(res["name"]);

          if (typeof weather[res["weather"][0]["icon"]] == "undefined")
            $("#weather").html('<i class="wi wi-na"></i>');
          else
            $("#weather").html(
              '<i class="wi ' + weather[res["weather"][0]["icon"]] + '"></i>',
            );

          if (
            Math.floor(new Date().getTime() / 1000.0) >
            res["sys"]["sunset"] + 60 * 60
          ) {
            $("#sun").html('<i class="wi wi-sunrise fa-sm"></i>');
            var sunrise = new Date(res["sys"]["sunrise"] * 1000);

            $("#sun-time").html(
              (sunrise.getHours() <= 9
                ? "0" + sunrise.getHours()
                : sunrise.getHours()) +
                ":" +
                (sunrise.getMinutes() <= 9
                  ? "0" + sunrise.getMinutes()
                  : sunrise.getMinutes()),
            );

            $("#html,body").addClass("night-mode");
            $(".row").addClass("row-night-mode");
          } else {
            if (
              $("#html,body").hasClass("night-mode") &&
              $(".row").addClass("row-night-mode")
            ) {
              $("#html,body").removeClass("night-mode");
              $(".row").removeClass("row-night-mode");
            }
            $("#sun").html('<i class="wi wi-sunset fa-sm"></i>');
            var sunset = new Date(res["sys"]["sunset"] * 1000);

            $("#sun-time").html(
              (sunset.getHours() <= 9
                ? "0" + sunset.getHours()
                : sunset.getHours()) +
                ":" +
                (sunset.getMinutes() <= 9
                  ? "0" + sunset.getMinutes()
                  : sunset.getMinutes()),
            );
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error("Weather API Error:", textStatus, errorThrown);
          $("#city").html("API Error");
          $("#weather").html('<i class="wi wi-cloud"></i>');
          $("#temperature").html("--");
          $("#humidity").html("--");
          $("#sun").html("--");
          $("#sun-time").html("--:--");
        },
      });
    },
    function (error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("Geolocation permission denied");
          $("#city").html("Location Denied");
          $("#weather").html('<i class="wi wi-cloud"></i>');
          $("#sun").html("--");
          $("#sun-time").html("--:--");
          $("#temperature").html("--");
          $("#humidity").html("--");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location unavailable");
          $("#city").html("Position N/A");
          $("#weather").html('<i class="wi wi-cloud"></i>');
          $("#sun").html("--");
          $("#sun-time").html("--:--");
          $("#temperature").html("--");
          $("#humidity").html("--");
          break;
        case error.TIMEOUT:
          console.log("Location request timed out");
          $("#city").html("Timeout");
          $("#weather").html('<i class="wi wi-cloud"></i>');
          $("#sun").html("--");
          $("#sun-time").html("--:--");
          $("#temperature").html("--");
          $("#humidity").html("--");
          break;
        case error.UNKNOWN_ERROR:
          console.log("Unknown location error");
          $("#city").html("Error");
          $("#weather").html('<i class="wi wi-cloud"></i>');
          $("#sun").html("--");
          $("#sun-time").html("--:--");
          $("#temperature").html("--");
          $("#humidity").html("--");
          break;
      }
    },
  );
}
