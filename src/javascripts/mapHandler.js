// Map handler module
var mapLocation = (function(global) {
    'use strict';
    // Sample location, mapOption parameters and map dom element.
    // All of this settings we change in app.js.
    var location = {
            lat: 52.2187648,
            lng: 21.0354383
        },
        mapOptions = {
            center: location,
            zoom: 8
        },
        mapElem = document.getElementById('map');

    // Rendering the main map.
    var loadMap = function(elem, options) {
        global.map = new google.maps.Map(elem, options);
    };
    /**
     * Initciation function:
     * 1. updating the map options
     * 2. updating map dom element
     * 3. initiation of the map render function
     * @param  {[object]} options [map options]
     * @param  {[dom node]} mElem   [dom map element]
     */
    var init = function(options, mElem) {
        $.extend(mapOptions, options);
        mapElem = mElem;
        loadMap(mapElem, mapOptions);
    };

    return {
        init: init,
        map: global.map
    };
})(window);
