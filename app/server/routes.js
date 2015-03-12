var express = require('express');
var router = express.Router();

//Controllers
var apiController = require('./controllers/api-controller');

/* GET users listing. */
router.route('/shortener').
		get(apiController.find).
		post(apiController.create);

router.route('/shortener/:shortUrlId').
		delete(apiController.destroy);


router.param('shortUrlId', apiController.shortUrl);

module.exports = router;