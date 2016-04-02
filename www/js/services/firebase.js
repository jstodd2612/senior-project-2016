angular.module('firebaseConfig', ['firebase'])
.constant('fbaseHost', 'https://dazzling-torch-81.firebaseio.com')
.factory('firebaseInstance', [
  'fbaseHost',
  function(fbaseHost) {
    return new Firebase(fbaseHost);
  }
]);
