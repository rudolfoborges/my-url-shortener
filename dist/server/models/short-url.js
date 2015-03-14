(function(){
	'use strict';

	var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

	var ShortUrlSchema = new Schema({
		hash: {
			type: String,
			unique: true,
			required: true
		},
		url: {
			type: String,
			required: true
		},
		userID: {
			type: Number,
			required: false
		},
		created_at: {
			type: Date,
			default: Date.now
		}
	});


	mongoose.model('ShortUrl', ShortUrlSchema);

})();
