/*global app, facebookConnectPlugin, telerik, localStorage */

var signup = (function() {
    "use strict";

    var signup = {};

    signup.init = function() {
        facebookConnectPlugin.getLoginStatus(function(status) {
            console.log(status);
            app.userToken = status.authResponse.accessToken;
            localStorage.setItem("userToken", app.userToken);
            app.loadMain();
        }, function() {});
    };

    signup.withFacebook = function() {
        facebookConnectPlugin.login(['user_friends', 'public_profile', 'email'],
            function(status) {
                console.log(JSON.stringify(status));
                telerik.login(status.authResponse.accessToken, function(response) {
                    console.log(JSON.stringify(response));
                }, function() {});
            },
            function(err) {
                console.log(JSON.stringify(err));
            });
    };

    return signup;
})();
