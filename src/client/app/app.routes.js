(function () {
  'use strict';

  angular.module('app', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");

    $stateProvider
      // .state('dashboard', {
      //   url: '/dashboard',
      //   templateUrl: 'app/dashboard/dashboard.html',
      //   controller: 'DashboardController',
      //   controllerAs: 'vm',
      //   title: 'dashboard',
      //   settings: {
      //     nav: 1,
      //     content: '<i class="fa fa-dashboard"></i> Dashboard'
      //   }
      // })

      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        title: 'Login'
      })

  });
})();
