// function Park(name, location, image, rating, urls) {
// 	this.name = name;
// 	this.location = location;
// 	this.image = image;
// 	this.rating = rating;
// 	this.urls = urls;
// }

// function ParksViewModel() {
// 	var self = this;

// 	self.parks = ko.observableArray();


// }

var GreenAreas = (function () {

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
  		// markers.push(marker);
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

    Yelp.searchRequest('Warsaw, Poland', 'parks', 'parks');


	/********* PUBLIC FUNCTIONS **********/
	return {
		parks: parks,
		displayParksOnMap: displayParksOnMap,
    addParks: addParks
		// markers: markers
	};
	/********* END PUBLIC FUNCTIONS **********/

})();