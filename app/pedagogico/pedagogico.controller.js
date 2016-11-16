(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('PedagogicoController', PedagogicoController);

  PedagogicoController.$inject = ['serverService', 'session', '$state', '$stateParams', 'ListManagerService', 'toastr'];
  function PedagogicoController(serverService, session, $state, $stateParams, ListManagerService, toastr) {
    var idEscola = '577ffe27e371b996be608a62';
    var self = this;

    self.camposExperiencia = [];
    self.campoSelecionado = null;
    self.dado = {
      'DataCadastro': '',
      'Descricao': '',
      'Id_Escola': idEscola,
      'Id_SubGrupoEtario': null,
      'Id_Turma': '',
      'Nome': '',
      'Questionario': []
    };
    self.grupoEtario = [];
    self.nomeGrupoEtario = null;
    self.nomeTurma = null;
    self.objetivoAprendizagem = [];
    self.questionario = [];
    self.turma = [];
    self.requestAvaliacoes = {
      'Id_Escola': idEscola,
      'Id_Turma': '',
      'Id': null
    };
    self.requestTurmas = {
      'ObjectID': '',
      'Id_Escola': idEscola
    };

    self.Adicionar = Adicionar;
    self.AdicionarCampoExperiencia = AdicionarCampoExperiencia;
    self.GetNomeCampoExperiencia = GetNomeCampoExperiencia;
    self.GetNomeObjetivo = GetNomeObjetivo;
    self.ListManagerService = ListManagerService; //servico usado no view
    self.RemoverCampoExperiencia = RemoverCampoExperiencia;

    Activate();

    ////////////////

    function Activate() {
      if ($stateParams.idTurma) {

        self.requestAvaliacoes.Id_Turma =
          self.requestTurmas.ObjectID =
          self.dado.Id_Turma =
          $stateParams.idTurma;

        GetAtributos();
        GetTurma();

        if ($stateParams.idAvaliacao) {
          self.requestAvaliacoes.Id = $stateParams.idAvaliacao;
          GetDados();
        }
      } else {
        $state.go('pedagogico');
      }
    }

    function AdicionarCampoExperiencia() {
      var possui = false;

      angular.forEach(self.questionario, function (item) {
        if (item.CampoExperiencia === self.campoSelecionado) {
          toastr.error('Campo de Experiência já adicionado!');
          possui = true;
        }
      });

      if (!possui) {
        self.questionario.push({
          'CampoExperiencia': self.campoSelecionado,
          'ObjetivoAprendizagem': [],
          'show': true
        });
      }
      self.campoSelecionado = null;
    }

    function Adicionar() {
      angular.forEach(self.questionario, function (item) {
        delete item.show;
      });

      self.dado.Questionario = self.questionario;
      serverService.Request('CadastrarAvaliacaoPedagogica', self.dado).then(function (resp) {
        $state.go('pedagogico', { cadastro: 'OK', idTurma: self.requestAvaliacoes.Id_Turma });
        console.log(resp);
      });
    }

    function GetAtributos() {
      serverService.Request('RetornarAtributosAvaliacaoPedagogica', self.requestAvaliacoes).then(function (resp) {
        self.camposExperiencia = resp.Campos_Experiencia;
        self.objetivoAprendizagem = resp.Objetivos_Aprendizagem;
        self.grupoEtario = resp.SubGrupo_Etario;

        if (self.dado.Id_SubGrupoEtario) {
          GetNomeGrupoEtario(self.dado.Id_SubGrupoEtario);
        }

        console.log(resp);
      });
    }

    function GetDados() {
      serverService.Request('RetornarAvaliacoesPedagogicasPorIdTurma', self.requestAvaliacoes).then(function (resp) {
        self.dado = resp[0];
        console.log(self.dado);
      });
    }

    function GetNomeCampoExperiencia(codigo) {
      var retorno = '';

      angular.forEach(self.camposExperiencia, function (item) {
        if (item.Codigo === codigo) {
          retorno = item.Descricao;
        }
      });

      return retorno;
    }

    function GetNomeGrupoEtario(id) {
      angular.forEach(self.grupoEtario, function (item) {
        if (item.Codigo.toString() === id.toString()) {
          self.nomeGrupoEtario = item.Descricao;
        }
      });
    }

    function GetNomeObjetivo(codigo) {
      var retorno = '';

      angular.forEach(self.objetivoAprendizagem, function (item) {
        if (item.Codigo === codigo) {
          retorno = item.Descricao;
        }
      });

      return retorno;
    }

    function GetTurma() {
      serverService.Request('RecuperarDadosTurmasEscola', self.requestTurmas).then(function (resp) {
        self.turma = resp[0];
      });
    }

    function RemoverCampoExperiencia(index) {
      self.questionario.splice(index, 1);
    }
  }
})();
