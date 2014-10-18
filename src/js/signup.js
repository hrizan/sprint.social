/*global app, facebookConnectPlugin, telerik, localStorage */

var signup = (function() {
    "use strict";

    var signup = {};

    var telerikSignIn = function(accessToken, succ) {
        telerik.login(accessToken, function(response) {
            app.userToken = response.access_token;
            localStorage.setItem("userToken", app.userToken);

            console.log(JSON.stringify(response));
            telerik.me(app.userToken, function(user) {
                app.user = user;
                localStorage.setItem("user", user);
                succ(user);
            }, function() {});
        }, function() {});
    };

    signup.init = function() {

        if(typeof(facebookConnectPlugin) === 'undefined'){
            app.userToken = "stubby";
            app.user = {};
        }
        facebookConnectPlugin.getLoginStatus(function(status) {
            console.log(status);
            telerikSignIn(status.authResponse.accessToken,
                function() {
                    app.loadMain();
                });
        }, function() {});
    };

    signup.withFacebook = function() {
        facebookConnectPlugin.login(['user_friends', 'public_profile', 'email'],
            function(status) {
                console.log(JSON.stringify(status));
                telerikSignIn(status.authResponse.accessToken,
                function() {
                    app.loadMain();
                });
            },
            function(err) {
                console.log(JSON.stringify(err));
            });
    };

    return signup;
})();
