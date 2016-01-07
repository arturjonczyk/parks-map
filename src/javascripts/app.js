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

	var overlayElement = document.getElementById('overlay');
	var messageElement = overlayElement.querySelector('h1');
	var messageButtong = overlayElement.querySelector('span');

	var displayErrorMessage = function(message) {
		messageElement.innerHTML = message;
		overlayElement.style.transform = 'translate(0px, 0px)';
	};
	messageButtong.addEventListener('click', function() {
		overlayElement.style.transform = 'translate(0px, -1000px)';
		messageElement.innerHTML = 'No message';
	}, false);

	var mapLoadError = function() {
		var errorMessage = 'The google Map is not loading properlly, sorry. Try later.';
		displayErrorMessage(errorMessage);
	};

	var yelpRequestError = function () {
		var errorMessage = 'Yelp Reqeust Error!!!';
		displayErrorMessage(errorMessage);
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
