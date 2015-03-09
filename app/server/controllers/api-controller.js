(function(){
	'use strict';

	var mongoose = require('mongoose'),
		Shorten = require('../lib/shorten/shorten'),
		ShortUrl = mongoose.model('ShortUrl');


	exports.find = function(req, res){
		if(req.headers.userid){
			ShortUrl.find({userID: req.headers.userid}).sort({created_at: -1}).exec(function(err, models){
				res.status(200).json(models);
			});
		} else {
			res.status(500).json('UserID is required');
		}
	}

	exports.create = function(req, res){
		var shorten = new Shorten(mongoose);
		shorten.build(req, 5).then(function(model){
			model.save(function(err){
				if(err){
					return res.status(500).json('Cannot save url');
				}
				res.status(200).json(model);
			});
			
		});

	}

})();