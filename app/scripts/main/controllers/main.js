'use strict';

/**
 * @ngdoc function
 * @name yomanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanApp
 */

module.exports =  function ($scope,$http) {
	$scope.todos = ['Item 1', 'Item 2', 'Item 3'];
	$scope.addTodo = function () {
		$scope.todos.push($scope.todo);
		$scope.todo = '';
	};
	$scope.removeTodo = function (index) {
		$scope.todos.splice(index, 1);
				/* example to check mock-endpoints */

				$http.get('abc/func?a=1&b=2', {
				cache: false,
				}).then(function (data) {
				console.log(data.data);
				return data;
				}, this.error);
				
				$http.post('abc/func', 
					{
						'a':'a1','b':2
					},
					{
						cache: false,
					}).
					then(function (data) {
						console.log(data.data);
						return data;
					}, this.error);
					
					
					$http.post('abc/func', 
					{
						'a':2,'b':3
					},
					{
						cache: false,
					}).
					then(function (data) {
						console.log(data.data);
						return data;
					}, this.error); 
				
	};
};