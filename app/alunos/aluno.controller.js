/**
* Aluno Controller
* @namespace Controllers
*/
(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('AlunoController', AlunoController);

  AlunoController.$inject = ['serverService', 'session', 'toastr', '$state'];

  /**
  * @namespace AlunoController
  * @desc Adiciona e edita informacoes de um aluno
  * @memberOf Controllers
  */
  function AlunoController(serverService, session, toastr, $state) {
    var self = this;
    var idEscola = '577ffe27e371b996be608a62';

    self.dadoAdicionar = {
      'Data_Nascimento': '',
      'Email_Responsavel': '',
      'Excluido': false,
      'Id_Escola': idEscola,
      'Matricula': '',
      'Nome': '',
      'SenhaAppPai': '',
      'Sexo': ''
    };
    self.dado = [];
    self.dadoAux = [];
    self.carregando = true;
    self.dataNascimento = '';
    self.edition = true;
    self.emailResponsavel = '';
    self.genero = '';
    self.idAluno = null;
    self.matricula = '';
    self.nome = '';
    self.request = {
      'ObjectID': self.idAluno,
      'Id_Escola': idEscola
    };

    self.AdicionarAluno = AdicionarAluno;
    self.Atualizar = Atualizar;
    self.CancelarEdicao = CancelarEdicao;

    Activate();

    ////////////////

    /**
    * @namespace Activate
    * @desc Startup do controlador
    * @memberOf Controllers.AlunoController
    */
    function Activate() {
      if ($state.params.idAluno) {
        self.request.ObjectID = $state.params.idAluno;
        self.edition = false;
        GetAluno();
      }
    }

    /**
    * @namespace AdicionarAluno
    * @desc Adiciona o aluno e envia a senha para o responsavel
    * @memberOf Controllers.AlunoController
    */
    function AdicionarAluno() {
      serverService.Request('CadastrarAluno', self.dadoAdicionar).then(function (resp) {
        $state.go('alunos', { cadastro: 'OK' });
      });
    }

    /**
    * @namespace Atualizar
    * @desc Salva as informacoes editadas e envia ao servidor
    * @memberOf Controllers.AlunoController
    */
    function Atualizar() {
      serverService.Request('AtualizarDadosAluno', self.dado).then(function (resp) {
        toastr.success('Alterações Salvas!');
      });
    }

    /**
    * @namespace CancelarEdicao
    * @desc Cancela as alteracoes feitas pelo usuario
    * @memberOf Controllers.AlunoController
    */
    function CancelarEdicao() {
      self.dado = self.dadoAux;
      self.edition = false;
    }

    /**
    * @namespace GetAluno
    * @desc Pega as informacoes do aluno no servidor utilizando o id da url
    * @memberOf Controllers.AlunoController
    */
    function GetAluno() {
      serverService.Request('RecuperarDadosAlunosEscola', self.request).then(function (resp) {
        self.dado = self.dadoAux = resp[0];

        self.dadoAdicionar.Data_Nascimento = self.dado.Data_Nascimento;
        self.dadoAdicionar.Email_Responsavel = self.dado.Email_Responsavel;
        self.dadoAdicionar.Matricula = self.dado.Matricula;
        self.dadoAdicionar.Nome = self.dado.Nome;
        self.dadoAdicionar.SenhaAppPai = self.dado.SenhaAppPai;
        self.dadoAdicionar.Sexo = self.dado.Sexo;

        console.log(self.dado);
      });
    }
  }
})();
