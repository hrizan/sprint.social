/*global fjs */
var telerik = (function() {
    "use strict";

    var telerik = {};

    var serviceUri = function(service) {
        return "http://api.everlive.com/v1/Cpz7JJXyDcIJPbOl/" + service;
    };

    
    var anon = function(req) {req.setRequestHeader("Authorization",null);};
    var as = function(tok){ 
        return function(req) {req.setRequestHeader("Authorization",tok);};};


    var get = function(auth,service, succ, error) {
        var request = new XMLHttpRequest();
        request.open("GET", serviceUri(service), true);

        auth(request);

        request.onload = request.ontimeout = function() {
            if (request.status >= 200 && request.status < 400) {
                return succ(request.responseText);
            }

            console.log("Error for req: " + JSON.stringify(request));
            return error(request);
        };

        request.send();
    };


    var post = function(auth,service, params, succ, error) {
        var request = new XMLHttpRequest();
        request.open("POST", serviceUri(service), true);
        
        request.setRequestHeader("Content-Type", "application/json");
        auth(request);
        
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
        return post(anon, "Users", {
            "Identity": {
                "Provider": "Facebook",
                "Token": token
            }
        }, succ, error);
    };



    telerik.me = function(token, succ, error) {
        return get(as(token), "Users/me", succ, error);
    };


    return telerik;
})();
