(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('TurmaController', TurmaController);

  TurmaController.$inject = ['serverService', 'session', 'toastr'];
  function TurmaController(serverService, session, toastr) {
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
