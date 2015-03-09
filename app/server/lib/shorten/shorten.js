(function(){
	'use strict';
	 
	 var Promise = require('promise');

	 module.exports = function(mongoose){
		var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

		this.build = function(req, hashLength){
			return new Promise(function(resolve, reject){
				var ShortUrl = mongoose.model('ShortUrl'),
					hash = '';

				for (var i=0; i < hashLength; i++){
					var randomAlphabet = Math.floor(Math.random() * (alphabet.length + 1));
					hash += alphabet.charAt(randomAlphabet);
				}

				if(hash.length === hashLength){
					var shortUrl = new ShortUrl({hash: hash, url: req.body.url, userID: req.headers.userid || null});
					resolve(shortUrl);
				} else {
					reject(500);
				}
			});
		};

	};

})();