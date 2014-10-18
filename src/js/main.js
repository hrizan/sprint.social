/*global $$, app, telerik, fjs*/

var main = (function() {
    "use strict";

    var main = {};

    main.init = function () {
        getChallenges();
    };

    var getChallenges = function (i) {
        telerik.myChallenges(app.userToken,
            app.user.Identity.Facebook.id,
            getSuccess, getChallenges);
    };

    var getSuccess = function (challenges) {
        challenges = JSON.parse(challenges);
        if (challenges.Count > 0) {
            renderChallenges(challenges.Result);
        } else {
            $$("#challenges").html("<div class='content-center vertical-align-ish'>" +
                "<h3>You have no new challenges</h3></div>");
        }
    };

    var renderChallenges = function (challenges) {
        var html = "<li class='list-group-title content-center'>" +
            "<h3>New Challenges!</h3></li>";

        fjs.each(function(challenge) {
            var match = fjs.first(function(friend) {
                return friend.id.toString() === challenge.ChallengerId.toString();
            }, app.friends);

            if (match) {
                html += getChallengeHtml(challenge.Id, match.name);
            }
        }, challenges);

        $$("#challenges").html("<ul>" + html + "</ul>");
    };

    var getChallengeHtml = function (raceId, friendName) {
        return "<li><a href='race.html?raceId=" + raceId +
            "' class='item-link with-animation'><div class='item-content'>" +
            "<div class='item-inner'><div class='item-title'>" + friendName +
            "</div></div></div></a></li>";
    };

    return main;
})();
