angular.module('firebaseConfig', ['firebase'])
.constant('firebaseHost', 'https://dazzling-torch-81.firebaseio.com')
.factory('firebaseInstance', [
  'firebaseHost',
  function(firebaseHost) {
    return new Firebase(firebaseHost);
  }
]);
