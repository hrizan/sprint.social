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
        console.log(challenges.Result);
        if (challenges.Count > 0) {
            renderChallenges(challenges.Result);
        } else {
            $$("#challenges").html("<div class='content-center vertical-align-ish'>" +
                "<h3>You have no new challenges</h3></div>");
        }
    };

    var renderChallenges = function (challenges) {
        var html = "";

        fjs.each(function(challenge) {
            var match = fjs.first(function(friend) {
                console.log(friend.id);
                console.log(challenge.ChallengerId);
                return friend.id.toString() === challenge.ChallengerId.toString();
            }, app.friends);

            if (match) {
                html = getChallengeHtml({
                    "raceId": challenge.Id,
                    "friendName": match.name
                });
            }
        }, challenges);

        $$("#challenges").html("<ul>" + html + "</ul>");
    };

    var getChallengeHtml = fjs.map(function(challenge) {
        return "<li><a href='race.html?raceId=" + challenge.raceId +
            "' class='item-link with-animation'><div class='item-content'>" +
            "<div class='item-inner'><div class='item-title'>" + challenge.friendName +
            "</div></div></div></a></li>";
    });

    return main;
})();
