(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('TurmasController', TurmasController);

  TurmasController.$inject = ['session', 'serverService'];
  function TurmasController(session, serverService) {
    var idEscola = '577ffe27e371b996be608a62';
    var self = this;

    self.listaTurmas = [];

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

        self.listaTurmas = JSON.parse(resp);

        console.log(self.listaTurmas);

      });
    }
  }
})();
