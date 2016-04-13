angular
.module('juvo-api', [
  'juvo-api.auth',
  'juvo-api.users',
  'juvo-api.tasks'
])
.value('juvoApiHost', 'https://juvo-api.herokuapp.com/api/v1')
.config([
  '$httpProvider',
  function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }
])
