(function(){
	'use strict';

	var express = require('express'),
	path = require('path'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

	//var routes = require('./server/routes');

	var app = express();

	// Configuration

	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	app.set('views', path.join(__dirname, 'app/public'));
	app.set('view engine', 'html');
	app.engine('html', require('ejs').renderFile);

	app.use(express.static(path.join(__dirname, 'app/public')));

	//app.use('/api', routes);


	app.get('/', function(request, response) {
	  response.render('index.html');
	});

	var port = process.env.PORT || 3000;
	app.listen(port, function() {
	  console.log("Listening on " + port);
	});
})();
