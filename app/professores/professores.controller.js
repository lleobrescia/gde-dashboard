/**
* Professores Controller
* @namespace Controllers
*/
(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('ProfessoresController', ProfessoresController);

  ProfessoresController.$inject = ['session', 'serverService'];

  /**
  * @namespace ProfessoresController
  * @desc Gerencia os dados dos professores
  * @memberOf Controllers
  */
  function ProfessoresController(session, serverService) {
    var self = this;
    var idEscola = session.user.id;

    self.carregando = true;
    self.listaProf = [];

    Activate();

    ////////////////

    /**
    * @namespace Activate
    * @desc Startup do controlador
    * @memberOf Controllers.ProfessoresController
    */
    function Activate() {
      if (session.user.listaProf === null) {
        GetProfs();
      } else {
        self.listaProf = session.user.listaProf;
      }
      self.carregando = false;
    }

    /**
		* @namespace ApagarProf
		* @desc Retira o professor do sistema
    * @param {int} index - index da lista de professores para ser removido
    * @param {int} profId - id do professor para enviar para o servidor
		* @memberOf Controllers.ProfessoresController
		*/
    function ApagarProf(index, profId) {
      var endpoint = {
        'ObjectID': profId
      };
      var josonRequest = 'ExcluirProfessor';

      self.listaProf.splice(index, 1);
      session.user.listaProf = self.listaProf;

      session.SaveState();

      serverService.Request(endpoint, josonRequest);
    }

    /**
		* @namespace GetProfs
		* @desc Pega todos os professores do servidor
		* @memberOf Controllers.ProfessoresController
		*/
    function GetProfs() {
      var endpoint = 'RecuperarDadosProfessoresEscola';
      var josonRequest = {
        'ObjectID': '',
        'Id_Escola': idEscola
      };

      serverService.Request(endpoint, josonRequest).then(function (resp) {
        self.listaProf = JSON.parse(resp);
        session.user.listaProf = self.listaProf;

        session.SaveState();
      });
    }
  }
})();
