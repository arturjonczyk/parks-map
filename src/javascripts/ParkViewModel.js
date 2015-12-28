var ParksApp = function() {
	var self = this;
	self.parks = ko.observableArray(data.parks);
	self.query = ko.observable('');

	self.filterParks = ko.computed(function () {
		var search  = self.query().toLowerCase();

		return ko.utils.arrayFilter(self.parks(), function (park) {
			var doesMatch = park.name().toLowerCase().indexOf(search) >= 0;

			park.isVisible(doesMatch);

			return doesMatch;
		});
	});

	function toggleBounce(self) {
		self.marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){ self.marker.setAnimation(null); }, 1450);
	}



	self.showMarker = function() {
		var self = this;
		console.log(self);
		toggleBounce(self);
		self.infowindow.open(map, self.marker);
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
