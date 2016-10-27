/**
* Alunos Controller
* @namespace Controllers
*/
(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('AlunosController', AlunosController);

  AlunosController.$inject = ['serverService', 'session'];

  /**
  * @namespace AlunosController
  * @desc Gerencia os dados dos alunos
  * @memberOf Controllers
  */
  function AlunosController(serverService, session) {
    var self = this;
    var idEscola = session.user.id;

    self.carregando = true;
    self.listaAlunos = [];

    self.ApagarAluno = ApagarAluno;

    Activate();

    ////////////////

    /**
    * @namespace Activate
    * @desc Startup do controlador
    * @memberOf Controllers.AlunosController
    */
    function Activate() {
      if (session.user.listaAlunos === null) {
        GetAlunos();
      } else {
        self.listaAlunos = session.user.listaAlunos;
      }
      self.carregando = false;
    }

    /**
		* @namespace ApagarAluno
		* @desc Retira o aluno do sistema
    * @param {int} index - index da lista de alunos para ser removido
    * @param {int} alunoId - id do aluno para enviar para o servidor
		* @memberOf Controllers.AlunosController
		*/
    function ApagarAluno(index, alunoId) {
      var endpoint = {
        'ObjectID': alunoId
      };
      var josonRequest = 'ExcluirAluno';

      self.listaAlunos.splice(index, 1);
      session.user.listaAlunos = self.listaAlunos;

      session.SaveState();

      serverService.Request(endpoint, josonRequest);
    }

    /**
		* @namespace GetAlunos
		* @desc Pega todos os alunos do servidor
		* @memberOf Controllers.AlunosController
		*/
    function GetAlunos() {
      var endpoint = 'RecuperarDadosAlunosEscola';
      /**
			 * Enviando os campos Id_Turma e Id_Aluno em branco
			 * retorna todos os alunos
			 */
      var josonRequest = {
        'ObjectID': '',
        'Id_Escola': idEscola
      };

      //Envia o endpoint com o json de request para o servidor e espera a resposta (promise)
      serverService.Request(endpoint, josonRequest).then(function (resp) {
        /**
				 * A resposta eh um string em formato json
				 * Eh preciso passar para json object
				 */
        self.listaAlunos = JSON.parse(resp);

        session.user.listaAlunos = self.listaAlunos;

        session.SaveState();
      });
    }
  }
})();
