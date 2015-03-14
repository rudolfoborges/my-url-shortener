(function(){
	'use strict';

	var mongoose = require('mongoose'),
		Shorten = require('../lib/shorten/shorten'),
		ShortUrl = mongoose.model('ShortUrl');

	exports.shortUrl = function(req, res, next, id) {
	  ShortUrl.findOne({_id: id}, function(err, shortUrl) {
	    if (err) return next(err);
	    if (!shortUrl) return next(new Error('Failed to load shortUrl ' + id));
	    req.shortUrl = shortUrl;
	    next();
	  });
	};


	exports.find = function(req, res){
		var user = req.session.passport.user;
		if(user){
			ShortUrl.find({userID: user.id}).sort({created_at: -1}).exec(function(err, models){
				res.status(200).json(models);
			});
		} else {
			res.status(500).json({error: 'UserID is required'});
		}
	}

	exports.create = function(req, res){
		var shorten = new Shorten(mongoose);
		shorten.build(req, 5).then(function(model){
			model.save(function(err){
				if(err){
					return res.status(500).json({error: 'Cannot save url'});
				}
				res.status(200).json(model);
			});
			
		});
	}

	exports.destroy = function(req, res){
		var shortUrl = req.shortUrl;
		shortUrl.remove(function(err){
			if(err) return res.status(500).json({error: 'Cannot delete the shortUrl'});
			res.status(200).json(shortUrl);
		});
	}

})();