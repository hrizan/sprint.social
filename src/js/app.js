/*global localStorage, Dom7, StatusBar, signup, plugins, backgroundtask, pedometer */

var $$ = Dom7;

var data = {};
data.url = "TODO";

var app = (function() {
    "use strict";

    var app = {};

    app.f7 = null;
    app.mainView = null;
    app.signupView = null;

    app.init = function() {
        initFramework();

        app.userToken = localStorage.getItem("userToken");
        app.user = localStorage.getItem("user");

        if (app.userToken) {
            app.loadMain();
        } else {
            app.signupView.loadPage("signup.html");
        }

        setTimeout(hideSplash, 500);
    };

    app.preInit = function() {
        plugins.uniqueDeviceID.get(setDeviceId);
    };

    app.getDeviceId = function() {
        return device.uuid + app.phoneNumber;
    };

    var setDeviceId = function(uuid) {
        device.uuid = uuid;
        app.init();
    };

    app.loadMain = function() {
        app.signupView.destroy();
        $$(".view-signup").remove();
        $$(".view-main").css("display", "block");

        app.mainView.loadPage("main.html");

        setTimeout(hideSplash, 500);
    };

    app.showMessage = function(msg, callback) {
        navigator.notification.alert(msg, callback, "Sprint Social", "OK");
    };

    var hideSplash = function() {
        navigator.splashscreen.hide();
        StatusBar.show();
        StatusBar.styleLightContent();
    };

    var initFramework = function() {
        app.f7 = new Framework7({
            modalTitle: "Sprint Social",
            sortable: false,
            swipeout: false,
            swipeBackPage: false,
            animatePages: false,
            preloadPreviousPage: false
        });

        app.signupView = app.f7.addView(".view-signup");

        app.mainView = app.f7.addView(".view-main", {
            dynamicNavbar: true
        });

        document.addEventListener("pageInit", onPageInit);
    };

    var onPageInit = function(e) {
        var name = e.detail.page.name;

        if (window[name] && typeof(window[name].init) === "function") {
            // TODO app builder analytics
            return window[name].init(e.detail.page.query);
        }
    };

    return app;
})();

document.addEventListener("deviceready", app.preInit, false);
