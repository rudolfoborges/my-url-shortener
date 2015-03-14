(function(){
	'use strict';

	var path = require('path'),
		config = require(path.resolve('config/config-provider')).load();


	exports.find = function(req, res){
		var frontConfig = {
			baseURL: config.app.baseURL
		};

		res.status(200).json(frontConfig);
	}


})();