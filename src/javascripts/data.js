/**
 * Data for Park app
 * @type {Object} parks (array of Park constructors)
 * @param  {string} name      Name of the park
 * @param  {float} lat       Location latitude
 * @param  {float} lng       Location longitude
 * @param  {string} image     Link of the main park image
 * @param  {string} ratingImg Link of the rating image
 * @param  {string} url       Link to the yelp side of the park
 * markers (array of markers that will be added)
 */
var data = {
    parks: [
        new Park('Park Skaryszewski', 52.2412561496634, 21.0544395446777, 'http://s3-media2.fl.yelpcdn.com/bphoto/wcwR-OnPfSyLYIoRSP7Mqg/ms.jpg', 'http://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png', 'http://www.yelp.com/biz/park-skaryszewski-warszawa?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=CtLhQCQjIEPDX_lI1Hdb6'),
        new Park('Park Łazienkowski', 52.204319, 21.0331707, 'http://s3-media3.fl.yelpcdn.com/bphoto/8YSLyhYHVTfyhQssOoLKvA/ms.jpg', 'http://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png', 'http://www.yelp.com/biz/park-%C5%82azienkowski-warszawa?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=CtLhQCQjIEPDX_lI1Hdb6A'),
        new Park('Park Kępa Potocka', 52.28836, 20.979237, 'http://s3-media3.fl.yelpcdn.com/bphoto/jSy4HUdVHiQVpre2eYDXaA/ms.jpg', 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png', 'http://www.yelp.com/biz/park-k%C4%99pa-potocka-warszawa?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=CtLhQCQjIEPDX_lI1Hdb6A'),
        new Park('Park Szczęśliwicki', 52.2089729, 20.9627495, 'http://s3-media2.fl.yelpcdn.com/bphoto/Q8TArcUG66orgHMxO6sScg/ms.jpg', 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png', 'http://www.yelp.com/biz/park-szcz%C4%99%C5%9Bliwicki-warszawa?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=CtLhQCQjIEPDX_lI1Hdb6'),
        new Park('Pole Mokotowskie', 52.209014, 20.994205, 'http://s3-media3.fl.yelpcdn.com/bphoto/jnGWdvEzSM5hUdMk5fiQgQ/ms.jpg', 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png', 'http://www.yelp.com/biz/pole-mokotowskie-warszawa?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=CtLhQCQjIEPDX_lI1Hdb6A')
    ],
    markers: []
};
