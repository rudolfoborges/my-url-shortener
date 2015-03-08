(function(){
	'use strict';

	angular
		.module('myUrlShortener')
		.controller('MainController', MainController);

	function MainController(){
		var vm = this;

		vm.model = {};
		vm.list = [];

		vm.add = function(){
			vm.list.push({url: vm.model.url});
			vm.model = {};
		}
	}


})();