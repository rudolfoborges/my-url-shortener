(function(){
	'use strict';

	angular
		.module('myUrlShortener')
		.service('MainService', MainService);

	function MainService($http, $q){
		return {
			create: function(model){
				var deferred = $q.defer();
				$http.post('api/shortener', model).then(function(response){
					deferred.resolve(response.data);
				}, function() {
					deferred.reject();
				});
				return deferred.promise;
			}
		}
	}


})();