/**
* Alunos Controller
* @namespace Controllers
*/
(function () {
	'use strict';

	angular
		.module('dashboard')
		.controller('AlunosController', AlunosController);

	AlunosController.$inject = ['serverService','session'];

	/** 
	* @namespace AlunosController
	* @desc Gerencia os dados dos alunos
	* @memberOf Controllers
	*/
	function AlunosController(serverService,session) {
		var self = this;
		var idEscola = session.user.id;

		self.listaAlunos = [];

		Activate();

		////////////////

		function Activate() {
			GetAlunos();
		}

		/**
		* @namespace ApagarAluno
		* @desc Retira o aluno do sistema
		* @todo servico de apagar aluno
		* @todo implementar funcao
		* @memberOf Controllers.AlunosController
		*/
		function ApagarAluno() {
			var endpoint = '';
			var josonRequest = '';

			serverService.Request(endpoint, josonRequest).then(function (resp) { });
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
				console.log(self.listaAlunos);
			});
		}
	}
})();
