'use strict';

angular.module('main',[])
  .controller('MainCtrl',require('./controllers/main'))
	.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../app/views/main.html',
        controller: 'MainCtrl'
		});
	});