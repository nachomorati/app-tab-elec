(function() {
  'use strict'

  angular
    .module('tablerosApp')
    .config(config);

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/tableros/:id', {
        templateUrl: 'views/tableros.html',
        controller: 'TablerosCtrl',
        controllerAs: 'tableros'
      })
      .otherwise({
        redirectTo: '/home'
      });
  }
}
)()
