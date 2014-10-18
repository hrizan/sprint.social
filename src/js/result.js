/*global document, app, facebookConnectPlugin, telerik, localStorage, race ,  createjs */
var result = (function() {
    "use strict";

    var result = {};

    var loadRace = function(id, cb) {
        if (!id) {
            cb(race.data.splits, []);
        } else {
            telerik.race(app.userToken, id, cb);
        }
    };

    result.init = function() {
        var id = window.location.search;
        loadRace(id, result.replay);
    };

    var scaleTo = function(s, e) {
        var f = s / 100;
        return e * f;
    };


    var runner = function(c) {
        var ball = new createjs.Shape();
        ball.graphics.setStrokeStyle(2, 'round', 'round');
        ball.graphics.beginStroke(('#000000'));
        ball.graphics.beginFill("#FF0000").drawCircle(0, 0, 10);
        ball.graphics.endStroke();
        ball.graphics.endFill();
        ball.graphics.setStrokeStyle(1, 'round', 'round');
        ball.graphics.beginStroke(('#000000'));

        ball.graphics.endStroke();
        ball.x =
            ball.y = 10;

        return ball;
    };

    var tweenfor = function(runner, rx, c) {
        var tween = createjs.Tween.get(runner, {
            loop: false
        });

        var rxd = 10000 / (rx[rx.length - 1].timeStamp - rx[0].timeStamp);

        for (var i = 1; i !== rx.length - 1; i = i + 1) {
            tween = tween.to({
                x: runner.x,
                y: scaleTo(c.height, rx[i + 1].distance)
            }, rxd * (rx[i + 1].timeStamp - rx[i].timeStamp));
        }
    };


    result.replay = function(c1, c2) {
        var c = document.getElementById("c");

        var stage = new createjs.Stage(c);
        stage.autoClear = true;

        var c1x = c.width / 3;
        if (!c2.length) {
            c1x = c.width / 2;
        }

        var challenger = runner(c, c1x);
        tweenfor(challenger, c1, c);
        stage.addChild(challenger);

        if (c2.length) {
            var challengee = runner(c, 2 * (c.width / 3));
            tweenfor(challengee, c2, c);
            stage.addChild(challengee);
        }

        createjs.Ticker.addEventListener("tick", stage);

    };

    return result;
})();
