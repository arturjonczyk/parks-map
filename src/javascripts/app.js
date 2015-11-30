(function() {
	// Warsaw, Poland
	var LOCATION = {lat: 52.2187648, lng: 21.0354383};

	var Park = function(name, location, image, rating, url, ratingImg) {
		this.name = name;
		this.location = {lat: location.coordinate.latitude, lng: location.coordinate.longitude};
		this.image = image;
		this.rating = rating;
		this.ratingImg = ratingImg;
		this.url = url;
		this.init();
	};

	Park.prototype.addMarkerToMap = function() {
		marker = new google.maps.Marker({
			position: this.location,
			map: map
		});
	};

	Park.prototype.addListenerToMarker = function() {
		marker.addListener('click', function() {
			infowindow.open(map, marker);
		});
	};

	Park.prototype.init = function() {
		this.addMarkerToMap();
		this.addListenerToMarker();
	};


	var vm = function() {
		var self = this;

		self.parks = ko.observableArray();

		self.addPark = function(name, location, image, rating, url, ratingImg) {
			self.parks.push(new Park(name, location, image, rating, url, ratingImg));
		};

		self.addResults = function(results) {
			console.log(results.businesses[5]);
			for(var i = 0; i < results.businesses.length; i++) {
				var park = results.businesses[i],
					parkName = park.name,
					parkLocation = park.location,
					parkImage = park.image_url,
					parkRating = park.rating,
					parkRatingImage = park.rating_img_url_small,
					parkURL = park.url;
				self.addPark(parkName, parkLocation, parkImage, parkRating, parkURL, parkRatingImage);
			}
		};

		self.isOpen = ko.observable(true);
		self.toggleOpen = function(){
			self.isOpen(!self.isOpen());
		};

		return {
			addResults: self.addResults
		};
	};

	var init = function () {
		// initMap();
		Map.init(LOCATION);
		Yelp.searchRequest('Warsaw, Poland', 'parks', 'parks');
		// init ViewModel
		ko.applyBindings(vm);
	};
	// start the app
	$(init);
})();

