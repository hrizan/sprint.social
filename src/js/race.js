/*global $$, pedometer, backgroundtask, app, telerik*/

var race = (function() {
    "use strict";

    var race = {};

    race.data = {};

    race.init = function (qs) {
        race.data = {
            friendId: qs.friendId,
            raceId: qs.raceId,
            userId: app.user.Identity.Facebook.id,
            solo: qs.solo
        };
        configureButtons();
    };

    var configureButtons = function () {
        $$(".start").on("click", startRace);
        $$(".cancel").on("click", cancelRace);
        $$(".retry").on("click", showRetry);
        $$(".submit").on("click", submitResult);
        $$(".result").on("click", seeResult);
        $$(".back.link").on("click", pedometer.stopPedometerUpdates);
    };

    var startRace = function () {
        race.data.splits = [];

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
        if (race.data.solo) {
            $$(".solo").css("display", "block");
        } else {
            $$(".challenge").css("display", "block");
        }
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
        if (race.data.splits) {
            race.data.splits.push({
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

        var method = race.data.raceId ? "accept" : "challenge";

        telerik[method](app.userToken, race.data,
            submissionSuccess, submissionFailed);
    };

    var submissionFailed = function () {
        app.f7.hidePreloader();
        navigator.notification.confirm("Submission failed, try again?",
            submitResult, "Sprint Social", ["OK", "Cancel"]);
    };

    var submissionSuccess = function (raceResult) {
        app.f7.hidePreloader();
        console.log(raceResult);
        if (race.data.raceId) {
            app.mainView.loadPage("result.html?raceId=" + race.data.raceId);
        }
        // TODO show when no result yet
    };

    var seeResult = function () {
        app.mainView.loadPage("result.html");
    };

    return race;
})();
