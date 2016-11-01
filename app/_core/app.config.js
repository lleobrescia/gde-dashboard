(function () {
  'use strict';

  angular.module('dashboard')
    .run(Run);

  Run.$inject = ['$rootScope', 'session', '$route'];

  function Run($rootScope, session, $route) {
    $rootScope.$on('$routeChangeSuccess', ChangeSuccess);

    function ChangeSuccess() {
      $rootScope.$broadcast('restorestate');

      //Change page title, based on Route information
      $rootScope.title = $route.current.title;
    }
  }
})();
