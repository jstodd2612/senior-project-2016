angular
.module('juvo-api.users', [
  'juvo-api'
])
.service('juvoUsers', [
  '$http',
  'juvoApiHost',
  function($http, host) {

    function returnData(response) {
      return response.data
    }

    this.create = function(data) {
      return $http
        .post(host + '/users', data)
        .then(returnData)
    }

    this.list = function(data) {
      return $http
        .get(host + '/users', data)
        .then(returnData)
    }

    this.update = function(id, data) {
      return $http
        .put(host + '/users/' + id, data)
        .then(returnData)
    }

    this.remove = function(id) {
      return $http
        .delete(host + '/users/' + id)
        .then(returnData)
    }

    this.invite = function(email) {
      return $http
        .post(host + '/invites', { email: email })
        .then(returnData)
    }

    this.listInvites = function() {
      return $http
        .get(host + '/invites')
        .then(returnData)
    }

    this.uninvite = function(id) {
      return $http
        .delete(host + '/invites/' + id)
        .then(returnData)
    }

    this.getFamily = function() {
      return $http
        .get(host + '/families/current')
        .then(returnData)
    }

  }
])
