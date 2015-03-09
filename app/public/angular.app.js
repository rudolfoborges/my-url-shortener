(function(){
	'use strict';

	angular
		.module('myUrlShortener', ['ngFacebook'])

		.config(function($locationProvider, $facebookProvider){
			$locationProvider.html5Mode(false).hashPrefix('!');
			$facebookProvider.setAppId('784472188274113');
		})

		.run(function(){
			(function(){
		     // If we've already installed the SDK, we're done
		     if (document.getElementById('facebook-jssdk')) {return;}

		     // Get the first script element, which we'll use to find the parent node
		     var firstScriptElement = document.getElementsByTagName('script')[0];

		     // Create a new script element and set its id
		     var facebookJS = document.createElement('script'); 
		     facebookJS.id = 'facebook-jssdk';

		     // Set the new script's source to the source of the Facebook JS SDK
		     facebookJS.src = '//connect.facebook.net/en_US/sdk.js';

		     // Insert the Facebook JS SDK into the DOM
		     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
		   }());
		});

})();