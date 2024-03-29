// jshint ignore: start

window.cordova = (function() {
    "use strict";

    var cordova = {};

    cordova.m_addEventListener = document.addEventListener;

    document.addEventListener = function(e, handler, capture) {
        if (e.toLowerCase() === "deviceready") {
            var loaded;
            if ((typeof(handler) === "undefined") || (typeof(handler) !== "function")) {
                return;
            }

            if (document.addEventListener) {
                loaded = function() {
                    document.removeEventListener("DOMContentLoaded", loaded, false);
                    window.removeEventListener("load", loaded, false);
                    handler();
                };
                document.addEventListener("DOMContentLoaded", loaded, false);
                window.addEventListener("load", loaded, false);
            } else if (document.attachEvent) {
                loaded = function() {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", loaded);
                        window.detachEvent("onload", loaded);
                        handler();
                    }
                };
                document.attachEvent("onreadystatechange", loaded);
                window.attachEvent("onload", loaded);
            } else if (document.readyState === "complete") {
                setTimeout(handler, 1);
            }
        } else {
            cordova.m_addEventListener.call(document, e, handler, capture);
        }
    };

    return cordova;
}());

navigator.splashscreen = (function() {
    "use strict";

    var splashscreen = {};

    splashscreen.hide = function() {
        console.log("navigator.splashscreen.hide()");
    };

    splashscreen.show = function() {
        console.log("navigator.splashscreen.show()");
    };

    return splashscreen;
}());

navigator.notification = (function() {
    "use strict";

    var notification = {};

    notification.alert = notification.confirm = function(message, callback) {
        alert(message);
        if (callback && typeof(callback) === "function") {
            callback(1);
        }
    };

    notification.vibrate = function(message) {
        console.log("navigator.notification.vibrate()");
    };

    notification.beep = function(count) {
        console.log("navigator.notification.beep('" + count + "')");
    };

    return notification;
}());

var gamecenter = (function() {
    "use strict";

    var gamecenter = {};

    gamecenter.auth = function() {
        console.log("gamecenter.auth()");
    };

    gamecenter.submitScore = function(a, b, c) {
        console.log("gamecenter.submitScore(" + JSON.stringify(c) + ")");
    };

    return gamecenter;
}());

var socialmessage = (function() {
    "use strict";

    var socialmessage = {};

    socialmessage.send = function(params) {
        console.log("socialmessage.send(" + JSON.stringify(params) + ")");
    };

    return socialmessage;
}());

var plugins = {};

plugins.uniqueDeviceID = (function() {
    "use strict";

    var uniqueDeviceID = {};

    uniqueDeviceID.get = function(a) {
        setTimeout(a.bind(null, "Test"), 10);
    };

    return uniqueDeviceID;
}());

var StatusBar = (function() {
    "use strict";

    var StatusBar = {};

    StatusBar.show = function() {
        console.log("StatusBar.show()");
    };

    StatusBar.styleLightContent = function() {
        console.log("StatusBar.styleLightContent()");
    };

    return StatusBar;
}());

device = {};
device.uuid = "Test";
device.platform = "Test";

var LocalFileSystem = {
    PERSISTENT: 0,
    TEMPORARY: 1
};

var requestFileSystem = function(access_type, size, onSuccess, onError) {
    onSuccess({
        name: "name",
        root: new DirectoryEntry("root", "//")
    });
};

var DirectoryEntry = function(name, fullpath) {
    this.isFile = true;
    this.isDirectory = false;
    this.name = name;
    this.fullpath = fullpath;

    this.createReader = function() {
        var reader = {};
        reader.readEntries = function(onSuccess, onError) {
            onSuccess(getStoredFiles());
        };
        return reader;
    };
    this.getFile = function(path, options, onSuccess, onError) {
        onSuccess(makeFile(path));
    };
};

var FileReader = function(name, fullpath) {
    this.readAsText = function(file) {
        if (!this.onloadend) {
            return;
        }
        var result = localStorage.getItem("file-" + file.name);
        this.onloadend({
            target: {
                result: result
            }
        });
    };
};

