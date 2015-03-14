(function(){
	'use strict';

	var mongoose = require('mongoose'),
		ShortUrl = mongoose.model('ShortUrl');

	exports.sendRedirect = function(req, res, next){
		var hash = req.params.hash;
		ShortUrl.findOne({hash: hash}, function(err, shortUrl) {
		    if (err) return next(err);
		    if (!shortUrl) return res.status(404).json({error: 'Failed to load url: ' + hash});
		    res.redirect(shortUrl.url);
		});
	}

})();