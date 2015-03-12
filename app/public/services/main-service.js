(function(){
	'use strict';

	angular
		.module('myUrlShortener')
		.service('MainService', ['$resource', MainService]);

	function MainService($resource){
		return $resource('api/shortener/:shortUrlId', {shortUrlId: '@_id'}, {update: {method: 'PUT'}});
	}


})();