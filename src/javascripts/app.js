
(function() {
	/**
	 * This method will fired when the hamburger button is cliked
	 * @param  {DOM element} self [Div element (id = content_hamburger-button)]
	 */
	var openCloseSidebar = function (self) {
		console.log(self);
		$(self).toggleClass('open');
		$('.content').toggleClass('is-open');
	};

	var $hamburgerButton = $('#content__hamburger-button');
	// evant handler for hamburger button
	// when the click ocure sidebar will open or close
	$hamburgerButton.on('click', function (event) {
		var self = this;
		openCloseSidebar(self);
	});
	// END Hamburger Button - open|close

	var removeExemplaryData = function() {
		data.parks = [];
		for(var i = 0; i < data.markers.length; i++) {
			data.markers[i].setMap(null);
		}
	};

	var addAllParks = function(results) {
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

	YelpHandler.getData('Warsaw, Poland', 'parks', 'parks', addAllParks);

	var ParksApp = function() {
		var self = this;
		self.parks = ko.observableArray(data.parks);
		var infowindow = new google.maps.InfoWindow({});

		self.parks().forEach(function (park) {
			if (park.marker === '') {
				var contentString = "<div class='infoWindow'>";
					contentString += "<div class='infoWindow__image'>";
				    contentString += "<img src=" + park.image + " alt=" + park.name() + " /></div>";
					contentString += "<div class='infoWindow__content'>";
					contentString += "<h2>" + park.name() + "</h2>";
				    contentString += "<img src=" + park.ratingImg + " alt='' />";
					contentString += "<a href=" + park.url + ">More info...</a></div></div>";
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(park.lat, park.lng),
					map: map,
					animation: google.maps.Animation.DROP
				});
				park.marker = marker;
				data.markers.push(marker);
				park.isVisible = ko.observable(true);
				park.contentString(contentString);

				google.maps.event.addListener(park.marker, 'click', function() {
					infowindow.open(map, this);
					toggleBounce(park);
					infowindow.setContent(park.contentString());
					});
			}

		});

		self.query = ko.observable('');

		self.filterParks = ko.computed(function () {
			var search  = self.query().toLowerCase();
			return ko.utils.arrayFilter(self.parks(), function (park) {
				var doesMatch = park.name().toLowerCase().indexOf(search) >= 0;

				park.marker.setVisible(doesMatch);
				park.isVisible(doesMatch);

				return doesMatch;
			});
		});

		function toggleBounce(element) {
			element.marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function(){ element.marker.setAnimation(null); }, 1450);
		}

		self.showMarker = function() {
			toggleBounce(this);
			infowindow.setContent(this.contentString());
			infowindow.open(map, this.marker);
		};

		self.showAll = function() {
			self.query('');
		};
	};

	var init = function () {
		ko.applyBindings(ParksApp);
	};
	$(init);
})();
