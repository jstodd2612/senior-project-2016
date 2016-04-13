angular.module('juvo.controllers')
.controller('LoginCtrl', [
  '$scope',
  'auth',
  'users',
  '$location',
  'juvoAuth',
  'juvoUsers',
  function($scope, auth, users, $location, juvoAuth, juvoUsers) {

    $scope.errorMessage = ''

    var scopeByProvider = {
      google: 'email',
      facebook: 'email'
    }

    $scope.signinType = 'login2'

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

    $scope.login2 = function(data) {
      $scope.errorMessage = ''
      return juvoAuth.login(data.email, data.password)
        .then(function() {
          $location.path('/#/tab/home')
        })
        .catch(function(response) {
          switch (response.status) {
            case 401:
              $scope.errorMessage = 'Email or Password was incorrect'
              break
            case 400:
              $scope.errorMessage = 'Please fill in all fields'
              break
            default:
              $scope.errorMessage = 'Something happened with our services. We are looking into it'
              console.log('login error', response)
              break
          }
        })
    }

    $scope.signup = function(data) {
      juvoUsers.create(data)
        .then(function(user) {
          return $scope.login2(data)
        })
        .catch(function(response) {
          switch (response.status) {
            case 400:
              $scope.errorMessage = response.data.message
              break
            default:
              $scope.errorMessage = 'Something happened with our services. We are looking into it'
              console.log('signup error', response)
              break
          }
        })
    }

    $scope.submit = function(type, data) {
      if (typeof $scope[type] !== 'function') {
        return console.log(type + ' is not a valid signinType')
      }
      $scope[type](data)
    }

    $scope.logout = function() {
      auth.$unauth()
      $location.path('/#/login')
    }

  }
])
