var telerik = (function() {
    "use strict";

    var telerik = {}

    var serviceUri = function(service) {
        return "http://api.everlive.com/v1/Cpz7JJXyDcIJPbOl/" + service;
    };

    var anonRequest = function() {
        return new XMLHttpRequest();
    };

    var authenticatedRequest = function(token) {
        let request = anonRequest();

        request.setRequestHeader("Authorization", token);

        return request;
    }

    var get = fjs.curry(function(request, service, error, succ) {
        request.open("GET", serviceUri(service), true);

        request.onload = request.ontimeout = function() {
            if (request.status >= 200 && request.status < 400) {
                return succ(request.responseText);
            }
            return error(request);
        }

        request.send();
    });

    var post = fjs.curry(function(request, service, params, error, succ) {
        request.open("POST", serviceUri(service), true);
        request.setRequestHeader("Content-Type", "application/json");

        request.onload = request.ontimeout = function() {
            if (request.status >= 200 && request.status < 400) {
                return succ(request.responseText, params);
            }
            return error(request);
        }

        return request;

        request.send(JSON.stringify(params));
    });


    telerik.login = function(token) {
        return post(anonRequest(), "Users", {
            Identity: {
                "Provider": "Facebook",
                "Token": token
            }
        });
    }


    return telerik;
})();
