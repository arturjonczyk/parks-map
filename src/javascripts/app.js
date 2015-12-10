(function() {

	// var Park = function(name, location, image, rating, url, ratingImg) {
	// 	this.name = name;
	// 	this.location = {lat: location.coordinate.latitude, lng: location.coordinate.longitude};
	// 	this.image = image;
	// 	this.rating = rating;
	// 	this.ratingImg = ratingImg;
	// 	this.url = url;
	// 	this.init();
	// };

	// Park.prototype.addMarkerToMap = function() {
	// 	marker = new google.maps.Marker({
	// 		position: this.location,
	// 		map: map
	// 	});
	// };

	// Park.prototype.addListenerToMarker = function() {
	// 	marker.addListener('click', function() {
	// 		infowindow.open(map, marker);
	// 	});
	// };

	// Park.prototype.init = function() {
	// 	this.addMarkerToMap();
	// 	this.addListenerToMarker();
	// };


	



	// *** Hamburger Button - open|close ***
	// helper for event handler
	var openCloseSidebar = function (self) {
		$(self).toggleClass('open');
		$('.content').toggleClass('is-open');
	};

	var $hamburgerButton = $('#content__hamburger-button');
	// evant handler for hamburger button
	// when the click ocure sidebar will open or close
	$hamburgerButton.on('click', function (event) {
		var self = this;
		openCloseSidebar(self);
	})
	// END Hamburger Button - open|close

	var init = function () {
		// initMap();
		var LOCATION = {lat: 52.2187648, lng: 21.0354383};
		MapHandler.init(LOCATION);
		YelpHandler.searchRequest('Warsaw, Poland', 'parks', 'parks');
		// init ViewModel
		ko.applyBindings(ViewModel);
	};
	// start the app
	$(init);
})();

