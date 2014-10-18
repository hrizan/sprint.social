/*global $$*/

var race = (function() {
    "use strict";

    var race = {};

    race.init = function () {
        configureStart();
    };

    var configureStart = function () {
        $$(".start").on("click", startRace);
    };

    var startRace = function () {
        $$(".marks").css("display", "none");
        $$(".go").css("display", "block");
    };

    return race;
})();
