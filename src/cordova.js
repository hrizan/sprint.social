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
                    data.url = "http://localhost:2010";
                    handler();
                };
                document.addEventListener("DOMContentLoaded", loaded, false);
                window.addEventListener("load", loaded, false);
            } else if (document.attachEvent) {
                loaded = function() {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", loaded);
                        window.detachEvent("onload", loaded);
                        data.url = "http://localhost:2010";
                        handler();
                    }
                };
                document.attachEvent("onreadystatechange", loaded);
                window.attachEvent("onload", loaded);
            } else if (document.readyState === "complete") {
                data.url = "http://localhost:2010";
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

var nothing = function(){};

var facebookConnectPlugin = {
    getAccessToken: nothing,
    login:  nothing,
    getLoginStatus: nothing
}

localStorage.setItem("userToken","stubby");
localStorage.setItem("user",{});
