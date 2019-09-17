$(document).ready(function () {
    var SECONDS = 1000;
    var MINUTES = 60 * SECONDS;
    
    setInterval(updateClock, SECONDS);

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