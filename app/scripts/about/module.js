'use strict';

angular.module('about',[])
  .controller('AboutCtrl',require('./controllers/about'))
	.config(function ($routeProvider) {
    $routeProvider
      .when('/about', {
				templateUrl: 'views/about/about.html',
        controller: 'AboutCtrl'
		});
	});