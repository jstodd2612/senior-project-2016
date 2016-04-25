angular.module('juvo.controllers', [])

.controller('TopCtrl', function($scope, $state, $controller) {
    $scope.settingsClick = function() {
      $state.go('settings');
    }
  })

// TODOS CONTROLLERS //

  .controller('TodosCtrl', function($state, $scope, $controller, currentAuth, todos, $ionicModal) {
    angular.extend(this, $controller('UserCtrl', {$scope: $scope}));
    $scope.todos = todos
    $scope.currentUser = currentAuth
    $scope.showCreate = false
    $scope.showModal = function() {
      $scope.showCreate = true
      setTimeout(function() {
        $scope.showCreate = false
      }, 0)
    }
  })
  .controller('CreateTodosViewCtrl', function($scope, $ionicModal, $controller) {
    angular.extend(this, $controller('TodosCtrl', {$scope: $scope}));
    $scope.template = 'templates/todos/create.html';
    angular.extend(this, $controller('AppModalCtrl', {$scope: $scope}));
  })
  .controller('ViewTodosCtrl', function($scope, $ionicModal, $controller) {
    angular.extend(this, $controller('TodosCtrl', {$scope: $scope}));
    $scope.template = 'templates/todos/view.html';
    angular.extend(this, $controller('AppModalCtrl', {$scope: $scope}));
  })

// SHOPPING CONTROLLERS //

.controller('ShoppingCtrl', function($state, $scope, $controller, currentAuth, shoppingLists, $ionicModal) {
  angular.extend(this, $controller('UserCtrl', {$scope: $scope}));
  $scope.shoppingLists = shoppingLists
  $scope.currentUser = currentAuth
  $scope.showCreate = false
  $scope.showModal = function() {
    $scope.showCreate = true
    setTimeout(function() {
      $scope.showCreate = false
    }, 0)
  }
})
  .controller('CreateShoppingCtrl', function($scope, $ionicModal, $controller) {
    $scope.template = 'templates/shopping/create.html';
    angular.extend(this, $controller('AppModalCtrl', {$scope: $scope}));
  })
  .controller('ViewShoppingCtrl', function($scope, $ionicModal, $controller) {
    $scope.template = 'templates/shopping/view.html';
    angular.extend(this, $controller('AppModalCtrl', {$scope: $scope}));
  })

// CHORES CONTROLLERS //

.controller('ChoresCtrl', function($scope, $ionicModal, $q, currentAuth, members, juvoTasks) {
    $scope.chores = {
      days: ['S', 'M', 'Tue', 'W', 'Th', 'F', 'Sat']
    }
    $scope.members = members
    $scope.activeMembers = {}
    $scope.createForm = {}

    $scope.toggleActive = function(id) {
      $scope.activeMembers[id] = !$scope.activeMembers[id]
    }

    $ionicModal.fromTemplateUrl('templates/chores/create.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.createModal = modal
    })

    $scope.handleCreateSubmit = function() {
      var assignedMembers = Object
        .keys($scope.createForm.assigned || {})
        .filter(function(memberId) {
          return $scope.createForm.assigned[memberId]
        })

      var promises = assignedMembers.map(function(memberId) {
        return juvoTasks
          .assignTask(memberId, {
            type: 'chore',
            title: $scope.createForm.title,
            meta: $scope.createForm.meta,
            subTasks: Object.keys($scope.createForm.subTasks).map(function(key) {
              return $scope.createForm.subTasks[key]
            })
          })
          .then(function(task) {
            var index = -1
            $scope.members.some(function(member, i) {
              if (member.id === memberId) {
                index = i
                return true
              }
              return false
            })
            if (index === -1) return
            $scope.members[index].chores.push(task)
          })
      })

      $q.all(promises)
        .then(function() {
          $scope.createModal.hide()
          $scope.createForm = {}
        })
    }
  })

