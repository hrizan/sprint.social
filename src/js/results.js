/*global $$, app, telerik*/

var results = (function() {
    "use strict";

    var results = {};

    results.init = function () {
        renderResultsOfMyChallenges();
    };

    var renderResultsOfMyChallenges = function () {
        telerik.resultsOfMyChallenges(app.userToken,
            app.user.Identity.Facebook.id,
            getResultsOfMyChallengesSuccess, renderResultsOfMyChallenges);
    };

    var renderResultsOfBeingChallenged = function () {
        telerik.resultsOfBeingChallenged(app.userToken,
            app.user.Identity.Facebook.id,
            getResultsOfBeingChallengedSuccess, renderResultsOfBeingChallenged);
    };

    var getResultsOfMyChallengesSuccess = function (challenges) {
        challenges = JSON.parse(challenges);
        if (challenges.Count > 0) {
            renderChallenges(challenges.Result, "Results of your challenges", 1);
        } else {
            $$("#results1").html("<div class='content-center vertical-align-ish'>" +
                "<h3>No results of your challenges</h3></div>");
        }
        renderResultsOfBeingChallenged();
    };

    var getResultsOfBeingChallengedSuccess = function (challenges) {
        challenges = JSON.parse(challenges);
        if (challenges.Count > 0) {
            renderChallenges(challenges.Result, "Results of being challenged", 2);
        } else {
            $$("#results2").html("<div class='content-center vertical-align-ish'>" +
                "<h3>No results of being challenged</h3></div>");
        }
    };

    var renderChallenges = function (challenges, title, id) {
        var html = "<li class='list-group-title content-center'>" +
            "<h3>" + title + "</h3></li>";

        fjs.each(function(challenge) {
            var match = fjs.first(function(friend) {
                if (id === 1) {
                    return friend.id.toString() === challenge.ChallengedId.toString();
                }
                return friend.id.toString() === challenge.ChallengerId.toString();
            }, app.friends);

            if (match) {
                html += getChallengeHtml(challenge.Id, match.name, challenge.ModifiedAt);
            }
        }, challenges);

        $$("#results" + id).html("<ul>" + html + "</ul>");
    };

    var getChallengeHtml = function (raceId, friendName, date) {
        return "<li><a href='result.html?raceId=" + raceId +
            "' class='item-link with-animation'><div class='item-content'>" +
            "<div class='item-media'><img src='" + 1 + "' width='40'/></div>" +
            "<div class='item-inner'><div class='item-title'>" + friendName +
            "</div><div class='item-text'>" + app.prettyDate(date) +
            "</div></div></div></a></li>";
    };

    return results;
})();
