(function () {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', function (LoginService, $window, $state) {
      var vm = this;
      vm.title = 'LOGIN PAGE';

      // vm.user = {email: "pedro"};

      vm.login = function (user) {
        LoginService.login(user, function (response) {
          console.log('success: ', response);
          $window.sessionStorage.token = response.data.token;
          toastr.success('Welcome');
          $state.go('home');
        }, function (error) {
          console.log('error: ', error);
          toastr.error(error.data.error);
        });
      };

      vm.create = function (user) {
        LoginService.create(user, function (response) {
          console.log('success: ', response);
          $window.sessionStorage.token = response.data.token;
          toastr.success('Account created successfully');
          $state.go('home');
        }, function (error) {
          console.log('error: ', error.data.error);
          if (error.data.error.code === 11000) {
            toastr.error('User already registered');
          }
        });
      }
    });

})();
