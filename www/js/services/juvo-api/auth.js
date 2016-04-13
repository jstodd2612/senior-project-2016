angular
.module('juvo-api.auth', [
  'juvo-api'
])
.service('juvoAuth', [
  '$http',
  'juvoApiHost',
  function($http, host) {

    function returnData(response) {
      return response.data
    }

    this.login = function(email, password) {
      return $http
        .post(host + '/session', {
          email: email,
          password: password
        })
        .then(returnData)
    }

    this.current = function() {
      return $http
        .get(host + '/session')
        .then(returnData)
    }

    this.logout = function() {
      return $http
        .delete(host + '/session')
        .then(returnData)
    }

  }
])