// HOMEWORK CONTROLLERS //
.controller('HomeworkCtrl', function($scope, $ionicModal, $q, currentAuth, members, juvoTasks) {
  // $scope.homework = {
  //   subject: ['English', 'Science', 'Math', 'History'],
  //   group: ['History', 'Math', 'Music', 'Computers'],
  //   overdue: ['Math', 'English', 'Health']
  // }
  // $scope.haleyHomework = {
  //   Overdue: ['Math', 'English', 'Health'],
  //   ThisWeek: ['Science'],
  //   NextWeek: ['Dance']
  // }
    $scope.members = members
    $scope.activeMembers = {}
    $scope.createForm = {}

    $scope.toggleActive = function(id) {
      $scope.activeMembers[id] = !$scope.activeMembers[id]
    }

    $ionicModal.fromTemplateUrl('templates/homework/create.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.createModal = modal
    })

    $scope.handleCreateSubmit = function() {
      var assignedMembers = Object
        .keys($scope.createForm.assigned || {})
        .filter(function(memberId) {
          return $scope.createForm.assigned[memberId]
        })

      var promises = assignedMembers.map(function(memberId) {
        return juvoTasks
          .assignTask(memberId, {
            type: 'homework',
            title: $scope.createForm.title,
            meta: $scope.createForm.meta,
            subTasks: Object.keys($scope.createForm.subTasks).map(function(key) {
              console.log('Find the break - ln 158 controllers.js');
              return $scope.createForm.subTasks[key]
            })
          })
          .then(function(task) {
            console.log('Find the break - ln 163 controllers.js');
            var index = -1
            $scope.members.some(function(member, i) {
              if (member.id === memberId) {
                index = i
                return true
              }
              return false
            })
            if (index === -1) return
            $scope.members[index].homework.push(task)
          })
      })

      $q.all(promises)
        .then(function() {
          $scope.createModal.hide()
          $scope.createForm = {}
        })
    }
  })
// .controller('HomeworkCtrl', function($scope) {
//
//
//     $scope.groups = ['Overdue', 'ThisWeek', 'NextWeek'];
//
//     $scope.toggleGroup = function(group) {
//       if ($scope.isGroupShown(group)) {
//         $scope.shownGroup = null;
//       } else {
//         $scope.shownGroup = group;
//       }
//     };
//     $scope.isGroupShown = function(group) {
//       return $scope.shownGroup === group;
//     };
//   })



.controller('SettingsCtrl', function($scope, $controller) {
    angular.extend(this, $controller('LoginCtrl', {$scope: $scope}));
    $scope.settings = {
      enableFriends: false
    };
  })
  .controller('SettingsUserCtrl', function($scope, $ionicModal, $controller, juvoUsers, currentAuth, members, invites) {
    angular.extend(this, $controller('SettingsCtrl', {$scope: $scope}));
    $scope.template = 'templates/settings/newUser.html';
    angular.extend(this, $controller('AppModalCtrl', {$scope: $scope}));

    $scope.inviteForm = {
      email: ''
    }

    $scope.sendInvite = function(email) {
      console.log($scope.inviteForm.email)
      juvoUsers.invite(email)
        .then(function(invite) {
          $scope.inviteForm.email = ''
          $scope.closeModal()
          $scope.invites.push(invite)
        })
        .catch(function(err) {
          $scope.inviteForm.email = ''
          console.log('error in inviting')
          $scope.closeModal()
        })
    }

    $scope.currentAuth = currentAuth
    $scope.members = members
    $scope.invites = invites
  })

.controller('LogoutCtrl', function($scope, $ionicModal, $controller) {
  angular.extend(this, $controller('SettingsCtrl', {
    $scope: $scope
  }));
  $scope.template = 'templates/settings/confirmLogout.html';
  angular.extend(this, $controller('AppModalCtrl', {
    $scope: $scope
  }));
})

.controller('NotifyCtrl', function($scope, $ionicModal, $controller) {
  angular.extend(this, $controller('SettingsCtrl', {$scope: $scope}));
  $scope.template = 'templates/settings/confirmLogout.html';
  angular.extend(this, $controller('AppModalCtrl', {$scope: $scope}));
})

.controller('UserCtrl', function($scope) {
  // $scope.currentUser = null
  // users.getCurrentUser()
  //   .then(function(authData) {
  //     $scope.currentUser = authData
  //   })
})


.controller('AppModalCtrl', function($scope, $ionicModal, $controller, juvoAuth) {

  $ionicModal.fromTemplateUrl($scope.template, {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })
  $scope.openModal = function(taskId) {
    $scope.modal.show()
    $scope.taskId = taskId
  }
  $scope.closeModal = function(taskId) {
    $scope.modal.hide();
    $scope.taskId = taskId
  }
  $scope.modalLogout = function() {
    $scope.modal.hide();
    juvoAuth.logout()
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  })
});
