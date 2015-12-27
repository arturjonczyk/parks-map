var Park = function(name, lat, lng, image, ratingImg, url) {
	var self = this;

	self.name = ko.observable(name);
	self.lat = lat;
	self.lng = lng;
	self.image = image;
	self.ratingImg = ratingImg;
	self.url = url;
	self.contentString = '<h2>Hello from ' + self.name() + '</h2>';

	/*self.marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		map: map,
		animation: google.maps.Animation.DROP
	});*/


	/*self.infowindow = new google.maps.InfoWindow({
		content: self.contentString
		})


	function toggleBounce() {
		self.marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){ self.marker.setAnimation(null); }, 1450);
	}

	self.marker.addListener('click', function() {
		toggleBounce();
		self.infowindow.open(map, self.marker);
	});

	self.isVisible = ko.observable(false);

	self.isVisible.subscribe(function(currentState) {
		if(currentState) {
			self.marker.setMap(map);
		} else {
			self.marker.setMap(null);
		}
	});
	self.isVisible(true);*/
};

// Park.prototype.addMarkerToMap = function() {
// 	marker = new google.maps.Marker({
// 		position: this.location,
// 		map: map
// 	});
// };

// Park.prototype.addListenerToMarker = function() {
// 	marker.addListener('click', function() {
// 		this.infowindow.open(map, marker);
// 	});
// };

// Park.prototype.init = function() {
// 	this.addMarkerToMap();
// 	this.addListenerToMarker();
// };
