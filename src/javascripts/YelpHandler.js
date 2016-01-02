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
		YELP_TOKEN: 'OOp7tdrxlv0Iw78yJSRRk_Dt_AdKrLC7',
		YELP_TOKEN_SECRET: 'Ni5Dp9KkQRwD6bQpCRv_LJWV7jk'
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

	function getData(location, category, term, successBack, errorBack) {
		init(location, category, term);
		$.ajax({
			url: yelpBaseURL.search,
			data: parameters,
			cache: true,
			dataType: 'jsonp',
			async: true,
			success: function(data) {
				successBack(data);
			},
			error: function(e) {
				errorBack(e);
			}
		});
	}

	return {
		getData: getData
	};
}();
