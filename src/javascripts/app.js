var GreenAreas = (function () {
	/* add members here */
	var lat = 52.2187648;
	var lng = 21.0354383

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

  	var displayParksOnMap = function (parks) {
  		for(var i = 0; i < parks.length; i++) {
  			// console.log(parks[i]);
  			var myLatLng = {lat: parks[i].location.coordinate.latitude, lng: parks[i].location.coordinate.longitude};
  			var parkName = parks[i].name;
  			addMarker(myLatLng, parkName);
  		}
  	};

  	function nonce_generate() {
    	return (Math.floor(Math.random() * 1e12).toString());
	}

	var YELP_URL = 'https://api.yelp.com/v2/search',
	    YELP_KEY = "CtLhQCQjIEPDX_lI1Hdb6A",
	    YELP_KEY_SECRET = "Y_W4_bV_nD8mDbIzu7Hby97cCU8",
	    YELP_TOKEN = "dMX4bX9dH57c_KhzGRIPgIvirOoMgVfe",
	    YELP_TOKEN_SECRET = "ShPZvZAHUjrTYJN_cjFK0CH5UT0";

	var parameters = {
	    oauth_consumer_key: YELP_KEY,
	    oauth_token: YELP_TOKEN,
	    oauth_nonce: nonce_generate(),
	    oauth_timestamp: Math.floor(Date.now() / 1000),
	    oauth_signature_method: 'HMAC-SHA1',
	    oauth_version: '1.0',
	    callback: 'cb', // This is crucial to include for jsonp implementation in AJAX or else the oauth-signature will be wrong.
	    term: "park",
	    location: 'Warsaw, Poland'
	};

	var encodedSignature = oauthSignature.generate('GET', YELP_URL, parameters, YELP_KEY_SECRET, YELP_TOKEN_SECRET);
	parameters.oauth_signature = encodedSignature;

	var settings = {
	    url: YELP_URL,
	    data: parameters,
	    cache: true, // This is crucial to include as well to prevent jQuery from adding on a cache-buster parameter "_=23489489749837", invalidating our oauth-signature
	    dataType: 'jsonp',
	    success: function(results) {
	        displayParksOnMap(results.businesses);
	    },
	    error: function() {
	        console.log('Not Working...');
	    }
	};

	// Send AJAX query via jQuery library.
	$.ajax(settings);

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