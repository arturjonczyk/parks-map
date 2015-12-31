/**
 * Park construction function
 * @param  {string} name      Name of the park
 * @param  {float} lat       Location latitude
 * @param  {float} lng       Location longitude
 * @param  {string} image     Link of the main park image
 * @param  {string} ratingImg Link of the rating image
 * @param  {string} url       Link to the yelp side of the park
 * @return {Object}           this
 */
var Park = function(name, lat, lng, image, ratingImg, url) {
	"use strict";
	var self = this;

	self.marker = '';
	self.name = ko.observable(name);
	self.lat = lat;
	self.lng = lng;
	self.image = image;
	self.ratingImg = ratingImg;
	self.url = url;
	self.contentString = ko.observable('');
};
