(function () {
  'use strict';

  angular
    .module('app.login')
    .factory('LoginService', function ($http) {

      return {
        login: function (user, success, error) {
          return $http.put('/api/login', user).then(function (response) {
            success(response);
          }, function (err) {
            error(err);
          });
        },

        create: function (user, success, error) {
          return $http.post('/api/user', user).then(function (response) {
            success(response);
          }, function (err) {
            error(err);
          });
        }
      }

    });

})();
