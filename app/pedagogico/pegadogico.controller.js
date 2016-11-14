(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('PedagogicoController', PedagogicoController);

  PedagogicoController.$inject = ['serverService', 'session', 'toastr', '$state', '$stateParams'];
  function PedagogicoController(serverService, session, toastr, $state, $stateParams) {
    var idEscola = '577ffe27e371b996be608a62';
    var self = this;

    self.atributos = [];
    self.camposExperiencia = [];
    self.dados = {
      'DataCadastro': '',
      'Descricao': '',
      'Id_Escola': idEscola,
      'Id_SubGrupoEtario': null,
      'Id_Turma': '',
      'Nome': '',
      'Questionario': []
    };
    self.objetivoAprendizagem = [];
    self.turmas = [];
    self.requestAvaliacoes = {
      'Id_Escola': idEscola,
      'Id_Turma': '',
      'Id': ''
    };
    self.requestTurmas = {
      'ObjectID': '',
      'Id_Escola': idEscola
    };

    Activate();

    ////////////////

    function Activate() {
      if ($stateParams.idTurma) {
        self.requestAvaliacoes.Id_Turma = self.dados.Id_Turma = $stateParams.idTurma;
        if ($stateParams.idAvaliacao) {
          self.requestAvaliacoes.Id = $stateParams.idAvaliacao;
          GetDados();
        } else {
          GetDados();
          GetTurmas();
        }
      }
    }

    function Adicionar() {
      serverService.Request('CadastrarAvaliacaoPedagogica', self.dados).then(function (resp) {

      });
    }

    function GetAtributos() {
      serverService.Request('RetornarAtributosAvaliacaoPedagogica', self.requestAvaliacoes).then(function (resp) {
        self.atributos = resp;
      });
    }

    function GetDados() {
      serverService.Request('RemoverUsuarioEscola', self.requestAvaliacoes).then(function (resp) {
        self.dados = resp[0];
      });
    }

    function GetTurmas() {
      serverService.Request('RemoverUsuarioEscola', self.resquestTurmas).then(function (resp) {
        self.turmas = resp;
      });
    }
  }
})();
