(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('CalendarioController', CalendarioController);

  CalendarioController.$inject = ['serverService', 'toastr', 'ListManagerService', '$stateParams', 'session'];
  function CalendarioController(serverService, toastr, ListManagerService, $stateParams, session) {
    var idEscola = session.user.idEscola;
    var self = this;

    self.calendario = [];
    self.calendarioSelecionados = [];

    Activate();

    ////////////////

    function Activate() {
      GetDados();
    }

    function Apagar() {
      
    }

    function GetDados() {
      serverService.Request('RetornarCalendarioEscolar', { 'ObjectID': '', 'Id_Escola': idEscola }).then(function (resp) {
        console.log(resp);
      });
    }
  }
})();
