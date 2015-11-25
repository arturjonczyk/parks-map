var GreenAreas = (function () {
	/* add members here */
	var lat = 52.2187648;
	var lng = 21.0354383
	var forsquare = '';
		forsquare += 'https://api.foursquare.com/v2/venues/search';
		forsquare += '?client_id=S4MJQVOCIMBUSAOVW2QBVCKRJOXTF4YWKH5RV0MJHBJXHF4Y';
  		forsquare += '&client_secret=TUO4VBINMCXUKAGCTWTAERQSAOWOQLV1WXP52WPH0PUERBTG';
  		forsquare += '&v=20130815';
  		forsquare += '&ll=' + lat + ',' + lng;
  		forsquare += '&query=parks';

  	var Park = function (name) {
  		this.name = name;
  		this.address = address;
  		this.lat = lat;
  		this.lng = lng;
  	}

  	var displayParksOnMap = function (parks) {
  		console.log(parks);
  	};

  	var parks = [];

  	$.ajax(forsquare, {
  		success: function (e) {
  			for (var i = 0; i < e.response.venues.length; i++) {
  				console.log(e.response.venues[i]);
  				parks.push(e.response.venues[i]);
  			}
  		},
  		error: function (request, errorType, errorMessage) {
  			console.log('Error: ' + errorType + ' with message: ' + errorMessage);
  		},
  		timeout: 5000,
  		complete: displayParksOnMap(parks)
  	});

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
	
	var cityWarsaw = {lat: lat, lng: lng};

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
		parks: parks
	};
	/********* END PUBLIC FUNCTIONS **********/

})();