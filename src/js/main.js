/*global $$, app, telerik, fjs, signup*/

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
                html += getChallengeHtml(challenge.Id, match.name,
                    challenge.ModifiedAt, challenge.ChallengerId);
            }
        }, challenges);

        $$("#challenges").html("<ul>" + html + "</ul>");

        fjs.each(function(challenge) {
            var match = fjs.first(function(friend) {
                return friend.id.toString() === challenge.ChallengerId.toString();
            }, app.friends);

            signup.profileimage(challenge.ChallengerId, function (url) {
                $$("img.c-" + challenge.ChallengerId).prop("src", url);
            });
        }, challenges);
    };

    var getChallengeHtml = function (raceId, friendName, date, challengerId) {
        return "<li><a href='race.html?raceId=" + raceId +
            "' class='item-link with-animation'></div><div class='item-content'>" +
            "<div class='item-media'><img class='c-" + challengerId +
            "' src='/img/profile.jpg' width='40'/></div>" +
            "<div class='item-inner'><div class='item-title'>" + friendName +
            "</div><div class='item-text'>" + app.prettyDate(date) +
            "</div></div></div></a></li>";
    };

    return main;
})();
