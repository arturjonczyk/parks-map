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
  		forsquare += '&query=park';

  	var Park = function (name) {
  		this.name = name;
  		this.address = address;
  		this.lat = lat;
  		this.lng = lng;
  	}
  	var parks = [];
  	var markers = [];

  	function addMarker(location, parkName) {
  		var infowindow = new google.maps.InfoWindow({
    		content: '<div><h3>' + parkName + '</h3><p>' + location.lat + ' | ' + location.lng + '</p></div>'
  		});

  		var marker = new google.maps.Marker({
    		position: location,
    		map: map
  		});
  		marker.addListener('click', function() {
    		infowindow.open(map, marker);
  		});
  		markers.push(marker);
	}

  	var displayParksOnMap = function () {
  		for(var i = 0; i < parks.length; i++) {
  			var myLatLng = {lat: parks[i].location.lat, lng: parks[i].location.lng};
  			var parkName = parks[i].name;
  			addMarker(myLatLng, parkName);
  		}
  	};

  	$.ajax(forsquare, {
  		success: function (e) {
  			console.log(e);
  			for (var i = 0; i < e.response.venues.length; i++) {
  				var elem = e.response.venues[i];
  				parks.push({
  					name: elem.name,
  					location: elem.location
  				});
  				// console.log(elem.name);
  				// console.log(elem.location.lat, " ", elem.location.lng);
  			}
  		},
  		error: function (request, errorType, errorMessage) {
  			console.log('Error: ' + errorType + ' with message: ' + errorMessage);
  		},
  		complete: displayParksOnMap
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
		parks: parks,
		displayParksOnMap: displayParksOnMap,
		markers: markers
	};
	/********* END PUBLIC FUNCTIONS **********/

})();