var appViewModel = function () {
    var self = this;

    // Open and Close Location List. Change style of the hamburger button.
    self.isOpenLocationsList = ko.observable(false);
    self.toggleLocationsList = function () {
        return self.isOpenLocationsList() ? self.isOpenLocationsList(false) : self.isOpenLocationsList(true);
    };
    self.hamStyle = ko.computed(function () {
        return self.isOpenLocationsList() ? 'open' : '';
    });

    self.parks = ko.observableArray(data.parks);
	var infowindow = new google.maps.InfoWindow({});
	self.parks().forEach(function (park) {
		if (park.marker === '') {
			var contentString = "<div class='infoWindow'>";
				contentString += "<div class='infoWindow__image'>";
			    contentString += "<img src=" + park.image + " alt=" + park.name() + " /></div>";
				contentString += "<div class='infoWindow__content'>";
				contentString += "<h2>" + park.name() + "</h2>";
			    contentString += "<img src=" + park.ratingImg + " alt='' />";
				contentString += "<a href=" + park.url + ">More info...</a></div></div>";
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(park.lat, park.lng),
				map: map,
				animation: google.maps.Animation.DROP
			});
			park.marker = marker;
			data.markers.push(marker);
			park.isVisible = ko.observable(true);
			park.contentString(contentString);

			google.maps.event.addListener(park.marker, 'click', function() {
				infowindow.open(map, this);
				toggleBounce(park);
				infowindow.setContent(park.contentString());
				});
		}

	});


    self.query = ko.observable('');
	self.filterParks = ko.computed(function () {
		var search  = self.query().toLowerCase();
		return ko.utils.arrayFilter(self.parks(), function (park) {
			var doesMatch = park.name().toLowerCase().indexOf(search) >= 0;

			park.marker.setVisible(doesMatch);
			park.isVisible(doesMatch);

			return doesMatch;
		});
	});

    function toggleBounce(element) {
    	element.marker.setAnimation(google.maps.Animation.BOUNCE);
    	setTimeout(function(){ element.marker.setAnimation(null); }, 1450);
    }

    self.showMarker = function() {
    	toggleBounce(this);
    	infowindow.setContent(this.contentString());
    	infowindow.open(map, this.marker);
    };

    self.showAll = function() {
    	self.query('');
    };
};
