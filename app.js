(function(){
	'use strict';

	var express = require('express'),
		path = require('path'),
		logger = require('morgan'),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		fs = require('fs'),
		cookieParser = require("cookie-parser"),
		session = require('express-session'),
		passport = require('passport'),
  		FacebookStrategy = require('passport-facebook').Strategy,
		config = require('./config/config-provider').load(),
		app = express();

	var baseDIR = config.env.dir;
	
	// Configuration
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());

	app.use(session({ secret: 'urlshortener', resave: true, saveUninitialized: true}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.set('views', path.join(__dirname, baseDIR + '/public'));
	app.set('view engine', 'ejs');
	app.engine('html', require('ejs').renderFile);

	mongoose.connect(config.mongo.url);

	// Bootstrap models
	fs.readdirSync(path.join(__dirname, baseDIR + '/server/models')).forEach(function (file) {
	  if (~file.indexOf('.js')) require('./' + baseDIR + '/server/models/' + file);
	});

	app.use(express.static(path.join(__dirname, baseDIR + '/public')));

	console.log(config.app.baseURL + "/auth/facebook/callback");

	passport.use(new FacebookStrategy({
	    clientID: 784472188274113,
	    clientSecret: '1b7cc4a6c693a89fd6002da715514a7c',
	    callbackURL: config.app.baseURL + "/auth/facebook/callback"
	  },
	  function(accessToken, refreshToken, profile, done) {
	   	process.nextTick(function () {
	      return done(null, profile);
	    });
	  }
	));

	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(user, done) {
	  done(null, user);
	});
	

	app.get('/', function(req, res) {
	  res.render('index', {user: getUser(req)});
	});

	app.get('/auth/facebook', passport.authenticate('facebook', {display: 'popup', authType: 'reauthenticate'}));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/'}), function(req, res){
		res.send('<script>window.opener.parent.location.href="/"; window.close();</script>');
	});

	app.use('/api', require('./' + baseDIR + '/server/routes'));

	//app.use('/:hash', function(req, res, next){
		//console.log(req);
	//});

	var port = process.env.PORT || 3000;
	app.listen(port, function() {
	  console.log("Listening on " + port);
	});

	function getUser(req){
		return req.session.passport.user || {id: '', displayName: ''};
	}

})();
