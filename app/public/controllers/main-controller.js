(function(){
	'use strict';

	angular
		.module('myUrlShortener')
		.controller('MainController', ['MainService', MainController]);

	function MainController(mainService){
		var vm = this;

		vm.model = {};
		vm.list = [];

		vm.create = function(){
			var sortUrl = {
				url: vm.model.url
			};

			mainService.save(sortUrl, function(response){
				vm.list.splice(0, 0, response);
				vm.model = {};
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
			window.open('http://localhost:3000/auth/facebook', 'login', 'width=600,height=400');
		}

		function refresh() {
			$facebook.api('/me').then( 
			  function(response) {
			    vm.isLoggedIn = true;
			    vm.user = {id: response.id, name: response.name};
			    vm.find();
			  },
			  function(err) {
			    vm.isLoggedIn = false;
			    vm.user = {};
			  });
			}
		}	

})();