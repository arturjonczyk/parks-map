var Map = function() {

	var mapOptions = {
		center: '',
		zoom: 11,
		minZoom: 4,
		maxZoom: 16,
		scrollwheel: false
	};

	var mapId = document.getElementById('map');

	var init = function(location) {
		mapOptions.center = location;
		map = new google.maps.Map(mapId, mapOptions);
	};

	return {
		init: init
	};
}();