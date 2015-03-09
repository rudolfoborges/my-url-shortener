(function(){
	'use strict';

	angular
		.module('myUrlShortener')
		.controller('MainController', ['MainService', '$facebook', MainController]);

	function MainController(mainService, $facebook){
		var vm = this;

		vm.model = {};
		vm.list = [];

		refresh();

		vm.create = function(){
			mainService.create(vm.model).then(function(data){
				vm.list.splice(0, 0, data);
				vm.model = {};
			});
		}

		vm.login = function() {
			$facebook.login().then(function() {
			  refresh();
			});
		}

		vm.find = function(){
			mainService.find().then(function(data){
				vm.list = data;
			});
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