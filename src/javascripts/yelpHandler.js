/**
 * yelp handler module
 * @return {[function]} [dataRequest function which call the yelp api]
 */
var yelp = function() {
    'use strict';
    // Yelp Base URL
    var yelpBaseURL = {
        'search': 'https://api.yelp.com/v2/search/',
        'business': 'https://api.yelp.com/v2/business/'
    };

    // Private Keys
    var privateKeys = {
        YELP_KEY: 'CtLhQCQjIEPDX_lI1Hdb6A',
        YELP_KEY_SECRET: 'Y_W4_bV_nD8mDbIzu7Hby97cCU8',
        YELP_TOKEN: 'OOp7tdrxlv0Iw78yJSRRk_Dt_AdKrLC7',
        YELP_TOKEN_SECRET: 'Ni5Dp9KkQRwD6bQpCRv_LJWV7jk'
    };

    // Parameters
    var parameters = {
        oauth_consumer_key: privateKeys.YELP_KEY,
        oauth_token: privateKeys.YELP_TOKEN,
        oauth_nonce: null,
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_version: '1.0',
        // This is crucial to include for jsonp implementation in
        // AJAX or else the oauth-signature will be wrong.
        callback: 'cb',
        category_filter: '',
        term: '',
        location: ''
    };

    // Function that generate string of random characters
    var nonce_generate = function() {
        return (Math.floor(Math.random() * 1e12).toString());
    };

    /**
     * Init function that, at the moment of calling data Request Function
     * is updating parameters properties and is generating unique
     * authorization signature required for yelp data request.
     * @param  {[string]} location [city and coutry name]
     * @param  {[string]} category [search category name]
     * @param  {[string]} term     [search term name]
     */
    var init = function(location, category, term) {
        parameters.location = location;
        parameters.category = category;
        parameters.term = term;
        parameters.oauth_nonce = nonce_generate();

        var encodedSignature = oauthSignature.generate('GET', yelpBaseURL.search, parameters, privateKeys.YELP_KEY_SECRET, privateKeys.YELP_TOKEN_SECRET);
        parameters.oauth_signature = encodedSignature;
    };

    /**
     * Function that return data request from yelp API.
     * Is called by app.init(), just once
     * @param  {[string]} location    [city and coutry name]
     * @param  {[string]} category    [search category name]
     * @param  {[string]} term        [search term name]
     * @param  {[function]} successBack [callback fun. if success]
     * @param  {[function]} errorBack   [callback fun. if error]
     * @return {[object]}             [returning object data within success fun.]
     */
    var dataRequest = function(location, category, term, successBack, errorBack) {
        init(location, category, term);
        $.ajax({
            url: yelpBaseURL.search,
            data: parameters,
            cache: true,
            dataType: 'jsonp',
            async: true
        })
        .done(function (data) {
            successBack(data);
        })
        .fail(function (e) {
            errorBack(e);
        });
    };

    return {
        dataRequest: dataRequest
    };
}();
