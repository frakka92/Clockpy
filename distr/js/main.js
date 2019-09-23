$(document).ready(function () {
    var SECONDS = 1000;
    var weather = {
        '01d': 'wi-day-sunny',
        '01n': 'wi-night-clear',
        '02d': 'wi-day-sunny-overcast',
        '02n': 'wi-night-cloudy',
        '03d': 'wi-day-cloudy',
        '03n': 'wi-night-cloudy',
        '04d': 'wi-cloudy',
        '04n': 'wi-cloudy',
        '09d': 'wi-rain',
        '09n': 'wi-rain',
        '10d': 'wi-day-rain',
        '10n': 'wi-night-rain',
        '11d': 'wi-day-thunderstorm',
        '11n': 'wi-night-thunderstorm',
        '13d': 'wi-day-snow',
        '13n': 'wi-night-snow',
        '50d': 'wi-owm-701',
        '50n': 'wi-owm-741'
    };
    getLocation(weather);

    setInterval(updateClock, SECONDS);
    setInterval(function () {
        getLocation(weather);
    }, SECONDS * 25);

});

function updateClock() {

    var today = new Date();

    if (today.getMinutes() <= 9)
        var time = today.getHours() + ':0' + today.getMinutes();
    else
        var time = today.getHours() + ':' + today.getMinutes();

    //console.log(time);
    $("#clock").html(time);

}

function getLocation(weather) {

    if ("geolocation" in navigator) { //check geolocation available 
        //try to get user current location using getCurrentPosition() method

        navigator.geolocation.getCurrentPosition(function (position) {

            var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric&APPID=c3d53da31b318530c87a1b37d0b899d8";
            console.log(url);
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json', // added data type
                success: function (res) {
                    //console.log(res["main"]["temp"].toFixed(1));
                    $("#temperature").html(res["main"]["temp"].toFixed(1));
                    $("#humidity").html(res["main"]["humidity"]);
                    $("#city").html(res["name"]);

                    if (typeof weather[res["weather"][0]["icon"]] == 'undefined')
                        $("#weather").html("<i class=\"wi wi-na\"></i>");
                    else
                        $("#weather").html("<i class=\"wi " + weather[res["weather"][0]["icon"]] + "\"></i>");

                    if (Math.floor(new Date().getTime()/1000.0) > (res["sys"]["sunset"] + 60 * 60)) {
                        $("#sun").html("<i class=\"wi wi-sunrise fa-sm\"></i>");
                        var sunrise = new Date(res["sys"]["sunrise"] * 1000);
                        //console.log("sunrise " +sunrise);
                        $("#sun-time").html(sunrise.getHours() + ":" + sunrise.getMinutes());
                    }
                    else {
                        $("#sun").html("<i class=\"wi wi-sunset fa-sm\"></i>");
                        var sunset = new Date(res["sys"]["sunset"] * 1000);
                        //console.log("sunset " +sunset.getHours() + ":" + sunset.getMinutes());
                        $("#sun-time").html(sunset.getHours() + ":" + sunset.getMinutes());
                    }
                }
            });

        });
    } else {
        console.log("Browser doesn't support geolocation!");
    }
}