/*global $$*/

var race = (function() {
    "use strict";

    var race = {};

    race.init = function () {
        setAlignment();
    };

    var setAlignment = function () {
        var targetTop = (- $$(".vertical-align").height() / 2) + "px";
        $$(".vertical-align").css("margin-top", targetTop);
    };

    return race;
})();
