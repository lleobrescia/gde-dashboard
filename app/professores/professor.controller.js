/**
* Professor Controller
* @namespace Controllers
*/
(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('ProfessorController', ProfessorController);

  ProfessorController.$inject = ['serverService', 'session', 'toastr', '$state'];

  /**
  * @namespace AlunoController
  * @desc Adiciona e edita informacoes de um aluno
  * @memberOf Controllers
  */
  function ProfessorController(serverService, session, toastr, $state) {
    var self = this;
    var idEscola = '577ffe27e371b996be608a62';

    self.carregando = true;
    self.cpf = '';
    self.email = '';
    self.enableEdition = false;
    self.idProf = null;
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
      self.idProf = $state.params.idProf;

      if (self.idProf !== undefined) {
        GetProf();
      }

      console.log(self.idProf);
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
        console.log(resp);
        $state.go('professores', { cadastro: 'OK' });
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
      self.senha = self.prof.Senha;
    }

    /**
    * @namespace GetProf
    * @desc Pega as informacoes do professor no servidor utilizando o id da url
    * @memberOf Controllers.ProfessorController
    */
    function GetProf() {
      var endpoint = 'RecuperarDadosProfessoresEscola';
      var josonRequest = {
        'ObjectID': self.idProf,
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
        console.log(self.prof);

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
        'IdGrupoUsuario': self.prof.IdGrupoUsuario,
        'Nome': self.nome,
        'Senha': self.senha,
        'Cpf': self.cpf,
        'Id_Escola': idEscola
      };

      serverService.Request(endpoint, josonRequest).then(function (resp) {
        console.log(resp);
        toastr.success('Dados Salvos!');
      });
    }
  }
})();
