(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Easer = require('easing').Easer,
  Bezier = require('bezier').Bezier,
  is = require('is'),
  each = require('each'),
  colorParse = require('color-parser'),
  parseDuration = require('parse-duration'),
  tick = require('tick');


var processStates = function( states ){

  if ( is.object( states ) ){

    return states;

  } else if (is.array(states)){

    return states;

  } else if (is.string(states)){

    var rgb = colorParse(states);

    if(rgb){

      return rgb;

    }else{

      throw new Error('Invalid string input!');

    }

  } else if (is.number(states)){

    return {
      tween : states
    };

  }
  // worst case scenario..

  return {
    tween : 0
  };

};

var buildPaths = function(){

  if(this._pathMode==='linear'){

    each(this.tweens, function(tween){

      tween.path = new Bezier().c1([0,tween.start]).c2([0, tween.end]).isLinear();

    });
  }

  return true;

};

var Tween = function( startStates ){

  this.tweens = {};

  this._duration = 1000;

  this._easer = new Easer().using('linear');
  this._pathMode = 'linear';
  this._isArray = (is.array(startStates));
  this._useDelta = false;

  this.callbacks = {
    'tick' : function(){},
    'begin' : function(){},
    'finish' : function(){}
  };

  this.from( startStates );

  return this;
  
};

Tween.prototype = {

  from : function( startStates ){

    var self = this,
      states = processStates( startStates );

    each( states, function( value, key ){

      self.tweens[key] = {
        start : value,
        end : 0
      };

    });

    buildPaths.call(this);

    return this;

  },

  to : function( endStates ){

    var self = this,
      states = processStates( endStates );

    each( states, function( value, key ){

      if(self.tweens[key]){

        self.tweens[key].end = value;

      }else{

        self.tweens[key] = {
          start : 0,
          end : value

        };

      }

    });

    buildPaths.call(this);

    return this;

  },

  using : function( config ){

    var self = this;

    if ( is.string( config ) ){

      if ( require('easing').isPreset( config ) ){
          // forward and back
        self._easer = new Easer().using( config );

      } else {

        throw new Error('Invalid easing');

      }

    } else if( is.array( config ) && config.length === 4 ){

      var temp = new Easer();
      self._easer = temp.usingCSS3Curve.apply(temp, config);

    } else if ( is.object( config ) && is.array( config.c1 ) && is.array( config.c2 ) && is.array( config.c3) && is.array( config.c4 ) ){

      self._easer = new Easer().usingCustomCurve(config);

    } else {

      throw new Error('Invalid easing');

    }

    return this;

  },

  duration : function( time ){

    if (time){

      this._duration = parseDuration( time );

    }

    return this;

  },

  useDeltas : function(){

    this._useDelta = true;
    return this;

  },

  // callback helpers
  tick : function( callback ){

    this.callbacks.tick = callback;
    return this;

  },

  begin : function( callback ){

    this.callbacks.begin = callback;
    return this;

  },

  finish : function( callback ){

    this.callbacks.finish = callback;
    return this;

  },

  query : function(){

    return {
      easer : this._easer,
      duration : this._duration,
      tweens : this.tweens,
      array : this._isArray,
      delta : this._useDelta
    };

  },
  // debug method
  valueAtTime : function( time, reverse ){

    var result = {};
    var val = this._easer( time );
    var arr = [];

    if(this.tweens){

      each(this.tweens, function(tween, id){
        result[id] = tween.path.yAtTime( val );
      });

    }

    return result;

  },

  play : (function (){

    var previousResult = false;

    return function playStarter(){

      var self = this;

      self.stopped = false;

      previousResult = self.valueAtTime(0);

      self.handle = tick.add( function( elapsed, stop ){
    
        var percent = Math.min(1, elapsed / self._duration), result, arr = [], i, deltas = {};

        if(!self.stopped){

          result = self.valueAtTime(percent);

          if(self._useDelta){

            for(i in result){
              if(result.hasOwnProperty(i)){
                deltas[i] = result[i] - previousResult[i];
              }
            }
            previousResult = result;
            result = deltas;

          }

          if (this._isArray){
            for(i in result){
              if (result.hasOwnProperty(i)){
                arr.push(result[i]);
              }
            }
            result = arr;
          }

          self.callbacks.tick( result );
        }

        if(percent === 1){

          stop();
          self.callbacks.finish( tick.now() );

        }



      });

      self.callbacks.begin( tick.now() );

      return this;

    };

  })(),

  stop : function(){

    var self = this;

    self.stopped = true;

    if(self.handle){

      self.handle.stop();

    }

    return this;

  }

};

module.exports.Tweening = function( config ){

  return new Tween(config);

};

module.exports.Tween = Tween;

},{"bezier":3,"color-parser":5,"each":2,"easing":6,"is":8,"parse-duration":9,"tick":10}],2:[function(require,module,exports){

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};


},{}],3:[function(require,module,exports){
var search = require('binary-search');

var getLinearPoint = function( t, i ){

  var _t = (1 - t);

  return (_t * this._c1[i]) + (t * this._c2[i]);

};

var getQuadraticPoint = function(t, i){

  var _t = (1 - t);

  return (this._c1[ i ] * (_t * _t)) + (this._c2[i] * ( (2 * _t) * t ) ) + (this._c3[i] * (t * t));

};

var getCubicPoint = function( t, i ){

  var _t = (1 - t);

  return ( this._c1[ i ] * (_t * _t * _t ) ) + ( this._c2[ i ] * ( (3 * _t * _t ) * t ) ) + ( this._c3[ i ] * ( ( 3 * _t ) * ( t * t ) ) ) + this._c4[ i ] * (t * t * t);

};

var BezierCurve = function( config ){

  var self = this;

  if (!config){
    config = {};
  }

  this._c1 = config.c1 || [0,0];
  this._c2 = config.c2 || [0,0];
  this._c3 = config.c3 || [0,0];
  this._c4 = config.c4 || [0,0];

  this.isCubic();

  return this;

};

var checkCoord = function( o ){

  if(typeof o.top !== 'undefined' && typeof o.left !== 'undefined'){

    return [o.left, o.top];

  }else if(typeof o.x !== 'undefined' && typeof o.y !== 'undefined'){

    return [o.x, o.y];

  }else if(typeof o[0] === 'number' && typeof o[1] === 'number'){

    return o;

  }else{

    throw new Error('Input unacceptable');

  }

};

BezierCurve.prototype = {

  c1 : function( coord ){

    this._c1 = checkCoord(coord);

    return this;

  },

  c2 : function( coord ){

    this._c2 = checkCoord(coord);

    return this;

  },

  c3 : function( coord ){

    this._c3 = checkCoord(coord);

    return this;

  },

  c4 : function( coord ){

    this._c4 = checkCoord(coord);

    return this;

  },

  isLinear : function(){

    var self = this;

    this.b = function(t, i){

      return getLinearPoint.call(self, t, i);

    };

    return this;

  },

  isQuadratic : function(){

    var self = this;

    this.b = function(t, i){

      return getQuadraticPoint.call(self, t, i);

    };

    return this;

  },

  isCubic : function(){

    var self = this;

    this.b = function(t, i){

      return getCubicPoint.call(self, t, i);

    };

    return this;

  },

  point : function( n ){

    var self = this;

    return {

      x : self.b(n, 0),
      y : self.b(n, 1)

    };

  },


  pointCss : function( n ){

    var self = this;

    return {

      left : self.b(n, 0),
      top : self.b(n, 1)

    };

  },
  
  pointArray : function( n ){

    return [ this.b(n, 0), this.b(n, 1) ];

  },

  xAtTime : function( n ){

    return this.b(n, 0);

  },

  yAtTime : function( n ){

    return this.b(n, 1);

  },

  buildLookup : function( samples ){

    var x = this._x = [];
    var y = this._y = [];
    var t;
    var size = samples || 10000;

    for(var i = 0; i < size; i++){

      t = i / size;
      x.push(this.xAtTime( t ));
      y.push(this.yAtTime( t ));

    }

    return this;

  },

  findYAtX : function( target ){

    if(target === 1){

      return this.yAtTime(1);

    } else if(target === 0){

      return this.yAtTime(0);

    } else {

      return this._y[ search(this._x, target)[0] ];

    }

  },

  query : function(){

    return {
      c1 : this._c1,
      c2 : this._c2,
      c3 : this._c3,
      c4 : this._c4
    };

  }

};

module.exports.Bezier = BezierCurve;
},{"binary-search":4}],4:[function(require,module,exports){
module.exports = function(arr, target){

  var search = function search( low, high ){

    if( low > high ){

      return [high, false];

    }

    if( arr[low] === target){
      return [low, true];
    } else if (arr[high] === target){
      return [high, true];
    }

    var middle = Math.floor( ( low + high ) / 2 );
    var el = arr[middle];

    if( el > target ){
      return search( low + 1, middle )
    } else if ( el < target ){
      return search( middle, high - 1 );
    }

    return [middle, true];

  }
  
  return search( 0, arr.length-1 );

}
},{}],5:[function(require,module,exports){
/**
 * Module dependencies.
 */
/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Parse `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

function parse(str) {
  return hex3(str)
    || hex6(str)
    || rgb(str)
    || rgba(str);
}

/**
 * Parse rgb(n, n, n)
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function rgb(str) {
  if (0 == str.indexOf('rgb(')) {
    str = str.match(/rgb\(([^)]+)\)/)[1];
    var parts = str.split(/ *, */).map(Number);
    return {
      r: parts[0],
      g: parts[1],
      b: parts[2],
      a: 1
    }
  }
}

/**
 * Parse rgba(n, n, n, n)
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function rgba(str) {
  if (0 == str.indexOf('rgba(')) {
    str = str.match(/rgba\(([^)]+)\)/)[1];
    var parts = str.split(/ *, */).map(Number);
    return {
      r: parts[0],
      g: parts[1],
      b: parts[2],
      a: parts[3]
    }
  }
}

/**
 * Parse #nnnnnn
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function hex6(str) {
  if ('#' == str[0] && 7 == str.length) {
    return {
      r: parseInt(str.slice(1, 3), 16),
      g: parseInt(str.slice(3, 5), 16),
      b: parseInt(str.slice(5, 7), 16),
      a: 1
    }
  }
}

/**
 * Parse #nnn
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function hex3(str) {
  if ('#' == str[0] && 4 == str.length) {
    return {
      r: parseInt(str[1] + str[1], 16),
      g: parseInt(str[2] + str[2], 16),
      b: parseInt(str[3] + str[3], 16),
      a: 1
    }
  }
}


},{}],6:[function(require,module,exports){
require('bindpolyfill');

var Bezier = require('bezier').Bezier;

var presets = {
  'ease' : [0.25,0.1,0.25,1],
  'ease-in' : [0.42,0,1,1],
  'ease-out' : [0,0,0.58,1],
  'ease-in-out' : [0.42,0,0.58,1],
  'linear' : [0,0,1,1],
  'ease-in-out-back' : [0.45,-0.42, 0.595,1.34],
  'ease-out-back' : [0.62,1.255, 0.665,1.095],
  'ease-in-back' : [0.33,-0.305, 0.715,-0.155],
  'ease-out-expo' : [0.015,0.745,0.225,0.985],
  'ease-in-expo' : [0.775,0, 0.975,0.075],
  'ease-in-cubic' :  [0.6,0.02 ,0.95,0.295],
  'ease-out-cubic' : [0.075,0.61, 0.36,0.93]
};

var preComputed = {};

var Ease = function(){

  return this;

};

Ease.prototype = {

  using : function( preset ){

    var p;

    if (preComputed[preset]){

      this.curve = preComputed[preset];

      return this.curve.findYAtX.bind(this.curve);

    } else if (p = presets[preset]){

      preComputed[preset] = new Bezier({
          c1 : [0,0],
          c4 : [1,1],
          c2 : [p[0], p[1]],
          c3 : [p[2], p[3]]
        })
        .buildLookup();

      this.curve = preComputed[preset];

      return this.curve.findYAtX.bind(this.curve);

    } else {

      throw new Error('No such preset!');

    }

  },

  usingCustomCurve : function( curve ){

    this.curve = new Bezier( curve );
    return this.curve.yAtTime.bind(this.curve);

  },

  usingCSS3Curve : function( c2x, c2y, c3x, c3y){

    var id = c2x + '.' + c2y + '.' + c3x + '.' + c3y;

    if (!preComputed[id]){

      preComputed[id] = (
        new Bezier({
          c1 : [0,0],
          c2 : [c2x, c2y],
          c3 : [c3x, c3y],
          c4 : [1,1]
        })
      ).buildLookup();

    }

    this.curve = preComputed[id];

    return this.curve.findYAtX.bind(this.curve);

  },

  usingCustomEaser : function ( easer ){

    this.curve = easer;

    return this.curve;

  }

};

module.exports.generateAllSamples = function(){

  var p;

  for (var i in presets){

    if (presets.hasOwnProperty(i)){

      p = presets[i];

      preComputed[i] = new Bezier({c1 : [0,0], c4 : [1,1], c2 : [p[0], p[1]], c3 : [p[2], p[3]] }).buildLookup();

    }

  }

};

module.exports.Easer = Ease;

module.exports.isPreset = function( val ){

  if (presets[val]){

    return true;

  }

  return false;

};

module.exports.presets = (function(){

  var result = [];

  for(var i in presets){

    if(presets.hasOwnProperty(i)){

      result.push(i);

    }

  }

  return result;

}());

},{"bezier":3,"bindpolyfill":7}],7:[function(require,module,exports){
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      var error = "Function.prototype.bind - not bindable."
      throw new TypeError(error);
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

},{}],8:[function(require,module,exports){
"use strict";
var each = require('foreach'),
    toString = Object.prototype.toString,
    types = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Array'];

each(types, function (type) {
    module.exports[type.toLowerCase()] = function (obj) {
        return toString.call(obj) === '[object ' + type + ']';
    };
});

if (Array.isArray) {
    module.exports.array = Array.isArray;
}

module.exports.object = function (obj) {
    return obj === Object(obj);
};


},{"foreach":2}],9:[function(require,module,exports){
var is = require('gm-is');

var parseTime = function( time ){

	if(is.number(time)){

		return time;

	}else if(is.string(time)){

		var match;

		match = time.match(/([0-9]+)s/);

		if(match && match[1]){

			return parseInt(match[1], 10) * 1000;

		}

		match = time.match(/([0-9]+)ms/);

		if(match && match[1]){

			return parseInt(match[1], 10);

		}

		match = time.match(/([0-9]+)m/);

		if(match && match[1]){

			return parseInt(match[1], 10) * 1000 * 60;

		}

		match = time.match(/([0-9]+)h/);

		if(match && match[1]){

			return parseInt(match[1], 10) * 1000 * 60 * 60;

		}

		match = time.match(/([0-9]+)d/);

		if(match && match[1]){

			return parseInt(match[1], 10) * 1000 * 60 * 60 * 24;

		}

		match = time.match(/([0-9]+)w/);

		if(match && match[1]){

			return parseInt(match[1], 10) * 1000 * 60 * 60 * 24 * 7;

		}

		return 0;

	} else {

		throw new Error("Invalid duration");

	}

};


module.exports = function( duration ){

	return parseTime( duration );

}

},{"gm-is":8}],10:[function(require,module,exports){
var raf = require('raf'),
	time = Date.now || function(){ return (new Date()).getTime(); },
	start = time(),
	now;

// normalise the time functionality
if(window.performance && window.performance.now){

	now = function(){ return performance.now() };
	start = performance.timing.navigationStart;

} else {
	now = function(){ return time() - start; }
}

var callbacks = {};
var uuid = 0;

var runCallbacks = function( timestamp ){

	var self = this;
	for(i in callbacks){
		if(callbacks.hasOwnProperty(i)){
			callbacks[i].update( timestamp );
		}
	}
	return true;
};

var Tick = function(){

	var self = this;

	var tick;

	raf(function( elapsed ){

		if(window.performance && window.performance.now){

			if(elapsed && /\./.test(elapsed.toString())){
				// requestAnimationFrame returns sexy sub-millisecond elapsed time
				tick = function tick( timestamp ){
					runCallbacks.call( self, timestamp );
					raf(tick);
				} 

 			} else {
 				// requestAnimationFrame returns a lame unix timestamp. At least we've got performance.now() though.
 				tick = function tick(){
 					runCallbacks.call( self, performance.now() );
 					raf(tick);
 				}
 			}

		} else {

			tick = function tick(){
				runCallbacks.call( self, now() )
				raf(tick);
			}

		}

		// go go go!
		raf(tick);

	})

	return this;

};

Tick.prototype = {

	add : (function( task ){

		var create = function(callback, start, stop){

			var paused = false;
			var pausedAt;

			return {
				update : function( now ){
					if(!paused){
					callback( now - start, stop);
					}					
				},
				pause : function(){
					paused = true;
					pausedAt = now();
				},
				resume : function(){
					start = start + now() - pausedAt;
					paused = false; 
				},
				stop : stop
			}
				
		};

		return function( callback ){

			var id = ++uuid;
			var stop = function(){
				delete(callbacks[id]);				
			}
			callbacks[id] = create( callback, now(), stop);
			return {
				id : id,
				stop : stop,
				pause : callbacks[id].pause,
				resume : callbacks[id].resume
			}
		}

	})(),

	now : function(){

		return now();

	},

	pause : function(){

		for(i in callbacks){
			if(callbacks.hasOwnProperty(i)){
				callbacks[i].pause();
			}
		}

	},

	resume : function(){
		for(i in callbacks){
			if(callbacks.hasOwnProperty(i)){
				callbacks[i].resume();
			}
		}
	},

	stop : function(){
		for(i in callbacks){
			if(callbacks.hasOwnProperty(i)){
				callbacks[i].stop();
			}
		}
	}

};

var tick = new Tick();

module.exports = tick;
},{"raf":11}],11:[function(require,module,exports){
var now = require('performance-now')
  , global = typeof window === 'undefined' ? {} : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = global['request' + suffix]
  , caf = global['cancel' + suffix] || global['cancelRequest' + suffix]
  , isNative = true

for(var i = 0; i < vendors.length && !raf; i++) {
  raf = global[vendors[i] + 'Request' + suffix]
  caf = global[vendors[i] + 'Cancel' + suffix]
      || global[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  isNative = false

  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  if(!isNative) {
    return raf.call(global, fn)
  }
  return raf.call(global, function() {
    try{
      fn.apply(this, arguments)
    } catch(e) {
      setTimeout(function() { throw e }, 0)
    }
  })
}
module.exports.cancel = function() {
  caf.apply(global, arguments)
}

},{"performance-now":12}],12:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.6.3
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

/*
//@ sourceMappingURL=performance-now.map
*/

}).call(this,require("JkpR2F"))
},{"JkpR2F":13}],13:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}]},{},[1])