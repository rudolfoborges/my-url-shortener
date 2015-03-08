(function(){
	'use strict';

	var express = require('express'),
		path = require('path'),
		logger = require('morgan'),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		fs = require('fs'),
		app = express();

	
	// Configuration
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	app.set('views', path.join(__dirname, 'app/public'));
	app.set('view engine', 'html');
	app.engine('html', require('ejs').renderFile);

	mongoose.connect('mongodb://localhost:27017/urlshortener');

	// Bootstrap models
	fs.readdirSync(path.join(__dirname, '/app/server/models')).forEach(function (file) {
	  if (~file.indexOf('.js')) require('./app/server/models/' + file);
	});


	app.use(express.static(path.join(__dirname, 'app/public')));

	app.use('/api', require('./app/server/routes'));

	app.get('/', function(request, response) {
	  response.render('index.html');
	});

	var port = process.env.PORT || 3000;
	app.listen(port, function() {
	  console.log("Listening on " + port);
	});
})();
