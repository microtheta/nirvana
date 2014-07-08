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
