(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('TurmaController', TurmaController);

  TurmaController.$inject = ['$routeParams', 'serverService', 'session', 'toastr'];
  function TurmaController($routeParams, serverService, session, toastr) {
    var self = this;

    Activate();

    ////////////////

    function Activate() { }

    function AtualizarListaTurma() { }

    function AdicionarTurma() { }

    function CancelarEdicao() { }

    function GetTurma() { }

    function SalvarEdicao() { }
  }
})();
