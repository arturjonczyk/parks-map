$(document).ready(function(){
	$('#content__hamburger-button').on('click', function(){
		$(this).toggleClass('open');
		$('.content').toggleClass('is-open');
	});

	var map;
	var city = {lat: 52.2187648, lng: 21.0354383};

	function initMap() {
	    var mapId = document.getElementById('map');
	    var mapOptions = {
	        center: city,
	        zoom: 12,

	        //Limit min/max zoom
	        minZoom: 2,
	        maxZoom: 18,
		};
		map = new google.maps.Map(mapId, mapOptions);
	};

	initMap();
});