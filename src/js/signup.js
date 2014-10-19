/*global app, facebookConnectPlugin, telerik, localStorage */

var signup = (function() {
    "use strict";

    var signup = {};

    var syncFriends = function(token, succ, error) {
        facebookConnectPlugin.api("/me/friends", ["user_friends"], function(res) {
            console.log(res);
            app.store("friends", app.friends = res.data);
            succ(app.friends);
        }, error);
    };

    var telerikSignIn = function(accessToken, succ) {
        telerik.login(accessToken, function(response) {
            response = JSON.parse(response);

            app.store("userToken", app.userToken = response.Result.access_token);

            telerik.me(app.userToken, function(user) {
                user = JSON.parse(user);

                app.store("user", app.user = user.Result);
                syncFriends(app.userToken, function(friends) {
                    succ(friends);
                });
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


    signup.profileimage = function (id, cb) {
        facebookConnectPlugin.api("/" + id + "/picture?redirect=false",[],function(res){
            return cb(res.data.url);
        });
    };


    return signup;
})();
