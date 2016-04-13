angular
.module('juvo-api', [
  'juvo-api.auth',
  'juvo-api.users',
  'juvo-api.tasks',
  'juvo-api.view'
])
.value('juvoApiHost', 'http://localhost:8000/api/v1')
// .value('juvoApiHost', 'https://juvo-api.herokuapp.com/api/v1')
.config([
  '$httpProvider',
  function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }
])
