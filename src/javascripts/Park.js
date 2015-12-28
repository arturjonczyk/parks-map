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
};
