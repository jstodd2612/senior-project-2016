angular.module('juvo.controllers')
.controller('LoginCtrl', [
  '$scope',
  'auth',
  '$location',
  function($scope, auth, $location) {

    $scope.errorMessage = '';

    $scope.login = function(provider) {
      if (!provider) { return; }

      auth.$authWithOAuthPopup(provider)
        .then(function(authData) {
          console.log(authData);
          $location.path('/#/home');
        })
        .catch(function(error) {
          console.log(error);
        });
    };

    $scope.logout = function() {
      // if (!auth) { return; }
      console.log("Logout Ran...");
      auth.$unauth()
        .then(function(authData) {
          console.log(authData);
          $location.path('/#/login');
        })
        .catch(function(error) {
          console.log(error);
        });
    };

  }
]);
