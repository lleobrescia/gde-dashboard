(function () {
  'use strict';

  angular
    .module('dashboard')
    .service('UploadImgService', UploadImgService);

  UploadImgService.$inject = ['$http', 'toastr'];
  function UploadImgService($http, toastr) {
    this.UploadImage = UploadImage;

    ////////////////

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

    function UploadImage(img, url) {
      var retorno = 'Ok';
      var fd = new FormData();
      var imgBlob = DataURItoBlob(img);
      fd.append('stream', imgBlob);
      $http.post(
        url,
        fd, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined
          }
        }
      )
        .success(function (response) {
          toastr.success('Imagem enviada!');
        })
        .error(function (response) {
          console.error(response);
          toastr.error('Erro ao subir a imagem! Tente novamente mais tarde');
        });
    }
  }
})();
