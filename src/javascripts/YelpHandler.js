var YelpHandler = function() {

	// Yelp Base URL
	var yelpBaseURL = {
		'search': 'https://api.yelp.com/v2/search/',
		'business': 'https://api.yelp.com/v2/business/'
	};

	// Private Keys
	var privateKeys = {
		YELP_KEY: 'CtLhQCQjIEPDX_lI1Hdb6A',
		YELP_KEY_SECRET: 'Y_W4_bV_nD8mDbIzu7Hby97cCU8',
		YELP_TOKEN: 'dMX4bX9dH57c_KhzGRIPgIvirOoMgVfe',
		YELP_TOKEN_SECRET: 'ShPZvZAHUjrTYJN_cjFK0CH5UT0'
	};

	var parameters = {
		oauth_consumer_key: privateKeys.YELP_KEY,
		oauth_token: privateKeys.YELP_TOKEN,
		oauth_nonce: nonce_generate(),
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

	var settings = {
		url: yelpBaseURL.search,
		data: parameters,
		// This is crucial to include as well to prevent jQuery from adding
		// on a cache-buster parameter "_=23489489749837", invalidating our oauth-signature
		cache: true,
		dataType: 'jsonp',
		success: function(results) {
			addResults(results);

		},
		error: function() {
			console.log('Not Working...');
		}
	};

	function nonce_generate() {
		return (Math.floor(Math.random() * 1e12).toString());
	}

	var init = function(location, category, term) {
		parameters.location = location;
		parameters.category = category;
		parameters.term = term;

		var encodedSignature = oauthSignature.generate('GET', yelpBaseURL.search, parameters, privateKeys.YELP_KEY_SECRET, privateKeys.YELP_TOKEN_SECRET);
		parameters.oauth_signature = encodedSignature;
	};

	function searchRequest(location, category, term) {
		init(location, category, term);
		$.ajax(settings);
	}

	return {
		searchRequest: searchRequest
	};
}();