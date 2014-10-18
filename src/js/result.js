/*global document, app, facebookConnectPlugin, telerik, localStorage, race ,  createjs */
var result = (function() {
    "use strict";

    var result = {};



    result.init = function() {
        result.replay(race.metrics.splits);
    };

    var scaleTo = function(s, e) {
        var f = s / 100;
        return e * f;
    };

    var handleComplete = function(tween) {
        var ball = tween._target;
    };

    result.replay = function(rx, ry) {
        var c = document.getElementById("c");

        var stage = new createjs.Stage(c);
        stage.autoClear = true;

        var ball = new createjs.Shape();
        ball.graphics.setStrokeStyle(1, 'round', 'round');
        ball.graphics.beginStroke(('#000000'));
        ball.graphics.beginFill("#FF0000").drawCircle(0, 0, 5);
        ball.graphics.endStroke();
        ball.graphics.endFill();
        ball.graphics.setStrokeStyle(1, 'round', 'round');
        ball.graphics.beginStroke(('#000000'));

        ball.graphics.endStroke();
        ball.x = c.width / 3;
        ball.y = 10;


        var tween = createjs.Tween.get(ball, {
            loop: false
        });
        
        var rxd =  10000 / (rx[rx.length - 1].timeStamp - rx[0].timeStamp);
        
        var time = rx[0].timeStamp;
        for (var i = 0; i !== rx.length; i = i + 1) {
            tween = tween.to({
                x: ball.x,
                y: scaleTo(c.height, rx[i].distance)
            }, rxd * (rx[i].timeStamp));
            time = rx[i].timeStamp;
        }

        stage.addChild(ball);

        createjs.Ticker.addEventListener("tick", stage);

    };

    return result;
})();
