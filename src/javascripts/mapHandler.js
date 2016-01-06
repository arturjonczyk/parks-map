var mapLocation = (function (global) {
	'use strict';
	var	location = {lat: 52.2187648, lng: 21.0354383},
		mapOptions = {
			center: location,
			zoom: 8
		},
		mapElem = document.getElementById('map');

	var loadMap = function (elem, options) {
		global.map = new google.maps.Map(elem, options);
	};

	var init = function (options, mElem) {
		$.extend(mapOptions, options);
		mapElem = mElem;
		loadMap(mapElem, mapOptions);
	};

	return {
		init: init,
		map: global.map
	};
})(window);
