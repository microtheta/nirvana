(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * @ngdoc function
 * @name yomanApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yomanApp
 */

module.exports =  function ($scope){
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  };
},{}],2:[function(require,module,exports){
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
},{"./controllers/about":1}],3:[function(require,module,exports){
'use strict';

/**
 * @ngdoc overview
 * @name yomanApp
 * @description
 * # yomanApp
 *
 * Main module of the application.
 */
 require('./main/module');
 require('./about/module');
 
angular
  .module('yomanApp', [
		'appviews',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
		'ui.sortable',
		'main',
		'about'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  });

},{"./about/module":2,"./main/module":5}],4:[function(require,module,exports){
'use strict';

/**
 * @ngdoc function
 * @name yomanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yomanApp
 */

module.exports =  function ($scope) {
	$scope.todos = ['Item 1', 'Item 2', 'Item 3'];
	$scope.addTodo = function () {
		$scope.todos.push($scope.todo);
		$scope.todo = '';
	};
	$scope.removeTodo = function (index) {
		$scope.todos.splice(index, 1);
	};
};
},{}],5:[function(require,module,exports){
'use strict';

angular.module('main',[])
  .controller('MainCtrl',require('./controllers/main'))
	.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main/main.html',
        controller: 'MainCtrl'
		});
	});
},{"./controllers/main":4}]},{},[1,2,3,4,5]);