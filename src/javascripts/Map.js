var map,
	warsawCityLocation = {lat: 52.2187648, lng: 21.0354383},
	mapOptions = {
		center: warsawCityLocation,
    	zoom: 11,
		minZoom: 4,
    	maxZoom: 16,
    	scrollwheel: false
	},
	mapId = document.getElementById('map');

var initMap = function() {
	map = new google.maps.Map(mapId, mapOptions);
};
