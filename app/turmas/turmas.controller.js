(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('TurmasController', TurmasController);

  TurmasController.$inject = ['session', 'serverService'];
  function TurmasController(session, serverService) {
    var self = this;

    Activate();

    ////////////////

    function Activate() { }

    function ApagarTurma() { }

    function GetTurmas() { }
  }
})();
