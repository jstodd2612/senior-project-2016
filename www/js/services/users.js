angular.module('users', [
  'firebaseConfig',
  'auth',
])
.service('users', [
  'firebaseInstance',
  'auth',
  function(firebase, auth) {

    var users = firebase.child('users')

    console.log(users)

    this.initUser = function initUser() {
      var authData = auth.getAuth()
    }

  }
])
