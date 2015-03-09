var express = require('express');
var router = express.Router();
//var app = express();

//Controllers
var apiController = require('./controllers/api-controller');

/* GET users listing. */
router.route('/shortener').
		get(apiController.find).
		post(apiController.create);

//router.route('/api/:id').
		//get(superheroController.show).
		//put(superheroController.update).
		//delete(superheroController.destroy);


//router.param('id', superheroController.superhero);

module.exports = router;