(function () {
  'use strict';

  angular.module('app', [
    'ui.router',
    'app.login',
    'app.home'
  ])

    .factory('sessionInjector', function ($window) {
      var sessionInjector = {
        request: function (config) {
          config.headers['email'] = $window.sessionStorage.email;
          config.headers['token'] = $window.sessionStorage.token;
          return config;
        }
      };
      return sessionInjector;
    })

    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push('sessionInjector');
    }]);


})();
