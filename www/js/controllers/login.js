angular.module('juvo.controllers')
.controller('LoginCtrl', [
  '$scope',
  'auth',
  function($scope, auth) {

    $scope.errorMessage = '';

    $scope.login = function(provider) {
      if (!provider) { return; }

      auth.$authWithOAuthPopup(provider)
        .then(function(authData) {
          console.log(authData);
        })
        .catch(function(error) {
          console.log(error);
        });
    };

  }
])