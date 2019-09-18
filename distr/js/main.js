$(document).ready(function () {
    var SECONDS = 1000;
    var MINUTES = 60 * SECONDS;

    setInterval(updateClock, SECONDS);
    setInterval(getLocation, MINUTES/4);

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
            console.log("Found your location \nLat : " + position.coords.latitude + " \nLang :" + position.coords.longitude);

            //http request
            var xhr = new XMLHttpRequest();
            var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric&APPID=c3d53da31b318530c87a1b37d0b899d8";
            url = "https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22";
            
            console.log(url);

            xhr.open("GET", url, true);
            xhr.send();

            xhr.onreadystatechange = function () {
                if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                  //console.log(xhr.responseText);
                  var response = JSON.parse(xhr.responseText);
                  console.log("Temp " + response.main.temp);

                  //$("#temperature").html(response.main.temp);
                }
              };

        });
    } else {
        console.log("Browser doesn't support geolocation!");
    }
}