/*global fjs */
var telerik = (function() {
    "use strict";

    var telerik = {};

    var serviceUri = function(service) {
        return "http://api.everlive.com/v1/Cpz7JJXyDcIJPbOl/" + service;
    };

    var anonRequest = function() {
        var request = anonRequest();

        request.setRequestHeader("Authorization", "");

        return request;
    };

    var authenticatedRequest = function(token) {
        var request = anonRequest();

        request.setRequestHeader("Authorization", token);

        return request;
    };

    var get = function(request, service, succ, error) {
        request.open("GET", serviceUri(service), true);

        request.onload = request.ontimeout = function() {
            if (request.status >= 200 && request.status < 400) {
                return succ(request.responseText);
            }

            console.log("Error for req: " + JSON.stringify(request));
            return error(request);
        };

        request.send();
    };


    var post = function(request, service, params, succ, error) {
        request.open("POST", serviceUri(service), true);
        request.setRequestHeader("Content-Type", "application/json");

        request.onload = request.ontimeout = function() {
            if (request.status >= 200 && request.status < 400) {
                return succ(request.responseText, params);
            }
            console.log("Error for req: " + JSON.stringify(request));
            return error(request);
        };

        request.send(JSON.stringify(params));

        return request;
    };

    telerik.login = function(token, succ, error) {
        return post(anonRequest(), "Users", {
            "Identity": {
                "Provider": "Facebook",
                "Token": token
            }
        }, succ, error);
    };



    telerik.me = function(token, succ, error) {
        return get(authenticatedRequest(token), "Users/me", succ, error);
    };


    return telerik;
})();
