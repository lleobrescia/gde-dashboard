(function () {
  'use strict';

  angular.module('dashboard')
    .run(Run);

  Run.$inject = ['$rootScope', 'session'];

  function Run($rootScope, session) {
    $rootScope.$on('$routeChangeStart', ChangeStart);
    $rootScope.$on('$routeChangeSuccess', ChangeSuccess);

    function ChangeStart() {
      $rootScope.$broadcast('savestate');
    }

    function ChangeSuccess() {
      $rootScope.$broadcast('restorestate');
    }
  }
})();