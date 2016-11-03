/**
* Professor Controller
* @namespace Controllers
*/
(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('ProfessorController', ProfessorController);

  ProfessorController.$inject = ['$routeParams', 'serverService', 'session', 'toastr'];

  /**
  * @namespace AlunoController
  * @desc Adiciona e edita informacoes de um aluno
  * @memberOf Controllers
  */
  function ProfessorController($routeParams, serverService, session, toastr) {
    var self = this;
    var idEscola = '577ffe27e371b996be608a62';
    var idProf = null;

    self.carregando = true;
    self.cpf = '';
    self.email = '';
    self.enableEdition = false;
    self.nome = '';
    self.prof = [];
    self.senha = '';

    self.AdicionarProf = AdicionarProf;
    self.CancelarEdicao = CancelarEdicao;
    self.SalvarEdicao = SalvarEdicao;

    Activate();

    ////////////////

    /**
    * @namespace Activate
    * @desc Startup do controlador
    * @memberOf Controllers.ProfessorController
    */
    function Activate() {
      idProf = $routeParams.idProf;

      if (idProf !== undefined) {
        GetProf();
      }

      console.log(idProf);
    }

    /**
    * @namespace AtualizarListaProf
    * @desc Atualiza a lista dos professores casa haja modificacao em algum professor
    * @memberOf Controllers.ProfessorController
    */
    function AtualizarListaProf() {
      var endpoint = 'RecuperarDadosProfessoresEscola';
      var josonRequest = {
        'ObjectID': '',
        'Id_Escola': idEscola
      };

      serverService.Request(endpoint, josonRequest).then(function (resp) {
        // session.user.listaProf = JSON.parse(resp);

        // session.SaveState();
      });
    }

    /**
    * @namespace AdicionarProf
    * @desc Adiciona o professor ao sistema
    * @memberOf Controllers.ProfessorController
    */
    function AdicionarProf() {
      var endpoint = 'CadastrarUsuarioProfessor';
      var josonRequest = {
        'Email': self.email,
        'IdGrupoUsuario': 0,
        'Nome': self.nome,
        'Senha': self.senha,
        'Cpf': self.cpf,
        'Id_Escola': idEscola
      };

      self.carregando = true;

      serverService.Request(endpoint, josonRequest).then(function (resp) {
        toastr.success('Aluno Adicionado');
        AtualizarListaProf();
      });
    }

    /**
    * @namespace CancelarEdicao
    * @desc Cancela as alteracoes feitas pelo usuario
    * @memberOf Controllers.ProfessorController
    */
    function CancelarEdicao() {
      self.email = self.prof.Email;
      self.nome = self.prof.Nome;
      self.cpf = self.prof.Cpf;
    }

    /**
    * @namespace GetProf
    * @desc Pega as informacoes do professor no servidor utilizando o id da url
    * @memberOf Controllers.ProfessorController
    */
    function GetProf() {
      var endpoint = 'RecuperarDadosProfessoresEscola';
      var josonRequest = {
        'ObjectID': idProf,
        'Id_Escola': idEscola
      };

      serverService.Request(endpoint, josonRequest).then(function (resp) {
        self.prof = JSON.parse(resp);
        self.prof = self.prof[0];

        if (self.prof === undefined) {
          //tratar erro
        } else {
          self.carregando = false;

          CancelarEdicao();
        }

        // session.SaveState();
      });
    }

    /**
    * @namespace SalvarEdicao
    * @desc Salva as informacoes editadas e envia ao servidor
    * @memberOf Controllers.ProfessorController
    */
    function SalvarEdicao() {
      var endpoint = 'AtualizarDadosProfessor';
      var josonRequest = {
        'Email': self.email,
        'IdGrupoUsuario': 0,
        'Nome': self.nome,
        'Senha': self.senha,
        'Cpf': self.cpf,
        'Id_Escola': idEscola
      };

      serverService.Request(endpoint, josonRequest).then(function (resp) {
      });
    }
  }
})();
