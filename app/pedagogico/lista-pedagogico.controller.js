(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('ListaPedagogicoController', ListaPedagogicoController);

  ListaPedagogicoController.$inject = ['serverService', 'session', 'toastr', '$state', '$stateParams'];
  function ListaPedagogicoController(serverService, session, toastr, $state, $stateParams) {
    var idEscola = '577ffe27e371b996be608a62';
    var self = this;

    self.avaliacoes = [];
    self.turmas = [];
    self.requestAvaliacoes = {
      'Id_Escola': idEscola,
      'Id_Turma': null,
      'Id': ''
    };
    self.requestTurmas = {
      'ObjectID': '',
      'Id_Escola': idEscola
    };

    self.Apagar = Apagar;
    self.CancelarSelecao = CancelarSelecao;
    self.GetAvaliacoes = GetAvaliacoes;

    Activate();

    ////////////////

    function Activate() {
      GetTurmas();
      if ($stateParams.idTurma) {
        GetAvaliacoes($stateParams.idTurma);

        if ($stateParams.idCardapio) {
          toastr.success('Avaliação Cadastrada');
        }
      }
    }

    function Apagar(idAvaliacao) {
      serverService.Request('RemoverAvaliacaoPedagogicaTurma', { ObjectID: idAvaliacao }).then(function (resp) {
        GetAvaliacoes(self.requestAvaliacoes.Id_Turma);
      });
    }

    function CancelarSelecao() {
      self.requestAvaliacoes.Id_Turma = null;
      self.avaliacoes = [];
    }

    function GetAvaliacoes(idTurma) {
      self.requestAvaliacoes.Id_Turma = idTurma;
      serverService.Request('RetornarAvaliacoesPedagogicasPorIdTurma', self.requestAvaliacoes).then(function (resp) {
        console.log(resp);
        self.avaliacoes = resp;
      });
    }

    function GetTurmas() {
      serverService.Request('RecuperarDadosTurmasEscola', self.requestTurmas).then(function (resp) {
        self.turmas = resp;
        console.log(resp);
      });
    }
  }
})();
