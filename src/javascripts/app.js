// Warsaw, Poland
var LOCATION = {lat: 52.2187648, lng: 21.0354383};

var vm = function() {
	var self = this;

	self.isOpen = ko.observable(false);
	self.toggleOpen = function(){
		self.isOpen(!self.isOpen());
	};
};

var init = function () {
	ko.applyBindings(vm);
	initMap();
};
$(init);
