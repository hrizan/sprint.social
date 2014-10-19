/*global localStorage, Dom7, StatusBar, signup, plugins, backgroundtask, pedometer */

var $$ = Dom7;

var app = (function() {

    "use strict";

    var app = {};

    app.f7 = null;
    app.mainView = null;
    app.signupView = null;
    app.monitor = null;

    app.store = function(k, v) {
        localStorage.setItem(k, JSON.stringify(v));
    };

    app.load = function(k, v) {
        return JSON.parse(localStorage.getItem(k));
    };

    app.init = function() {
        initFramework();
        initAnalytics();

        app.userToken = app.load("userToken");
        app.user = app.load("user");
        app.friends = app.load("friends");
        app.results = app.load("results");

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

    var initAnalytics = function () {
        var analytics = window.plugins.EqatecAnalytics;
        var settings = analytics.Factory.CreateSettings("378434087bd042b590feff400a76f6cf", "1.0.0");
        analytics.Factory.CreateMonitorWithSettings(settings, function() {
            app.monitor = analytics.Monitor;
            app.monitor.Start();
        });
    };

    app.trackFeature = function (feature) {
        if (app.monitor) {
            app.monitor.TrackFeature(feature);
        }
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
            app.trackFeature("Page." + name.charAt(0).toUpperCase() + name.slice(1));
            return window[name].init(e.detail.page.query);
        }
    };

    return app;
})();

document.addEventListener("deviceready", app.preInit, false);
