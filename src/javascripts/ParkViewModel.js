var ParksApp = function() {
	var self = this;
	var marker;
	var infowindow = new google.maps.InfoWindow({
		maxWidth: 200
		});

	self.parks = ko.observableArray(data.parks);

	self.parks().forEach(function (park, index, myList) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(park.lat, park.lng),
			map: map,
			animation: google.maps.Animation.DROP
		});
		park.marker = marker;

		google.maps.event.addListener(park.marker, 'click', function() {
			infowindow.open(map, this);
			toggleBounce(park);
			infowindow.setContent(park.contentString);
			});
	});



	self.query = ko.observable('');

	self.filterParks = ko.computed(function () {
		var search  = self.query().toLowerCase();

		return ko.utils.arrayFilter(self.parks(), function (park) {
			var doesMatch = park.name().toLowerCase().indexOf(search) >= 0;

			// park.isVisible(doesMatch);

			return doesMatch;
		});
	});

	function toggleBounce(element) {
		element.marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){ element.marker.setAnimation(null); }, 1450);
	}

	self.showMarker = function() {
		toggleBounce(this);
		infowindow.setContent(this.contentString);
		infowindow.open(map, this.marker);
	};

	self.showAll = function() {
		self.query('');
	};
};

	/*self.addAllParks = function(results) {
		for(var i = 0 ; i < results.businesses.length; i++) {
			var park = results.businesses[i];
			self.parks.push(new Park(
				map,
				park.name,
				park.location.coordinate.latitude,
				park.location.coordinate.longitude,
				park.image_url,
				park.rating_img_url,
				park.url
			));
		}
	};*/

	/*YelpHandler.getData('Warsaw, Poland', 'parks', 'parks', self.addAllParks);*/
