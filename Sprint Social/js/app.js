/*global kendo*/

var app = (function () {
    "use strict";

    var app = {};

    app.init = function () {
        app.kendo = new kendo.mobile.Application(document.body, {
            initial: "views/signin.html"
        });

        navigator.splashscreen.hide();
    };

    return app;
})();

document.addEventListener("deviceready", app.init, false);
