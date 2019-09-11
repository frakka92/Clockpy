$(document).ready(function () {
    var SECONDS = 1000;
    var MINUTES = 60 * SECONDS;
    
    setInterval(updateClock, SECONDS);

});


function updateClock() {

    var today = new Date();
    var time = today.getHours() + ':' + today.getMinutes();

    $("#clock").html(time);

    console.log(time);

}