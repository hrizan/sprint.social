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
                return succ(user);
            }, function() {});
        }, function() {});
    };

    signup.init = function() {
        facebookConnectPlugin.getLoginStatus(function(res) {
            if (res.status !== "connected") {
                return;
            }
            facebookConnectPlugin.getAccessToken(function(token) {
                telerikSignIn(token,
                    function() {
                        app.loadMain();
                    });
            });
        }, function() {});
    };

    signup.withFacebook = function() {
        facebookConnectPlugin.login(['user_friends', 'public_profile', 'email'],
            function(res) {
                console.log(res);
                facebookConnectPlugin.getAccessToken(function(token) {
                    console.log(token);
                    telerikSignIn(token,
                        function() {
                            app.loadMain();
                        });
                });
            },
            function(err) {
                console.log(JSON.stringify(err));
            });
    };

    return signup;
})();
