(function(){
	'use strict';

	var mongoose = require('mongoose'),
		Shorten = require('../lib/shorten/shorten'),
		ShortUrl = mongoose.model('ShortUrl');


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