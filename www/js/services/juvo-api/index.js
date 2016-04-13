angular
.module('juvo-api', [
  'juvo-api.auth',
  'juvo-api.users',
  'juvo-api.tasks'
])
.value('juvoApiHost', 'http://localhost:8000/api/v1')
.config([
  '$httpProvider',
  function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }
])
