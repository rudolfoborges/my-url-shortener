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
				vm.list.splice(index, 1);
			});
		}

		vm.login = function() {
			$window.open($scope.baseURL + '/auth/facebook', 'login', 'width=600,height=400');
		}
		
	}	

})();