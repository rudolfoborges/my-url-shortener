(function(){
	'use strict';

	angular
		.module('myUrlShortener', ['ngResource', 'ngFacebook'])

		.config(['$locationProvider', '$httpProvider', '$provide',
			function($locationProvider, $httpProvider, $provide){
				$locationProvider.html5Mode(false).hashPrefix('!');
		}])

		.run(['$http', '$rootScope', function($http, $rootScope){
			$http.get('/api/config').then(function(response){
				var config = response.data;
				$rootScope.baseURL = config.baseURL;

				if (document.getElementById('facebook-jssdk')) {return;}
			    var firstScriptElement = document.getElementsByTagName('script')[0];
			    var facebookJS = document.createElement('script'); 
			    facebookJS.id = 'facebook-jssdk';
			    facebookJS.src = '//connect.facebook.net/en_US/sdk.js';
			    firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
			})
		}])

		

		.directive('ngDelete', [function() {
		    return {
		      replace: true,
		      templateUrl : 'templates/delete.html',
		      scope: {
		      	onConfirm: '&'
		      }
		    }; 
		}]);

})();