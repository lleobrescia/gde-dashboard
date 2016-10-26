(function () {
  'use strict';

  angular
    .module('dashboard')
    .factory('session', session);

  session.$inject = ['$rootScope'];
  function session($rootScope) {
    var padrao = {
      id: '577ffe27e371b996be608a62',
      listaAlunos: [],
      listaTurmas: [],
      listaProf: []
    };

    var service = {
      user: null,
      SaveState: SaveState,
      RestoreState: RestoreState,
      Remove: Remove
    };

    $rootScope.$on('savestate', service.SaveState);
    $rootScope.$on('restorestate', service.RestoreState);

    return service;

    ////////////////
    function SaveState() {
      console.log('savestate');
      if (service.user === null) {
        service.user = padrao;
      }
      sessionStorage.Session = angular.toJson(service.user);
    }

    function RestoreState() {
      console.log('restorestate');
      try {
        service.user = angular.fromJson(sessionStorage.Session);
      } catch (error) {
        service.user = padrao;
      }
    }

    function Remove() {
      sessionStorage.Session = null;
      service.user = padrao;
    }
  }
})();
