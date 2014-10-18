/*global $$, pedometer, backgroundtask*/

var race = (function() {
    "use strict";

    var race = {};

    race.init = function () {
        configureButtons();
    };

    var configureButtons = function () {
        $$(".start").on("click", startRace);
        $$(".stop").on("click", stopRace);
    };

    var startRace = function () {
        $$(".marks").css("display", "none");
        $$(".go").css("display", "block");

        startBackgroundTask();
    };

    var stopRace = function () {
        $$(".marks").css("display", "block");
        $$(".go").css("display", "none");
    };

    var startBackgroundTask = function () {
        backgroundtask.start(backgroundDistanceMonitor);
    };

    var backgroundDistanceMonitor = function () {
        var stringthing = "";
        var onPedometer = function (pedometerData) {
            stringthing = new Date() + "<br/>" + pedometerData.distance;
            document.body.innerHTML = stringthing;
            if (pedometerData.distance >= 0) {
                navigator.vibrate(3000);
                navigator.notification.beep(3);
            }
        };
        pedometer.startPedometerUpdates(onPedometer);
    };

    return race;
})();
