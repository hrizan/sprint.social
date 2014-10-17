/*global kendo*/

var app = (function () {
    "use strict";

    var app = {};

    app.init = function () {
        navigator.splashscreen.hide();

        app.kendo = new kendo.mobile.Application(document.body, {
            initial: "views/signin.html"
        });
    };

    return app;
})();

document.addEventListener("deviceready", app.init, false);
