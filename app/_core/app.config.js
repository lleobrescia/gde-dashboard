(function () {
  'use strict';

  angular.module('dashboard')
    .run(Run);

  Run.$inject = ['$rootScope', 'session', '$state'];

  function Run($rootScope, session, $state) {
    $rootScope.$on('$stateChangeSuccess', ChangeSuccess);

    function ChangeSuccess() {
      $rootScope.$broadcast('restorestate');

      //Change page title, based on Route information
      $rootScope.title = $state.current.title;
    }
  }
})();
