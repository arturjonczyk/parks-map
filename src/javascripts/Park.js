// function Park(name, location, image, rating, url) {
// 	this.name = name;
// 	this.location = location;
// 	this.image = image;
// 	this.rating = rating;
// 	this.url = url;
// }

// var ParksViewModel = function() {
// 	var self = this;

// 	self.parks = ko.observableArray();

// 	self.addPark = function(name, location, image, rating, url) {
// 		self.parks.push(new Park(name, location, image, rating, url));
// 	};

// 	self.addParksToList = function(results) {
// 		for(var i = 0; i < results.business.lenght; i++) {
// 			var park = results.businesses[i],
// 				parkName = park.name,
// 				parkLocation = park.location,
// 				parkImage = park.image,
// 				parkRating = park.rating,
// 				parkURL = park.url;

// 			self.addPark(parkName, parkLocation, parkImage, parkRating, parkURL);
// 		}
// 	};

//   return {
// 	addParks: self.addParks
//   };
// };
// -------------------------------------------------------------------------------------------
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

  // Yelp.searchRequest('Warsaw, Poland', 'parks', 'parks');


  // public methods
	return {
		displayParksOnMap: displayParksOnMap,
	addParks: addParks
	};

})();