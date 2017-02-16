(function () {
  'use strict';

  angular
    .module('app.home')
    .factory('HomeService', function ($http, $window) {

      return {
        users: function (success, error) {
          return $http.get('/api/user', {headers: {token: $window.sessionStorage.token}}).then(function (response) {
            success(response);
          }, function (err) {
            error(err);
          });
        },

        delete: function (userId, success, error) {
          return $http.delete('/api/user/' + userId, {headers: {token: $window.sessionStorage.token}}).then(function (response) {
            success(response);
          }, function (err) {
            error(err);
          });
        }
      }

    });

})();
