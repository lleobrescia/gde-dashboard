(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('TurmasController', TurmasController);

  TurmasController.$inject = ['session', 'serverService', '$state'];
  function TurmasController(session, serverService, $state) {
    var idEscola = '577ffe27e371b996be608a62';
    var self = this;

    self.listaTurmas = [];

    self.GoToTurma = GoToTurma;

    Activate();

    ////////////////

    function Activate() {
      GetTurmas();
    }

    function ApagarTurma() { }

    function GetTurmas() {
      var endpoint = 'RecuperarDadosTurmasEscola';

      var josonRequest = {
        'ObjectID': '',
        'Id_Escola': idEscola
      };

      serverService.Request(endpoint, josonRequest).then(function (resp) {

        self.listaTurmas = resp;

        console.log(self.listaTurmas);

      });
    }

    function GoToTurma(idTurma) {
      $state.go('turmasDetails', { idTurma: idTurma });
    }
  }
})();
