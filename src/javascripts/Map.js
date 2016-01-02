// define the global map variable.

/**
 * Function that initialize the map of the app.
 */

var map;
function initMap() {
	'use strict';
	var location = {lat: 52.2187648, lng: 21.0354383};
	var mapOptions = {
		center: location,
		zoom: 11,
		minZoom: 4,
		maxZoom: 16,
		scrollwheel: false
	};
	var init = function	() {
		var mapId = document.getElementById('map');
		map = new google.maps.Map(mapId, mapOptions);
	};
	init();
}
