angular.module('juvo.controllers')
.controller('LoginCtrl', [
  '$scope',
  'auth',
  'users',
  '$location',
  'juvoAuth',
  function($scope, auth, users, $location, juvoAuth) {

    $scope.errorMessage = ''

    var scopeByProvider = {
      google: 'email',
      facebook: 'email'
    }

    $scope.login = function(provider) {
      if (!provider) { return }

      auth.$authWithOAuthPopup(provider, { scope: scopeByProvider[provider] })
        .then(function() {
          return users.initUser()
        })
        .then(function() {
          $location.path('/#/tab/home')
        })
        .catch(function(error) {
          console.log(error)
        })
    }

    $scope.login2 = function(email, password) {
      $scope.errorMessage = ''
      juvoAuth.login(email, password)
        .then(function() {
          $location.path('/#/tab/home')
        })
        .catch(function(response) {
          switch (response.status) {
            case 401:
              $scope.errorMessage = 'Email or Password was incorrect'
              break;
            case 400:
              $scope.errorMessage = 'Please fill in all fields'
              break;
            default:
              $scope.errorMessage = 'Something happened with our services. We are looking into it'
              console.log('login error', response)
          }
        })
    }

    $scope.logout = function() {
      auth.$unauth()
      $location.path('/#/login')
    }

  }
])
