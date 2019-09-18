$(document).ready(function () {
    var SECONDS = 1000;
    var MINUTES = 60 * SECONDS;

    setInterval(updateClock, SECONDS);

    setInterval(getLocation, SECONDS);

});


function updateClock() {

    var today = new Date();

    if (today.getMinutes() <= 9)
        var time = today.getHours() + ':0' + today.getMinutes();
    else
        var time = today.getHours() + ':' + today.getMinutes();

    $("#clock").html(time);
    //console.log(time);

   
}


function getLocation() {

    if ("geolocation" in navigator){ //check geolocation available 
        //try to get user current location using getCurrentPosition() method
        navigator.geolocation.getCurrentPosition(function(position){ 
                //console.log("Found your location \nLat : "+position.coords.latitude+" \nLang :"+ position.coords.longitude);
            });
    }else{
        console.log("Browser doesn't support geolocation!");
    }
}