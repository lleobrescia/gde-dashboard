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
      .when('/alunos', {
        templateUrl: 'app/alunos/alunos.html',
        controller: 'AlunosController',
        controllerAs: 'alunos'
      })
      .when('/aluno', {
        templateUrl: 'app/alunos/aluno.html',
        controller: 'AlunoController',
        controllerAs: 'aluno'
      })
      .when('/aluno/:idAluno', {
        templateUrl: 'app/alunos/aluno.html',
        controller: 'AlunoController',
        controllerAs: 'aluno'
      })
      .otherwise({ redirectTo: '/' });
  }
} ());
