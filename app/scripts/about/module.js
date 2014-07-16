'use strict';

angular.module('about',['ngRoute'])
  .controller('AboutCtrl',require('./controllers/about'))
	.config(function ($routeProvider) {
    $routeProvider
      .when('/about', {
				templateUrl: 'views/about/about.html',
        controller: 'AboutCtrl'
		});
	});