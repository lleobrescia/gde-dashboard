(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('TurmaController', TurmaController);

  TurmaController.$inject = ['serverService', 'toastr', '$state', 'ListManagerService'];
  function TurmaController(serverService, toastr, $state, ListManagerService) {
    var idEscola = '577ffe27e371b996be608a62';
    var self = this;

    self.alunos = [];
    self.alunosSelecionados = [];
    self.dado = {
      'Ano': '',
      'Id_Escola': idEscola,
      'Nome': '',
      'Serie': '',
      'Sigla': ''
    };
    self.dadoAux = [];
    self.professores = [];
    self.profSelecionado = null;
    self.request = {
      'ObjectID': '',
      'Id_Escola': idEscola
    };

    self.AdicionarTurma = AdicionarTurma;
    self.CancelarEdicao = CancelarEdicao;
    self.FilterAlunos = FilterAlunos;
    self.ListManagerService = ListManagerService; //Servico usado na view

    Activate();

    ////////////////

    function Activate() {
      if ($state.params.idTurma) {
        self.request.ObjectID = $state.params.idTurma;
        GetTurma();
      }
      GetAlunos();
      GetProfessores();
    }

    function AdicionarTurma() {
      serverService.Request('CadastrarTurma', self.dado).then(function (resp) {
        var id = resp.Id;
      });
    }

    function Atualizar() { }

    function CancelarEdicao() {
      self.dado = self.dadoAux;
    }

    function FilterAlunos(aluno) {
      return self.alunosSelecionados.indexOf(aluno) === -1;
    }

    function GetTurma() {
      serverService.Request('RecuperarDadosTurmasEscola', self.request).then(function (resp) {
        self.dado = self.dadoAux = resp[0];
        self.profSelecionado = self.dado.Id_Professor;
      });
    }

    function GetAlunos() {
      serverService.Request('RecuperarDadosAlunosEscola', { 'ObjectID': '', 'Id_Escola': idEscola }).then(function (resp) {
        angular.forEach(resp, function (item) {
          if (!item.Id_Turma) {
            item.disabled = false;
            self.alunos.push(item);
          } else if (item.Id_Turma === self.request.ObjectID) {
            item.disabled = true;
            self.alunosSelecionados.push(item);
          }

        });
      });
    }

    function GetProfessores() {
      serverService.Request('RecuperarDadosProfessoresEscola', { 'ObjectID': '', 'Id_Escola': idEscola }).then(function (resp) {
        self.professores = resp;

        console.log(resp);
      });
    }
  }
})();
