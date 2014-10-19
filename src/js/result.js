/*global $$, document, app, facebookConnectPlugin, telerik, localStorage, race ,  createjs */
var result = (function() {
    "use strict";


    function dashedLineTo(graphics, x1, y1, x2, y2, dashLen) {
        graphics.moveTo(x1, y1);

        var dX = x2 - x1;
        var dY = y2 - y1;
        var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
        var dashX = dX / dashes;
        var dashY = dY / dashes;

        var q = 0;
        while ((q = q + 1) < dashes) {
            x1 += dashX;
            y1 += dashY;
            graphics[q % 2 === 0 ? 'moveTo' : 'lineTo'](x1, y1);
        }
        graphics[q % 2 === 0 ? 'moveTo' : 'lineTo'](x2, y2);
    }

    var result = {};

    var zip = function(ax, bx) {
        var rx = [];

        for (var i = 0; i !== ax.length; i = i + 1) {
            rx.push({
                timeStamp: ax[i],
                distance: bx[i]
            });
        }
        return rx;
    };


    var loadRace = function(id, cb) {
        if (!id) {
            cb(race.data.splits, []);
        } else {
            telerik.race(app.userToken, id, function(r) {
                var parsed = JSON.parse(r).Result;
                cb(zip(parsed.ChallengerTime, parsed.ChallengerDistance), zip(parsed.ChallengedTime, parsed.ChallengedDistance));
            });
        }
    };

    result.init = function(qs) {
        loadRace(qs.raceId, result.replay);
    };

    var scaleTo = function(s, e) {
        var f = s / 100;
        return e * f;
    };


    var runner = function(c, x, col) {
        var ball = new createjs.Shape();
        ball.graphics.setStrokeStyle(2, 'round', 'round');
        ball.graphics.beginStroke(('#000000'));
        ball.graphics.beginFill(col).drawCircle(0, 0, 10);
        ball.graphics.endStroke();
        ball.graphics.endFill();
        ball.graphics.setStrokeStyle(1, 'round', 'round');
        ball.graphics.beginStroke(('#000000'));

        ball.graphics.endStroke();
        ball.x = x;
        ball.y = 30;

        return ball;
    };

    var tweenfor = function(runner, rx, c) {
        var ms = (rx[rx.length - 1].timeStamp - rx[0].timeStamp);

        var tween = createjs.Tween.get(runner, {
            loop: false
        });
        tween = tween.wait(3);
        var rxd = 10000 / ms;
        for (var i = 1; i !== rx.length - 1; i = i + 1) {
            tween = tween.to({
                x: runner.x,
                y: scaleTo(c.height - 30, rx[i + 1].distance)
            }, rxd * (rx[i + 1].timeStamp - rx[i].timeStamp));
        }

        return {
            ms: ms,
            tween: tween
        };
    };



    var showResult = function(a1, a2) {
        var solo = a2 === null;

        var winning = a1;
        var losing = a2;
        var won = true;

        if (!solo && a2.ms < a1.ms) {
            won = false;
            winning = a2;
            losing = a1;
        }

        winning.tween.call(function(t) {
            $$("#c").css("display", "none");
            $$("#score").css("display", "block");
            if (!solo) {
                $$("#score h1").text((won ? "Won" : "Lost") + " in " + (winning.ms / 1000).toFixed(2) + " vs " + (losing.ms / 1000).toFixed(2) + " s");
            } else {
                $$("#score h1").text("Complete in " + (winning.ms / 1000).toFixed(2) + " s");
            }
        });
    };


    result.replay = function(c1, c2) {
        var c = document.getElementById("c");
        var g = new createjs.Graphics();

        var stage = new createjs.Stage(c);
        stage.autoClear = true;

        var startLine = new createjs.Shape(g);
        startLine.graphics.setStrokeStyle(2).beginStroke("#111111").moveTo(10, 30).lineTo(c.width - 10, 30);

        var finishLine = new createjs.Shape(g);
        finishLine.graphics.setStrokeStyle(2).beginStroke("#111111").moveTo(10, c.height - 30).lineTo(c.width - 10, c.height - 30);


        stage.addChild(startLine);
        stage.addChild(finishLine);

        var c1x = c.width / 3;
        if (!c2.length) {
            c1x = c.width / 2;
        }

        var challenger = runner(c, c1x, "#008080");
        var c1animation = tweenfor(challenger, c1, c);
        stage.addChild(challenger);

        if (c2.length) {
            var challengee = runner(c, 2 * (c.width / 3), "#ffa500");
            var c2animation = tweenfor(challengee, c2, c);

            stage.addChild(challengee);

            showResult(c1animation, c2animation);
        } else {
            showResult(c1animation, null);
        }


        createjs.Ticker.addEventListener("tick", stage);

    };

    return result;
})();
