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

    self.Atualizar = Atualizar;
    self.CancelarEdicao = CancelarEdicao;
    self.UploadImage = UploadImage;

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

    function CancelarEdicao() {
      self.dado = self.dadoAux;
      self.edition = false;
    }

    function DataURItoBlob(dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {
        type: mimeString
      });
    }

    function GetDados() {
      serverService.Request('RetornarDadosEscolas', { 'ObjectID': idEscola }).then(function (resp) {
        self.dado = self.dadoAux = resp[0];
        console.log(self.dado);
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

    function UploadImage() {
      var fd = new FormData();
      var imgBlob = DataURItoBlob(self.logoCortada);
      fd.append('stream', imgBlob);
      $http.post(
        'http://52.23.250.176/webservice/WebServiceGDE.svc/UploadLogoEscola?id_escola=' + idEscola,
        fd, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined
          }
        }
      )
        .success(function (response) {
          console.log('success', response);
        })
        .error(function (response) {
          console.log('error', response);
        });
    }
  }
})();
