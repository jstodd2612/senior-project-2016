angular.module('juvo.controllers')
.controller('LoginCtrl', [
  '$scope',
  'auth',
  'users',
  '$location',
  function($scope, auth, users, $location) {

    $scope.errorMessage = ''

    $scope.login = function(provider) {
      if (!provider) { return }

      auth.$authWithOAuthPopup(provider)
        .then(function(authData) {
          return users.initUser()
        })
        .then(function() {
          $location.path('/#/tab/home')
        })
        .catch(function(error) {
          console.log(error)
        })
    }

    $scope.logout = function() {
      auth.$unauth()
      $location.path('/#/login')
    }

  }
])
