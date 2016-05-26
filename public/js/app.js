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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function () {
    function Map() {
        var _this = this;

        _classCallCheck(this, Map);

        this.updateInterval = 3000;
        mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kZXJzZ2wiLCJhIjoiY2lqMDE4a2dhMDAzOHYybTUyenZ6ZmlxZiJ9.eCEhAY2tvbxtGSaXR3pkUA';
        this.map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/satellite-streets-v9', //stylesheet location
            center: [10.3644205, 55.306425],
            zoom: 15
        });

        this.dragged = false;

        this.source = new mapboxgl.GeoJSONSource({
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': []
                }
            }
        });

        this.map.on('load', function () {

            _this.map.addSource('route', _this.source);

            _this.map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': 'red',
                    'line-width': 5
                }
            });

            _this.getPostions();
        });

        this.map.on('dragstart', function () {
            _this.dragged = true;
        });
    }

    _createClass(Map, [{
        key: 'getPostions',
        value: function getPostions() {
            var _this2 = this;

            $.getJSON('/map/positions', function (data) {
                if (data) {
                    _this2.parsePositions(data);
                }

                setTimeout(function () {
                    _this2.getPostions();
                }, _this2.updateInterval);
            });
        }
    }, {
        key: 'parsePositions',
        value: function parsePositions(data) {
            this.source.setData({
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': data
                }
            });

            if (!this.dragged) {
                this.map.setCenter(data[data.length - 1]);
            }
        }
    }]);

    return Map;
}();

exports.default = Map;

},{}]},{},[1]);

//# sourceMappingURL=app.js.map
