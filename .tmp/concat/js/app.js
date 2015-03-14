(function(){
	'use strict';

	angular
		.module('myUrlShortener', ['ngResource'])

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
			});

			$rootScope.$on('loggedIn', function(event, userID, username){
				$rootScope.isLoggedIn = true;
				$rootScope.userID = userID;
				$rootScope.username = username;
			});
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
(function(){
	'use strict';

	angular
		.module('myUrlShortener')
		.controller('MainController', ['$scope', '$window', 'MainService', MainController]);

	function MainController($scope, $window, mainService){
		var vm = this;

		vm.model = {};
		vm.list = [];

		vm.init = function(userID, username){
			if(userID){
				$scope.$emit('loggedIn', userID, username);
				vm.find();
			}
		}

		vm.create = function(){
			var sortUrl = {
				url: vm.model.url
			};

			mainService.save(sortUrl, function(response){
				vm.list.splice(0, 0, response);
				vm.model = {};
				$scope.frm.$setPristine();
			});
		}

		vm.find = function(){
			mainService.query(function(response){
				vm.list = response;
			});
		}

		vm.remove = function(item){
			item.$remove(function(response){
				var index = vm.list.indexOf(item);
				console.log(index);
				vm.list.splice(index, 1);
			});
		}

		vm.login = function() {
			$window.open($scope.baseURL + '/auth/facebook', 'login', 'width=600,height=400');
		}
		
	}	

})();
(function(){
	'use strict';

	angular
		.module('myUrlShortener')
		.service('MainService', ['$resource', MainService]);

	function MainService($resource){
		return $resource('api/shortener/:shortUrlId', {shortUrlId: '@_id'}, {update: {method: 'PUT'}});
	}


})();