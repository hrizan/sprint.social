/*global $$*/

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
    };

    var stopRace = function () {
        $$(".marks").css("display", "block");
        $$(".go").css("display", "none");
    };

    return race;
})();
