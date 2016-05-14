(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Map = require('./components/Map');

var _Map2 = _interopRequireDefault(_Map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var map = null;
$(function () {
    if ($('#map').length > 0) {
        map = new _Map2.default();
    }
});

},{"./components/Map":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function Map() {
    _classCallCheck(this, Map);

    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kZXJzZ2wiLCJhIjoiY2lqMDE4a2dhMDAzOHYybTUyenZ6ZmlxZiJ9.eCEhAY2tvbxtGSaXR3pkUA';
    this.map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/satellite-streets-v9', //stylesheet location
        center: [10.4833279, 55.3190627],
        zoom: 10
    });
};

exports.default = Map;

},{}]},{},[1]);

//# sourceMappingURL=app.js.map
