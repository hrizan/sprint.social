/*global facebookConnectPlugin, telerik */

var signup = (function() {
    "use strict";

    var signup = {};

    signup.init = function() {
        facebookConnectPlugin.
    };

    signup.withFacebook = function() {
        facebookConnectPlugin.login(['user_friends', 'public_profile', 'email'],
            function(status) {
                console.log(JSON.stringify(status));
                telerik.login(status.authResponse.accessToken, function(response) {
                    console.log(JSON.stringify(response));
                },function() {});
            },
            function(err) {
                console.log(JSON.stringify(err));
            });
    };
    return signup;
})();
