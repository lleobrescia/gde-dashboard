(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('AlunoController', AlunoController);

  AlunoController.$inject = ['$routeParams', 'serverService'];
  function AlunoController($routeParams, serverService) {
    var self = this;
    var id = serverService.user.id;

    self.aluno = [];
    self.bairro = '';
    self.cep = '';
    self.cidade = '';
    self.dataNascimento = '';
    self.emailResponsavel = '';
    self.emergencia = {
      'celular': '',
      'filiacao': '',
      'nome': '',
      'telefone': ''
    };
    self.estado = '';
    self.genero = '';
    self.informacoesMedicas = '';
    self.listaAlunos = [];
    self.logradouro = '';
    self.mae = {
      'celular': '',
      'filiacao': '',
      'nome': '',
      'telefone': ''
    };
    self.matricula = '';
    self.nome = '';
    self.pai = {
      'celular': '',
      'filiacao': '',
      'nome': '',
      'telefone': ''
    };
    self.responsavelBuscar = {
      'celular': '',
      'filiacao': '',
      'nome': '',
      'telefone': ''
    };
    self.restricoesAlimentares = '';
    self.senhaApp = '';

    Activate();

    ////////////////

    function Activate() {
      var id = $routeParams.idAluno;

      self.listaAlunos =  serverService.user.listaAlunos;
    }

    /**
   * @namespace AdicionarAluno
   * @desc Adiciona o aluno e envia a senha para o responsavel
   * @todo implementar funcao
   * @memberOf Controllers.AlunoController
   */
    function AdicionarAluno() {
      var endpoint = 'CadastrarAluno';
      var josonRequest = {
        'Data_Nascimento': self.dataNascimento,
        'Email_Responsavel': self.emailResponsavel,
        'Excluido': false,
        'Id_Escola': id,
        'Matricula': self.matricula,
        'Nome': self.nome,
        'SenhaAppPai': '',
        'Sexo': self.genero
      };

      serverService.Request(endpoint, josonRequest).then(function (resp) { });
    }

    function GetAluno(){

    }

    function GetAlunoById(id) {
      var retorno = null;

      angular.forEach(self.listaAlunos, function (item) {

        if (item.Id === id) {
          retorno = item;
          return retorno;
        }
      });

      return retorno;
    }

    /**
    * @namespace SalvarEdicao
    * @desc Salva as informacoes editadas e envia ao servidor
    * @todo servico de atualizar dados do aluno
    * @todo implementar funcao
    * @memberOf Controllers.AlunosController
    */
    function SalvarEdicao() {
      var endpoint = '';
      var josonRequest = '';

      serverService.Request(endpoint, josonRequest).then(function (resp) { });
    }
  }
})();
