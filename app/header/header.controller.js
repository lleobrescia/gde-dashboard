/**
* Header Controller
* @namespace Controllers
*/
(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$location'];

  /**
  * @namespace HeaderController
  * @desc Controla os aspectos do cabecalho
  * @memberOf Controllers
  */
  function HeaderController($location) {
    var self = this;

    self.IsActive = IsActive;

    ////////////////

    /**
    * @namespace IsActive
    * @desc Verifica a pagina atual para adicionar a classe active ao menu
    * @memberOf Controllers.HeaderController
    */


    function IsActive(viewLocation) {
      var parent = $location.path().split('/');
      return viewLocation === parent[1];
    }
  }
})();
