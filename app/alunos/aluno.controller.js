(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('AlunoController', AlunoController);

  AlunoController.$inject = ['$routeParams', 'serverService', 'session', 'toastr'];
  function AlunoController($routeParams, serverService, session, toastr) {
    var self = this;
    var idEscola = session.user.id;
    var idAluno = null;

    self.aluno = [];
    self.carregando = true;
    self.dataNascimento = '';
    self.emailResponsavel = '';
    self.genero = '';
    self.matricula = '';
    self.nome = '';

    self.AdicionarAluno = AdicionarAluno;
    self.CancelarEdicao = CancelarEdicao;
    self.SalvarEdicao = SalvarEdicao;

    Activate();

    ////////////////

    /**
    * @namespace Activate
    * @desc Startup do controlador
    * @memberOf Controllers.AlunoController
    */
    function Activate() {
      idAluno = $routeParams.idAluno;

      if (idAluno !== undefined) {
        GetAluno();
      }

      console.log(idAluno);
    }

    /**
    * @namespace AtualizarListaAlunos
    * @desc Atualiza a lista dos alunos casa haja modificacao em algum aluno
    * @memberOf Controllers.AlunoController
    */
    function AtualizarListaAlunos() {
      var endpoint = 'RecuperarDadosAlunosEscola';
      var josonRequest = {
        'ObjectID': '',
        'Id_Escola': idEscola
      };

      serverService.Request(endpoint, josonRequest).then(function (resp) {
        session.user.listaAlunos = JSON.parse(resp);
        session.SaveState();

        self.carregando = false;
      });
    }

    /**
    * @namespace AdicionarAluno
    * @desc Adiciona o aluno e envia a senha para o responsavel
    * @memberOf Controllers.AlunoController
    */
    function AdicionarAluno() {
      var endpoint = 'CadastrarAluno';
      var josonRequest = {
        'Data_Nascimento': self.dataNascimento,
        'Email_Responsavel': self.emailResponsavel,
        'Excluido': false,
        'Id_Escola': idEscola,
        'Matricula': self.matricula,
        'Nome': self.nome,
        'SenhaAppPai': '',
        'Sexo': self.genero
      };

      self.carregando = true;

      serverService.Request(endpoint, josonRequest).then(function (resp) {
        toastr.success('Aluno Adicionado');
        AtualizarListaAlunos();
      });
    }

    /**
    * @namespace CancelarEdicao
    * @desc Cancela as alteracoes feitas pelo usuario
    * @memberOf Controllers.AlunoController
    */
    function CancelarEdicao() {
      self.aluno.Data_Nascimento = self.dataNascimento;
      self.aluno.Email_Responsavel = self.emailResponsavel;
      self.aluno.Sexo = self.genero;
      self.aluno.Matricula = self.matricula;
      self.aluno.Nome = self.nome;
    }

    /**
    * @namespace GetAluno
    * @desc Pega as informacoes do aluno no servidor utilizando o id da url
    * @memberOf Controllers.AlunoController
    */
    function GetAluno() {
      var endpoint = 'RecuperarDadosAlunosEscola';
      var josonRequest = {
        'ObjectID': idAluno,
        'Id_Escola': idEscola
      };

      self.carregando = true;

      serverService.Request(endpoint, josonRequest).then(function (resp) {
        self.aluno = JSON.parse(resp);
        self.aluno = self.aluno[0];

        if (self.aluno === undefined) {
          //tratar erro
        } else {
          self.carregando = false;

          self.dataNascimento = self.aluno.Data_Nascimento;
          self.emailResponsavel = self.aluno.Email_Responsavel;
          self.genero = self.aluno.Sexo;
          self.matricula = self.aluno.Matricula;
          self.nome = self.aluno.Nome;
        }
        console.log(self.aluno);
      });
    }

    /**
    * @namespace SalvarEdicao
    * @desc Salva as informacoes editadas e envia ao servidor
    * @memberOf Controllers.AlunoController
    */
    function SalvarEdicao() {
      var endpoint = {
        'AfiliacaoResponsavelBuscarAluno': self.aluno.AfiliacaoResponsavelBuscarAluno,
        'AfiliacaoResponsavelEmergencia': self.aluno.AfiliacaoResponsavelEmergencia,
        'Afiliacao_Resp1': self.aluno.Afiliacao_Resp1,
        'Afiliacao_Resp2': self.aluno.Afiliacao_Resp2,
        'Bairro': self.aluno.Bairro,
        'CelularResponsavelBuscarAluno': self.aluno.CelularResponsavelBuscarAluno,
        'CelularResponsavelEmergencia': self.aluno.CelularResponsavelEmergencia,
        'Celular_Resp1': self.aluno.Celular_Resp1,
        'Celular_Resp2': self.aluno.Celular_Resp2,
        'Cep': self.aluno.Cep,
        'Cidade': self.aluno.Cidade,
        'Endereco': self.aluno.Endereco,
        'Estado': self.aluno.Estado,
        'Id': self.aluno.Id,
        'IdUsuarioPai': self.aluno.IdUsuarioPai,
        'InformacoesMedicas': self.aluno.InformacoesMedicas,
        'NomeResponsavel1': self.aluno.NomeResponsavel1,
        'NomeResponsavel2': self.aluno.NomeResponsavel2,
        'NomeResponsavelBuscarAluno': self.aluno.NomeResponsavelBuscarAluno,
        'NomeResponsavelEmergencia': self.aluno.NomeResponsavelEmergencia,
        'Numero': self.aluno.Numero,
        'RestricoesAlimentares': self.aluno.RestricoesAlimentares,
        'TelefoneResponsavelBuscarAluno': self.aluno.TelefoneResponsavelBuscarAluno,
        'TelefoneResponsavelEmergencia': self.aluno.TelefoneResponsavelEmergencia,
        'Telefone_Resp1': self.aluno.Telefone_Resp1,
        'Telefone_Resp2': self.aluno.Telefone_Resp2,
        'Data_Nascimento': self.dataNascimento.Data_Nascimento,
        'Email_Responsavel': self.emailResponsavel.Email_Responsavel,
        'Matricula': self.matricula.Matricula,
        'Nome': self.nome.Nome,
        'Sexo': self.gener.Sexoo
      };
      var josonRequest = 'AtualizarDadosAluno';

      self.aluno = endpoint;

      serverService.Request(endpoint, josonRequest).then(function (resp) {
        toastr.success('Alterações Salvas!');
      });
    }
  }
})();
