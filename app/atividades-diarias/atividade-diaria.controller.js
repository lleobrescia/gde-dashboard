(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('AtividadeController', AtividadeController);

  AtividadeController.$inject = ['serverService', 'session', 'toastr', '$state', '$stateParams', 'UploadImgService', '$uibModal', '$scope'];
  function AtividadeController(serverService, session, toastr, $state, $stateParams, UploadImgService, $uibModal, $scope) {
    var idEscola = '577ffe27e371b996be608a62';
    var self = this;

    self.dado = {
      'Ano': '',
      'Descricao': '',
      'Id_Escola': idEscola,
      'Id_Turma': '',
      'Nome': ''
    };
    self.dadoAux = [];
    self.descricao = '';
    self.edition = false;
    self.id = null;
    self.imgTurma = null;
    self.imgTurmaCortada = null;
    self.recortou = false;
    self.requestAtividades = {
      'Id_Escola': idEscola,
      'Id_Turma': '',
      'Ano': ''
    };

    self.Adicionar = Adicionar;
    self.Atualizar = Atualizar;
    self.CancelarEdicao = CancelarEdicao;

    Activate();

    ////////////////

    function Activate() {
      var d = new Date();
      self.requestAtividades.Ano = self.dado.Ano = d.getFullYear();

      angular.element(document.querySelector('#img')).on('change', HandleFileSelect);

      if ($stateParams.idTurma) {

        self.dado.Id_Turma = self.requestAtividades.Id_Turma = $stateParams.idTurma;

        if ($stateParams.idAtividade) {
          self.id = $stateParams.idAtividade;
          GetDados();
        }
      } else {
        $state.go('atividades');
      }
    }

    function Adicionar() {
      serverService.Request('CadastrarTemplateAtividadesDiarias', self.dado).then(function (resp) {
        var url = 'http://52.23.250.176/webservice/WebServiceGDE.svc/UploadFotoTemplateAtividadeDiaria?id_escola=' + idEscola + '&id_atividade=' + resp.Id;
        var result = UploadImgService.UploadImage(self.imgTurmaCortada, url);

        $state.go('atividades', { cadastro: 'OK', idTurma: self.dado.Id_Turma });
      });
    }

    function Atualizar() {
      serverService.Request('AtualizarTemplateAtividadesDiariasTurma', self.dado).then(function (resp) {
        toastr.success('Alterações Salvas!');
        self.edition = false;
      });
    }

    function CancelarEdicao() {
      self.dado = self.dadoAux;
      self.imgTurmaCortada = self.dadoAux.Url_Foto;
      self.recortou = true;
      self.edition = false;
    }

    function GetDados() {
      serverService.Request('RetornarTemplateAtividadesDiariasTurma', self.requestAtividades).then(function (resp) {
        angular.forEach(resp, function (item) {
          if (item.Id === self.id) {
            self.dado = self.dadoAux = item;
            self.imgTurmaCortada = item.Url_Foto;
            self.recortou = true;
          }
        });
      });
    }

    function HandleFileSelect(evt) {
      var file = evt.currentTarget.files[0];
      var reader = new FileReader();

      reader.onload = function (evt) {
        $scope.$apply(function () {
          self.imgTurma = evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    }

  }
})();
