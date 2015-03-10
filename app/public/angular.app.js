(function(){
	'use strict';

	angular
		.module('myUrlShortener', ['ngFacebook'])

		.config(function($locationProvider, $httpProvider, $provide, $facebookProvider){
			$locationProvider.html5Mode(false).hashPrefix('!');
			$facebookProvider.setAppId('784472188274113');

			$provide.factory('httpApiInterceptor', function ($facebook) {
				return {
					request: function(config){
						if(config.url.indexOf('api') === 0){
				  			config.headers['userID'] = '439929836160976';
						}
						return config;
					}
				}
			});

			$httpProvider.interceptors.push('httpApiInterceptor');

		})

		.run(function(){
			(function(){
			     if (document.getElementById('facebook-jssdk')) {return;}
			     var firstScriptElement = document.getElementsByTagName('script')[0];
			     var facebookJS = document.createElement('script'); 
			     facebookJS.id = 'facebook-jssdk';
			     facebookJS.src = '//connect.facebook.net/en_US/sdk.js';
			     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
		   }());
		})

		.directive('ngDelete', [function() {
		    return {
		      replace: true,
		      templateUrl : 'templates/delete.html',
		      scope: {onConfirm: '&'},
		    }; 
		}]);

})();