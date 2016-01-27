angular.module('auth', ['firebaseConfig'])
.factory('auth', [
  'firebaseInstance',
  '$firebaseAuth',
  function(firebaseInstance, $firebaseAuth) {
    return $firebaseAuth(firebaseInstance);
  },
])
