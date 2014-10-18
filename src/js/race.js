/*global $$, pedometer, backgroundtask*/

var race = (function() {
    "use strict";

    var race = {};

    race.metrics = {};

    race.init = function () {
        configureButtons();
    };

    var configureButtons = function () {
        $$(".start").on("click", startRace);
        $$(".cancel").on("click", cancelRace);
        $$(".retry").on("click", showRetry);
        $$(".back.link").on("click", pedometer.stopPedometerUpdates);
    };

    var startRace = function () {
        race.metrics = {};
        race.metrics.splits = [];

        $$(".marks").css("display", "none");
        $$(".go").css("display", "block");

        startBackgroundTask();
    };

    var cancelRace = function () {
        pedometer.stopPedometerUpdates(showRetry);
    };

    var showRetry = function () {
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
        pedometer.startPedometerUpdates(onPedometerDataReceived);
    };

    var onPedometerDataReceived = function (pedometerData) {
        var distance = pedometerData.distance;
        addSplitTime(distance);

        if (pedometerData.distance >= 100) {
            navigator.vibrate(3000);
            navigator.notification.beep(3);
            pedometer.stopPedometerUpdates(finishRace);
        }
    };

    var addSplitTime = function (distance) {
        if (race.metrics.splits) {
            race.metrics.splits.push({
                "timeStamp": new Date(),
                "distance": distance
            });
        }
    };

    return race;
})();
