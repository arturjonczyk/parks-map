(function() {
	// *** Hamburger Button - open|close ***
	// helper for event handler
	var openCloseSidebar = function (self) {
		$(self).toggleClass('open');
		$('.content').toggleClass('is-open');
	};

	var $hamburgerButton = $('#content__hamburger-button');
	// evant handler for hamburger button
	// when the click ocure sidebar will open or close
	$hamburgerButton.on('click', function (event) {
		var self = this;
		openCloseSidebar(self);
	})
	// END Hamburger Button - open|close

	var init = function () {
		/*var location = {lat: 52.2187648, lng: 21.0354383};*/
		/*MapHandler.init(location);*/
		ko.applyBindings(ParksApp);
	};
	$(init);
})();
