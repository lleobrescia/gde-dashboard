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

    self.aluno = [];
    self.carregando = true;
    self.dataNascimento = '';
    self.editionEnable = true;
    self.emailResponsavel = '';
    self.genero = '';
    self.idAluno = null;
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
      self.idAluno = $state.params.idAluno;

      if (self.idAluno !== undefined) {
        self.editionEnable = false;
        GetAluno();
      } else {
        self.carregando = false;
      }
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

      if (self.dataNascimento === '' ||
        self.emailResponsavel === '' ||
        self.matricula === '' ||
        self.nome === '' ||
        self.genero === '') {

        toastr.error('Por favor, preencha todos os campos', 'Erro no Cadastro!');
        self.carregando = false;
        return;
      }

      serverService.Request(endpoint, josonRequest).then(function (resp) {
        $state.go('alunos', { cadastro: 'OK' });
      });
    }

    /**
    * @namespace CancelarEdicao
    * @desc Cancela as alteracoes feitas pelo usuario
    * @memberOf Controllers.AlunoController
    */
    function CancelarEdicao() {
      self.dataNascimento = self.aluno.Data_Nascimento;
      self.emailResponsavel = self.aluno.Email_Responsavel;
      self.genero = self.aluno.Sexo;
      self.matricula = self.aluno.Matricula;
      self.nome = self.aluno.Nome;
    }

    /**
    * @namespace GetAluno
    * @desc Pega as informacoes do aluno no servidor utilizando o id da url
    * @memberOf Controllers.AlunoController
    */
    function GetAluno() {
      var endpoint = 'RecuperarDadosAlunosEscola';
      var josonRequest = {
        'ObjectID': self.idAluno,
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

          CancelarEdicao();
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
        'Data_Nascimento': self.dataNascimento,
        'Email_Responsavel': self.emailResponsavel,
        'Matricula': self.matricula,
        'Nome': self.nome,
        'Sexo': self.genero
      };
      var josonRequest = 'AtualizarDadosAluno';

      self.aluno = endpoint;

      serverService.Request(endpoint, josonRequest).then(function (resp) {
        toastr.success('Alterações Salvas!');
      });
    }
  }
})();
