var app = (function () {
	'use strict';
	var SEARCHCITY = 'Warsaw',
		SEARCHCOUNTRY = 'Poland',
		SEARCHTERM = 'Parks',
		SEARCHCATEGORY = 'Parks',
		SEARCHLOCATION = {lat: 52.2187648, lng: 21.0354383};

	var mapOptions = {
			center: SEARCHLOCATION,
			zoom: 11,
			minZoom: 4,
			maxZoom: 16,
			scrollwheel: false
		};

	var mapElem = document.getElementById('map');

	var mapLoadError = function() {
		console.log('The google Map is not loading properlly, sorry. Try later.');
	};

	var yelpRequestError = function () {
		console.log('Yelp Reqeust Error!!!');
	};

	var removeExemplaryData = function() {
		data.parks = [];
		for(var i = 0; i < data.markers.length; i++) {
			data.markers[i].setMap(null);
		}
	};
	var addData = function(results) {
		removeExemplaryData();
		for(var i = 0; i < results.businesses.length; i++) {
			var park = results.businesses[i];
			self.parks.push(new Park(
				park.name,
				park.location.coordinate.latitude,
				park.location.coordinate.longitude,
				park.image_url,
				park.rating_img_url,
				park.url
			));
		}
	};

	var init = function () {
		mapLocation.init(mapOptions, mapElem);
		yelp.dataRequest(SEARCHCITY + ', ' + SEARCHCOUNTRY, SEARCHCATEGORY, SEARCHTERM, addData, yelpRequestError);
		ko.applyBindings(appViewModel);
	};

	return {
		init: init,
		mapLoadError: mapLoadError
	};
})();
