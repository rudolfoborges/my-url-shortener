var express = require('express');
var router = express.Router();


(function(){
	var controller = require('./controllers/shortener-controller');

	router.route('/shortener').
			get(controller.find).
			post(controller.create);

	router.route('/shortener/:shortUrlId').
			delete(controller.destroy);


	router.param('shortUrlId', controller.shortUrl);
})();


(function(){
	var controller = require('./controllers/config-controller');

	router.route('/config').get(controller.find);

})();


module.exports = router;