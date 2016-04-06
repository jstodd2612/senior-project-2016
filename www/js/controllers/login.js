angular.module('juvo.controllers')
.controller('LoginCtrl', [
  '$scope',
  'auth',
  'users',
  '$location',
  function($scope, auth, users, $location) {

    $scope.errorMessage = ''

    var scopeByProvider = {
      google: 'email',
      facebook: 'email'
    }

    $scope.login = function(provider) {
      if (!provider) { return }

      auth.$authWithOAuthPopup(provider, { scope: scopeByProvider[provider] })
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
