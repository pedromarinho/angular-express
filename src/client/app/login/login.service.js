(function () {
  'use strict';

  angular
    .module('app.login')
    .factory('LoginService', function ($http, $window) {

      return {
        getUser: function () {
          return {
            email: $window.sessionStorage.email, token: $window.sessionStorage.token
          }
        },

        setUser: function (email, token) {
          $window.sessionStorage.email = email;
          $window.sessionStorage.token = token;
        },

        login: function (user, success, error) {
          return $http.put('/api/login', user).then(function (response) {
            success(response);
          }, function (err) {
            error(err);
          });
        },

        create: function (user, success, error) {
          return $http.post('/api/register', user).then(function (response) {
            success(response);
          }, function (err) {
            error(err);
          });
        },

        logout: function () {
          return $http({
            method: 'PUT',
            url: '/api/logout'
          }).then(function () {
            $window.sessionStorage.email = null;
            $window.sessionStorage.token = null;
            console.log('success logout');
          });
        }
      }

    });

})();
