/*global app, facebookConnectPlugin, telerik, localStorage */

var signup = (function() {
    "use strict";

    var signup = {};

    var telerikSignIn = function(accessToken, succ) {
        telerik.login(accessToken, function(response) {
            
            response = JSON.parse(response);
            app.userToken = response.Result.access_token;
            localStorage.setItem("userToken", app.userToken);
            
            telerik.me(app.userToken, function(user) {
                user = JSON.parse(user);
                app.user = user;
                localStorage.setItem("user", user.Result);
                telerik.syncFriends(app.userToken,succ);
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
