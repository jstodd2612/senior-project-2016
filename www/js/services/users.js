angular.module('users', [
  'firebaseConfig',
  'auth',
])
.service('users', [
  '$firebaseObject',
  '$firebaseArray',
  'firebaseInstance',
  'auth',
  function($firebaseObject, $firebaseArray, firebase, auth) {

    var family = firebase.child('families')
    var users = firebase.child('users')

    this.initUser = function initUser() {
      var authData = auth.$getAuth()
      var userPath = users.child(authData.uid)
      var user = $firebaseObject(userPath)

      return user.$loaded()
        .then(function() {
          if (user.family) return

          return $firebaseArray(family)
            .$add({ name: 'testFamily' })
            .catch(function(err) {
              console.log('foobar', err)
              throw err
            })
            .then(function(ref) {
              var id = ref.key()
              user.family = id
              user.type = 'admin'
              switch (authData.provider) {
                case 'google':
                  user.name = authData.google.displayName
                  break
                case 'facebook':
                  user.name = authData.facebook.displayName
                  break
              }
              return user.$save()
            })
        })
    }

  }
])
