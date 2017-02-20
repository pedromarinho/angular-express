(function () {
  'use strict';

  angular
    .module('app.home')
    .factory('HomeService', function ($http) {

      return {
        users: function (success, error) {
          return $http.get('/api/user').then(function (response) {
            success(response);
          }, function (err) {
            error(err);
          });
        },

        delete: function (userId, success, error) {
          return $http.delete('/api/user/' + userId).then(function (response) {
            success(response);
          }, function (err) {
            error(err);
          });
        }
      }

    });

})();
