angular.module('juvo.controllers')
.controller('LoginCtrl', [
  '$scope',
  'auth',
  'users',
  '$location',
  function($scope, auth, $location) {

    $scope.errorMessage = '';

    $scope.login = function(provider) {
      if (!provider) { return; }

      auth.$authWithOAuthPopup(provider)
        .then(function(authData) {
          $location.path('/#/tab/home');
        })
        .catch(function(error) {
          console.log(error);
        });
    };

    $scope.logout = function() {
      auth.$unauth()
        // .then(function() {
        //   console.log(authData);
        //   $location.path('/#/login');
        // })
        // .catch(function(error) {
        //   console.log(error);
        // });
    };

  }
]);
