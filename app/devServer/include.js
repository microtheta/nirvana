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
angular.module('appviews', ['views/about/about.html', 'views/main/main.html']);

angular.module("views/about/about.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/about/about.html",
    "<p>This is the about view.</p>\n" +
    "");
}]);

angular.module("views/main/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/main/main.html",
    "<div class=\"container\">\n" +
    "  <h2>My todos</h2>\n" +
    "\n" +
    "  <!-- Todos input -->\n" +
    "  <form role=\"form\" ng-submit=\"addTodo()\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"input-group\">\n" +
    "        <input type=\"text\" ng-model=\"todo\" placeholder=\"What needs to be done?\" class=\"form-control\">\n" +
    "        <span class=\"input-group-btn\">\n" +
    "          <input type=\"submit\" class=\"btn btn-primary btn-large\" value=\"Add\">\n" +
    "        </span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "  <p></p>\n" +
    "\n" +
    "  <!-- Todos list -->\n" +
    "  <div ui-sortable ng-model=\"todos\">\n" +
    "    <p class=\"input-group\" ng-repeat=\"todo in todos\" style=\"padding:5px 10px; cursor: move;\">\n" +
    "      <input type=\"text\" ng-model=\"todo\" class=\"form-control\">\n" +
    "      <span class=\"input-group-btn\">\n" +
    "        <button class=\"btn btn-danger\" ng-click=\"removeTodo($index)\" aria-label=\"Remove\">X</button>\n" +
    "      </span>\n" +
    "    </p>\n" +
    "  </div>\n" +
    "<div>\n" +
    "");
}]);
