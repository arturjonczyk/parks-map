var Park = function(map, name, lat, lng, image, ratingImg, url) {
	"use strict";
	var self = this;

	self.name = ko.observable(name);
	self.lat = lat;
	self.lng = lng;
	self.image = image;
	self.ratingImg = ratingImg;
	self.url = url;
	self.contentString = ko.observable('');


	// self.map = map;
	// self.marker = new google.maps.Marker({
	//     position: {lat: lat, lng: lng},
	//     map: map,
	//     title: 'Hello World!'
	//   });
	//
	// self.infowindow = new google.maps.InfoWindow({
    // 	content: self.contentString
 //  	});
	//
	// self.isVisible = ko.observable(false);
	//
	// self.isVisible.subscribe(function(currentState) {
	// 	if(currentState) {
	// 		self.marker.setMap(map);
	// 	} else {
	// 		self.marker.setMap(null);
	// 	}
	// });
	// self.isVisible(true);
	//
	// self.test = function() {
	// 	self.marker.addListener('click', function() {
    // 		self.infowindow.open(self.map, self.marker);
 //  		});
	// };
	// self.test();
};

// / Park.prototype.addMarkerToMap = function() {
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
