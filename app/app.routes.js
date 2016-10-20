(function () {
  'use strict';

  angular
    .module('dashboard')
    .config(RouteConfig);

  RouteConfig.$inject = ['$routeProvider', '$locationProvider'];
  function RouteConfig($routeProvider, $locationProvider) {

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        redirectTo: '/'
      })
      .otherwise({ redirectTo: '/' });
  }
} ());
