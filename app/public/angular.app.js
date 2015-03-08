(function(){
	'use strict';

	angular
		.module('myUrlShortener', [])
		.config(function($locationProvider){
			$locationProvider.html5Mode(false).hashPrefix('!');

		});

})();