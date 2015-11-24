var GreenAreas = (function () {
	/* add members here */

	var openCloseSidebar = function (self) {
		$(self).toggleClass('open');
		$('.content').toggleClass('is-open');
	};

	/********* HAMBURGER **********/
	var $hamburgerButton = $('#content__hamburger-button');

	$hamburgerButton.on('click', function (event) {
		var self = this;
		openCloseSidebar(self);
	})
	/********* END HAMBURGER **********/

	/********* MAP **********/
	var map;
	var cityWarsaw = {lat: 52.2187648, lng: 21.0354383};

	var initMap = function() {
	    var mapId = document.getElementById('map');
	    var mapOptions = {
	        center: cityWarsaw,
	        zoom: 12,

	        //Limit min/max zoom
	        minZoom: 2,
	        maxZoom: 18,
		};
		map = new google.maps.Map(mapId, mapOptions);
	};

	/********* END MAP **********/

	/********* INITIATION APP COMPONENTS **********/
	var init = function () {
		// initiation view-model
		ko.applyBindings(GreenAreas);
		// initiation the map
		initMap();
	};
	/* execute the init function when the DOM is ready */
	$(init);
	/********* END INITIATION APP COMPONENTS **********/

	/********* PUBLIC FUNCTIONS **********/
	return {
		
	};
	/********* END PUBLIC FUNCTIONS **********/

})();