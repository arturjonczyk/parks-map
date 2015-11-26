var GreenAreas = (function () {
	/* add members here */
	var lat = 52.2187648;
	var lng = 21.0354383

  	var parks = [];
  	var markers = [];

  	function addMarker(park) {
  		var parkName = park.name,
  			parkLocation = {lat: park.location.coordinate.lat, lng: park.location.coordinate.lng},
  			parkImage = park.image_url,
  			parkRanking = park.rating,
  			parkUrl = park.urls;

  		var infoContent = '<div>';
  			infoContent += '<h2>' + parkName + '</h2>';
  			infoContent += '<img src="' + parkImage + '" alt="' + parkName + '"></img>';
  			infoContent += '</div>';

  		var infowindow = new google.maps.InfoWindow({
    		content: infoContent
  		});

  		var marker = new google.maps.Marker({
    		position: parkLocation,
    		map: map
  		});
  		marker.addListener('click', function() {
    		infowindow.open(map, marker);
  		});
  		markers.push(marker);
	}

  	var displayParksOnMap = function (parks) {
  		for(var i = 0; i < parks.length; i++) {
  			var myLatLng = {lat: parks[i].location.coordinate.lat, lng: parks[i].location.coordinate.lng};
  			var parkName = parks[i].name;
  			addMarker(parks[i]);
  		}
  	};

  	var addParks = function (results) {
  		for(var i = 0; i < results.businesses.length; i++) {
  			var park = results.businesses[i];
  			parks.push({
  				name: park.name,
  				image_url: park.image_url,
  				rating: {
  					score: park.rating,
  					score_img: park.rating_img_url
  				},
  				urls: {
  					desktop: park.url,
  					mobile: park.mobile_url
  				},
  				location: {
  					city: park.location.city,
  					coordinate: {
  						lat: park.location.coordinate.latitude,
  						lng: park.location.coordinate.longitude,
  					},
  					display_address: park.location.display_address
  				}

  			});
  		};
  		displayParksOnMap(parks);
  	};

  	function nonce_generate() {
    	return (Math.floor(Math.random() * 1e12).toString());
	}

	var YELP_URL = 'https://api.yelp.com/v2/search/',
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
	    // This is crucial to include for jsonp implementation in
	    // AJAX or else the oauth-signature will be wrong.
	    callback: 'cb',
	    category_filter: 'parks',
	    term: "parks",
	    location: 'Warsaw, Poland',
	};

	var encodedSignature = oauthSignature.generate('GET', YELP_URL, parameters, YELP_KEY_SECRET, YELP_TOKEN_SECRET);
	parameters.oauth_signature = encodedSignature;

	var settings = {
	    url: YELP_URL,
	    data: parameters,
	    // This is crucial to include as well to prevent jQuery from adding
	    // on a cache-buster parameter "_=23489489749837", invalidating our oauth-signature
	    cache: true,
	    dataType: 'jsonp',
	    success: function(results) {
	    	addParks(results);
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
	        zoom: 11,

	        //Limit min/max zoom
	        minZoom: 4,
	        maxZoom: 16,
	        scrollwheel: false
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