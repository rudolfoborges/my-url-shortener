(function(){
	'use strict';

	var express = require('express'),
		path = require('path'),
		logger = require('morgan'),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		fs = require('fs'),
		config = require('./config/config-provider').load(),
		app = express();

	var baseDIR = config.env.dir;
	
	// Configuration
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	app.set('views', path.join(__dirname, baseDIR + '/public'));
	app.set('view engine', 'html');
	app.engine('html', require('ejs').renderFile);

	mongoose.connect(config.mongo.url);

	// Bootstrap models
	fs.readdirSync(path.join(__dirname, baseDIR + '/server/models')).forEach(function (file) {
	  if (~file.indexOf('.js')) require('./' + baseDIR + '/server/models/' + file);
	});

	app.use(express.static(path.join(__dirname, baseDIR + '/public')));

	app.get('/', function(req, res) {
	  response.render('index.html');
	});

	app.use('/api', require('./' + baseDIR + '/server/routes'));

	//app.use('/:hash', function(req, res, next){
		//console.log(req);
	//});

	var port = process.env.PORT || 3000;
	app.listen(port, function() {
	  console.log("Listening on " + port);
	});
})();