var makeFileWriter = function(name) {
    var filewriter = {
        readyState: "DONE",
        fileName: name,
        length: 10000,
        error: null
    };
    filewriter.write = function(content) {
        localStorage.setItem("file-" + name, content.toString());
        if (filewriter.onwriteend) {
            filewriter.onwriteend();
        }
    };
    return filewriter;
};

var makeFile = function(name) {
    var entry = new DirectoryEntry(name, "//" + name);

    entry.createWriter = function(onSuccess, onError) {
        onSuccess(makeFileWriter(name));
    };

    entry.file = function(onSuccess, onError) {
        onSuccess({
            name: name,
            fullPath: "/root/" + name,
            type: "text/plain",
            size: 10000,
            lastModifiedDate: new Date().getTime()
        });
    };
    return entry;
};

var getStoredFiles = function() {
    var files = [];
    for (var key in localStorage) {
        if (key.substring(0, 5) === "file-") {
            files.push(makeFile(key.replace("file-", "")));
        }
    }
    return files;
};

var backgroundtask = (function() {
    "use strict";

    var backgroundtask = {};

    backgroundtask.start = function(task) {
        setTimeout(task, 10);
    };

    return backgroundtask;
}());

var pedometer = (function() {
    "use strict";

    var pedometer = {};
    var doStop;

    pedometer.startPedometerUpdates = function(callback) {
        var total = 0;
        doStop = false;

        var sendDistance = function() {
            total += Math.random() * 10;
            setTimeout(function() {
                console.log(total);
                callback({
                    "distance": total
                });
                if (!doStop) {
                    sendDistance();
                }
            }, 500);
        };

        sendDistance();
    };

    pedometer.stopPedometerUpdates = function(callback) {
        doStop = true;
        if (typeof(callback) === "function") {
            setTimeout(callback, 10);
        }
    };

    return pedometer;
}());

var nothing = function() {};

var facebookConnectPlugin = {
    getAccessToken: nothing,
    login: nothing,
    getLoginStatus: nothing,
    api: nothing
};

plugins.EqatecAnalytics = {
    Factory: {
        CreateSettings: nothing,
        CreateMonitorWithSettings: nothing
    }
};

localStorage.setItem("userToken", JSON.stringify("7bFWVC9bH9eX83hE90OW2OVdD3qqQZSfk4QbN3zT04inHXSbsl3biiAIYkaPCu4lH08N1tcO5BaDgdGJv2QNYic2raJooHZPXFbZHMLrMBd9ZnjEhxZ9ooHC8KU8pGL0WpZ88EjzAo5Ko9LF60492hhYJrL0xaCNHTUxY1doh4G0xsNTdu7R0UaaVDnEw7OMdm3UNrJpMcrpH2P0LOaUdWSW7T2aoEEuhovkKrKSeZa7DATKpmWhzu0rvurDU3U0"));
localStorage.setItem("user", JSON.stringify({
    "IsVerified": true,
    "IdentityProvider": "Facebook",
    "Identity": {
        "Facebook": {
            "id": "10152797785926873",
            "email": "ryansroberts@gmail.com",
            "first_name": "Ryan",
            "gender": "male",
            "last_name": "Roberts",
            "link": "https://www.facebook.com/app_scoped_user_id/10152797785926873/",
            "locale": "en_US",
            "name": "Ryan Roberts",
            "timezone": 3,
            "updated_time": "2014-09-30T23:49:57+0000",
            "verified": true
        }
    },
    "Email": "ryansroberts@gmail.com",
    "DisplayName": "Ryan Roberts",
    "Role": "6c7ed610-5633-11e4-af4d-85398d7b83c5",
    "CreatedAt": "2014-10-18T11:40:14.634Z",
    "ModifiedAt": "2014-10-18T11:40:14.634Z",
    "CreatedBy": "00000000-0000-0000-0000-000000000000",
    "ModifiedBy": "00000000-0000-0000-0000-000000000000",
    "Owner": "86ad60a0-56bb-11e4-81d3-4556a19d6583",
    "Id": "86ad60a0-56bb-11e4-81d3-4556a19d6583",
    "Meta": {
        "Permissions": {
            "CanRead": true,
            "CanUpdate": true,
            "CanDelete": true
        }
    }
}));
localStorage.setItem("friends", JSON.stringify(
    [{
        "name": "Lee Crossley",
        "id": "10152389087085840"
    }]
));
