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

    var finishRace = function () {
        $$(".marks, .go").css("display", "none");
        $$(".finish").css("display", "block");
    };

    var startBackgroundTask = function () {
        backgroundtask.start(backgroundDistanceMonitor);
    };

    var backgroundDistanceMonitor = function () {
        var onPedometer =
        pedometer.startPedometerUpdates(onPedometer);
    };

    var onPedometerDataReceived = function (pedometerData) {
        // TODO store increments

        if (pedometerData.distance >= 100) {
            navigator.vibrate(3000);
            navigator.notification.beep(3);
            finishRace();
        }
    };

    return race;
})();
