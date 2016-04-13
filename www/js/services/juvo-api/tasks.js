angular
.module('juvo-api.tasks', [
  'juvo-api'
])
.service('juvoUsers', [
  '$http',
  'juvoApiHost',
  function($http, host) {

    function returnData(response) {
      return response.data
    }

    this.listByUser = function(userId) {
      return $http
        .get(host + '/users/' + userId + '/tasks')
        .then(returnData)
    }

    this.assignTask = function(userId, data) {
      return $http
        .post(host + '/users/' + userId + '/tasks', data)
        .then(returnData)
    }

    this.updateTask = function(userId, taskId, task) {
      return $http
        .post(host + '/users/' + userId + '/tasks/' + taskId, task)
        .then(returnData)
    }

  }
])
