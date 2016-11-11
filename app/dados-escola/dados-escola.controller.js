(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('EscolaController', EscolaController);

  EscolaController.$inject = ['serverService', 'toastr', '$scope', '$http', 'RequestAsFormPost'];
  function EscolaController(serverService, toastr, $scope, $http, RequestAsFormPost) {
    var idEscola = '577ffe27e371b996be608a62';
    var self = this;

    self.Atualizar = Atualizar;
    self.dado = {
      'cadastro': '',
      'cnpj': '',
      'email': '',
      'endereco': {
        'bairro': '',
        'cep': '',
        'cidade': '',
        'estado': '',
        'logradouro': '',
        'numero': ''
      },
      'nome': '',
      'site': '',
      'telefone': '',
      'texto_informativo': '',
      'Id': idEscola,
      'Link_Logo': ''
    };
    self.dadoAux = [];
    self.edition = false;
    self.logo = null;
    self.logoCortada = null;

    self.SalvarImagem = SalvarImagem;
    self.HandleFileSelect = HandleFileSelect;

    Activate();

    ////////////////

    function Activate() {
      GetDados();
      angular.element(document.querySelector('#logo')).on('change', HandleFileSelect);
    }

    function Atualizar() {
      serverService.Request('AtualizarDadosEscola', self.dado).then(function (resp) {
        self.edition = false;
        toastr.success('Infromações salvas!');
      });
    }

    function GetDados() {
      serverService.Request('AtualizarDadosEscola', { 'ObjectID': idEscola }).then(function (resp) {
        self.dado = self.dadoAux = resp[0];
      });
    }

    function HandleFileSelect(evt) {
      var file = evt.currentTarget.files[0];
      var reader = new FileReader();

      reader.onload = function (evt) {
        $scope.$apply(function () {
          self.logo = evt.target.result;
        });
      };
      reader.readAsDataURL(file);

    }
    function SalvarImagem() {
      console.log(self.logoCortada);
      // $http({
      //   method: 'POST',
      //   url: 'http://52.23.250.176/webservice/WebServiceGDE.svc/UploadLogoEscola?id_escola=' + idEscola,
      //   transformRequest: RequestAsFormPost.TransformRequest,
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   },
      //   withCredentials: true,
      //   data: { stream: self.logoCortada }
      // }).then(function (resp) {
      //   console.log(resp);
      // });
    }
  }
})();
