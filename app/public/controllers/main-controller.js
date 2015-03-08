(function(){
	'use strict';

	angular
		.module('myUrlShortener')
		.controller('MainController', MainController);

	function MainController(){
		var vm = this;

		vm.url = {};
		vm.urls = [];

		vm.add = function(){
			vm.urls.push({value: vm.url.value});
			vm.url = {};
		}
	}


})();