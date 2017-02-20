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
          login(response, 'Welcome');
        }, function (error) {
          console.log('error: ', error);
          toastr.error(error.data.error);
        });
      };

      vm.create = function (user) {
        LoginService.create(user, function (response) {
          login(response, 'Account created successfully');
        }, function (error) {
          console.log('error: ', error.data.error);
          if (error.data.error.code === 11000) {
            toastr.error('User already registered');
          }
        });
      };

      function login(response, message) {
        console.log('success: ', response);
        LoginService.setUser(response.data.email, response.data.token);
        toastr.success(message);
        $state.go('home');
      }

    });


})();
