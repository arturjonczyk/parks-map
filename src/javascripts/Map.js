var map;
function init() {
	'use strict';
	var warsawLocation = {lat: 52.2187648, lng: 21.0354383};
	var mapOptions = {
		center: warsawLocation,
		zoom: 11,
		minZoom: 4,
		maxZoom: 16,
		scrollwheel: false
	};

	var mapId = document.getElementById('map');
	map = new google.maps.Map(mapId, mapOptions);
}
init();



// var MapHandler = function() {
// 	var map;
// 	var mapOptions = {
// 		center: '',
// 		zoom: 11,
// 		minZoom: 4,
// 		maxZoom: 16,
// 		scrollwheel: false
// 	};
//
// 	var mapId = document.getElementById('map');
//
// 	var init = function(location) {
// 		mapOptions.center = location;
// 		map = new google.maps.Map(mapId, mapOptions);
// 	};
//
// 	return {
// 		init: init,
// 		map: map
// 	};
// }();
