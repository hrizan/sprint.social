/*global $$, pedometer, backgroundtask, app, telerik*/

var race = (function() {
    "use strict";

    var race = {};

    var raceData = {};

    race.init = function (qs) {
        raceData = {
            friendId: qs.friendId,
            userId: app.user.Identity.Facebook.id
        };
        configureButtons();
    };

    var configureButtons = function () {
        $$(".start").on("click", startRace);
        $$(".cancel").on("click", cancelRace);
        $$(".retry").on("click", showRetry);
        $$(".submit").on("click", submitResult);
        $$(".back.link").on("click", pedometer.stopPedometerUpdates);
    };

    var startRace = function () {
        raceData.splits = [];

        $$(".marks, .finish").css("display", "none");
        $$(".go").css("display", "block");

        startBackgroundTask();
    };

    var cancelRace = function () {
        pedometer.stopPedometerUpdates(showRetry);
    };

    var showRetry = function () {
        $$(".marks").css("display", "block");
        $$(".go, .finish").css("display", "none");
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
        if (raceData.splits) {
            raceData.splits.push({
                "timeStamp": new Date().getTime(),
                "distance": distance
            });
        }
    };

    var submitResult = function (i) {
        if (i && i === 2) {
            return;
        }
        app.f7.showPreloader("Submitting...");
        telerik.challenge(app.userToken, raceData,
            submissionSuccess, submissionFailed);
    };

    var submissionFailed = function () {
        app.f7.hidePreloader();
        navigator.notification.confirm("Submission failed, try again?",
            submitResult, "Sprint Social", ["OK", "Cancel"]);
    };

    var submissionSuccess = function () {
        app.f7.hidePreloader();
        // TODO show result or whatever
    };

    return race;
})();
