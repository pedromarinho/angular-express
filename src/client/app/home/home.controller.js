(function () {
  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', function (HomeService, $state, LoginService) {
      var vm = this;
      vm.title = 'HOME PAGE';

      vm.user = LoginService.getUser().email;

      vm.getUsers = function () {
        HomeService.users(function (response) {
          vm.users = response.data;
        }, function (error) {
          $state.go('login');
          toastr.error(error.data);
        })
      };

      vm.deleteUser = function (userId) {
        HomeService.delete(userId, function () {
          vm.getUsers();
        }, function (error) {
          $state.go('login');
          toastr.error(error.data);
        })
      };

      vm.logout = function () {
        LoginService.logout().then(function () {
          $state.go('login');
        })
      }
    });
})();
