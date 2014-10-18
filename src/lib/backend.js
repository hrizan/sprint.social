/*global fjs , facebookConnectPlugin, app, localStorage */
var telerik = (function() {
    "use strict";

    var telerik = {};

    var serviceUri = function(service) {
        return "http://api.everlive.com/v1/Cpz7JJXyDcIJPbOl/" + service;
    };


    var anon = function(req) {
        req.setRequestHeader("Authorization", null);
    };
    var as = function(tok) {
        return function(req) {
            req.setRequestHeader("Authorization", "Bearer " + tok);
        };
    };


    var get = function(auth, service, succ, error) {
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
    


    var update = function(method,auth,service, params, succ, error) {
        var request = new XMLHttpRequest();
        request.open(method, serviceUri(service), true);
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

    var post = function(auth,service,params,succ,error) {
        update("POST",auth,service,params,succ,error);
    };

    var put = function(auth,service,id,params,succ,error) {
        update("PUT",auth,service + "/" + id,params,succ,error);
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

    var unzip = function(pairs) {
        var l = [],
            r = [];

        for (var i = 0; i !== pairs.length; i = i + 1) {
            l.push(pairs[i].timeStamp);
            r.push(pairs[i].distance);
        }

        return [r, l];
    };

    telerik.challenge = function(token, racedata, succ, error) {
        var unzipped = unzip(racedata);

        return post(as(token), "Race", {
            "ChallengerTime": unzipped[0],
            "ChallengerDistance": unzipped[1]
        }, succ, error);
    };

    telerik.accept = function(token,raceid,racedata,succ,error) {
        var unzipped = unzip(racedata);

        return put(as(token), "Race",raceid, {
            "ChallengedTime": unzipped[0],
            "ChallengedDistance": unzipped[1]
        }, succ, error);
    };


    return telerik;
})();
