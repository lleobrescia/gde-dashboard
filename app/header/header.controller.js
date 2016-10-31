(function () {
  'use strict';

  angular
    .module('dashboard')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$location'];
  function HeaderController($location) {
    var self = this;

    self.IsActive = IsActive;

    ////////////////

    function IsActive(viewLocation) {
      return viewLocation === $location.path();
    }
  }
})();
