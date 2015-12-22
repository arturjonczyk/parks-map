var ParksApp = function() {
	var self = this;
	var map;
	var location = {lat: 52.2187648, lng: 21.0354383};

	var mapOptions = {
		center: location,
		zoom: 10,
		scrollwheel: false
	};

	var mapId = document.getElementById('map');

	var initMap = function() {
		map = new google.maps.Map(mapId, mapOptions);
	};
	initMap();

	self.parks = ko.observableArray([
		new Park(map, 'Park Skaryszewski', 52.2412561496634, 21.0544395446777, 'http://s3-media2.fl.yelpcdn.com/bphoto/wcwR-OnPfSyLYIoRSP7Mqg/ms.jpg', 'http://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png', 'http://www.yelp.com/biz/park-skaryszewski-warszawa?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=CtLhQCQjIEPDX_lI1Hdb6'),
		new Park(map, 'Park Łazienkowski', 52.204319, 21.0331707, 'http://s3-media3.fl.yelpcdn.com/bphoto/8YSLyhYHVTfyhQssOoLKvA/ms.jpg', 'http://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png', 'http://www.yelp.com/biz/park-%C5%82azienkowski-warszawa?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=CtLhQCQjIEPDX_lI1Hdb6A'),
		new Park(map, 'Park Kępa Potocka', 52.28836, 20.979237, 'http://s3-media3.fl.yelpcdn.com/bphoto/jSy4HUdVHiQVpre2eYDXaA/ms.jpg', 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png', 'http://www.yelp.com/biz/park-k%C4%99pa-potocka-warszawa?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=CtLhQCQjIEPDX_lI1Hdb6A'),
		new Park(map, 'Park Szczęśliwicki', 52.2089729, 20.9627495, 'http://s3-media2.fl.yelpcdn.com/bphoto/Q8TArcUG66orgHMxO6sScg/ms.jpg', 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png', 'http://www.yelp.com/biz/park-szcz%C4%99%C5%9Bliwicki-warszawa?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=CtLhQCQjIEPDX_lI1Hdb6'),
		new Park(map, 'Pole Mokotowskie', 52.209014, 20.994205, 'http://s3-media3.fl.yelpcdn.com/bphoto/jnGWdvEzSM5hUdMk5fiQgQ/ms.jpg', 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png', 'http://www.yelp.com/biz/pole-mokotowskie-warszawa?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=CtLhQCQjIEPDX_lI1Hdb6A')
		]);


	self.addAllParks = function(results) {
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
	};

	YelpHandler.getData('Warsaw, Poland', 'parks', 'parks', self.addAllParks);

	self.query = ko.observable('');

	self.filterPins = ko.computed(function () {
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
		toggleBounce(self);
		this.infowindow.open(map, this.marker);
	};

	self.showAll = function() {
		self.query('');
	}

	return {
		parks: self.parks
	};
}();
