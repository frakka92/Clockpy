$(document).ready(function () {
    var SECONDS = 1000;

    setInterval(updateClock, SECONDS);
    setInterval(getLocation, SECONDS * 25);
});

function updateClock() {

    var today = new Date();

    if (today.getMinutes() <= 9)
        var time = today.getHours() + ':0' + today.getMinutes();
    else
        var time = today.getHours() + ':' + today.getMinutes();

    $("#clock").html(time);
}

function getLocation() {

    if ("geolocation" in navigator) { //check geolocation available 
        //try to get user current location using getCurrentPosition() method

        navigator.geolocation.getCurrentPosition(function (position) {

            var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric&APPID=c3d53da31b318530c87a1b37d0b899d8";
            //console.log(url);

            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json', // added data type
                success: function (res) {
                    console.log(res["main"]["temp"].toFixed(1));
                    $("#temperature").html(res["main"]["temp"].toFixed(1));
                }
            });

        });
    } else {
        console.log("Browser doesn't support geolocation!");
    }
}