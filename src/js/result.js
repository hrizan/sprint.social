/*global document, app, facebookConnectPlugin, telerik, localStorage, race */
var result = (function() {
    "use strict";

    var c = document.getElementById("c");
    var result = {};

    result.init = function() {
        result.replay(race.metrics);
    };

    result.replay = function(rx) {
        var paticipants = rx.count,
            surface = c.getContext('2d');
        
        
        
    };


    return result;
})();
