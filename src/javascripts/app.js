/* Basic setup of the app. This will run just once, when the will be initiated.*/
var app = (function() {
    'use strict';

    /* Default search options */
    var SEARCHCITY = 'Warsaw',
        SEARCHCOUNTRY = 'Poland',
        SEARCHTERM = 'Parks',
        SEARCHCATEGORY = 'Parks',
        SEARCHLOCATION = {
            lat: 52.2187648,
            lng: 21.0354383
        };

    /* Default map options, here is the best place to change it */
    var mapOptions = {
        center: SEARCHLOCATION,
        zoom: 11,
        minZoom: 4,
        maxZoom: 16,
        scrollwheel: false
    };
    /* Default map DOM element */
    var mapElem = document.getElementById('map');

    /* Error Message Section. Here we manage the overlay error element. */
    var overlayElement = document.getElementById('overlay');
    var messageElement = overlayElement.querySelector('h1');
    var messageButtong = overlayElement.querySelector('span');

    /* Displaing the error message */
    var displayErrorMessage = function(message) {
        messageElement.innerHTML = message;
        overlayElement.style.transform = 'translate(0px, 0px)';
    };

    /* Closing the error message/overlay */
    messageButtong.addEventListener('click', function() {
        overlayElement.style.transform = 'translate(0px, -1000px)';
        messageElement.innerHTML = 'No message';
    }, false);
    /* END Error Message Section */

    /* Displaying the error message when the google map api is not responding. */
    var mapLoadError = function() {
        var errorMessage = 'The google Map is not loading properlly, sorry. Try later.';
        displayErrorMessage(errorMessage);
    };

    /* Displaying the error message when the yelp api is not responding. */
    var yelpRequestError = function() {
        var errorMessage = 'Yelp Reqeust Error!!!';
        displayErrorMessage(errorMessage);
    };

    /* Removing the exemplary data if we get the data from yelp. */
    var removeExemplaryData = function() {
        data.parks = [];
        for (var i = 0; i < data.markers.length; i++) {
            data.markers[i].setMap(null);
        }
    };

    /* Yelp Success function, push the data from yelp to observable parks array */
    var addData = function(results) {
        removeExemplaryData();
        for (var i = 0; i < results.businesses.length; i++) {
            var park = results.businesses[i];
            self.parks.push(new Park(
                park.name,
                park.location.coordinate.latitude,
                park.location.coordinate.longitude,
                park.image_url,
                park.rating_img_url,
                park.url
            ));
        }
    };
    /* Function that initiating map, calls yelp api, initiating app View Model. */
    var init = function() {
        mapLocation.init(mapOptions, mapElem);
        yelp.dataRequest(SEARCHCITY + ', ' + SEARCHCOUNTRY, SEARCHCATEGORY, SEARCHTERM, addData, yelpRequestError);
        ko.applyBindings(appViewModel);
    };

    /* Functions for the google map api success or error callback. */
    return {
        init: init,
        mapLoadError: mapLoadError
    };
})();
