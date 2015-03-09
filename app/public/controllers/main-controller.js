(function(){
	'use strict';

	angular
		.module('myUrlShortener')
		.controller('MainController', ['MainService', '$facebook', MainController]);

	function MainController(mainService, $facebook){
		var vm = this;

		vm.model = {};
		vm.list = [];

		vm.create = function(){
			mainService.create(vm.model).then(function(data){
				vm.list.push(data);
				vm.model = {};
			});
		}

		vm.login = function() {
			$facebook.login().then(function() {
			  refresh();
			});
		}

		function refresh() {
			$facebook.api('/me').then( 
			  function(response) {
			  	console.log(response);
			    vm.welcomeMsg = 'Welcome ' + response.name;
			    vm.isLoggedIn = true;
			  },
			  function(err) {
			    vm.welcomeMsg = 'Please log in';
			  });
			}
		}

})();