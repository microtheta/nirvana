'use strict';

angular.module('main',['ngRoute'])
  .controller('MainCtrl',require('./controllers/main'))
	.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main/main.html',
        controller: 'MainCtrl'
		});
	});