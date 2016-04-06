angular.module('users', [
  'firebaseConfig',
  'auth',
])
.factory('users', [
  '$firebaseObject',
  '$firebaseArray',
  'firebaseInstance',
  'auth',
  function($firebaseObject, $firebaseArray, firebase, auth) {

    var invites = firebase.child('invites')
    var family = firebase.child('families')
    var users = firebase.child('users')

    function normalizeAuthData() {
      var authData = auth.$getAuth()
      var data = { id: authData.uid }

      switch (authData.provider) {
        case 'google':
          data.name = authData.google.displayName
          data.email = authData.google.email
          break;
        case 'facebook':
          data.name = authData.facebook.displayName
          data.email = authData.facebook.email
          break;
      }

      return data
    }

    function normalizeEmail(email) {
      return encodeURIComponent(email)
        .split('.')
        .join('%46')
    }

    function initUser() {
      var authData = normalizeAuthData()
      var user = $firebaseObject(users.child(authData.id))
      var lastName = authData.name.split(' ').pop()

      return user.$loaded().then(function() {
        if (user.family) return

        var newUserData = { name: authData.name }

        return hasInvite(authData.email)
          .then(function(invite) {
            if (invite) {
              newUserData.family = invite.family
              newUserData.type = invite.type
              return invite.$remove()
            } else {
              return $firebaseArray(family)
                .$add({ name: lastName + ' Family' })
                .then(function(ref) {
                  newUserData.family = ref.key()
                  newUserData.type = 'admin'
                })
            }
          })
          .then(function() {
            console.log(newUserData)
            user.family = newUserData.family
            user.type = newUserData.type
            user.name = newUserData.name
            return user.$save()
          })
      })
    }

    function hasInvite(email) {
      email = normalizeEmail(email)
      var invite = $firebaseObject(invites.child(email))

      return invite.$loaded().then(function() {
        console.log(invite)
        return invite.family ? invite : false
      })
    }

    function inviteUser(email, type) {
      type = type || 'user'
      email = normalizeEmail(email)
      var authData = normalizeAuthData()
      var user = $firebaseObject(users.child(authData.id))

      return user.$loaded()
        .then(function() {
          if (!user.family) throw new Error('User does not exist')
          var invite = $firebaseObject(invites.child(email))
          invite.family = user.family
          invite.type = type
          return invite.$save()
        })
    }

    return {
      initUser: initUser,
      inviteUser: inviteUser,
      getCurrentUser: normalizeAuthData
    }

  }
])
