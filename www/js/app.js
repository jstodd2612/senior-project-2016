// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('juvo', [
  'ionic',
  'juvo.controllers',
  'juvo-api',
  'accordian'
])

.run(function($ionicPlatform, $rootScope, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    switch (error.type) {
      case 'AUTH_REQUIRED': $state.go('login'); break
      case 'FORBIDDEN': $state.go('home'); break
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  var requireAuth = function(role) {
    return ['juvoAuth', function(auth) {
      return auth.current()
        .then(function(user) {
          if (role && user.role !== role) {
            var error = new Error('You do not have access to this page')
            error.type = 'FORBIDDEN'
            throw error
          }
          return user
        })
        .catch(function(err) {
          if (!err.type) {
            err.type = 'AUTH_REQUIRED'
          }
          throw err
        })
    }]
  }
  var familyMembers = ['juvoUsers', function(users) {
    return users.list()
  }]
  $ionicConfigProvider.tabs.position('bottom');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('login', {
    url: '/login',
    controller: 'LoginCtrl',
    // abstract: true,
    templateUrl: 'templates/login.html'
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'home': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl',
        resolve: {
          currentAuth: requireAuth(),
          members: familyMembers
        }
      }
    }
  })

//----HOMEWORK ROUTING----//

  .state('tab.homework', {
    abstract: true,
    url: '/homework',
    views: {
      'homework': {
        template: '<ion-nav-view></ion-nav-view>',
        resolve: {
          currentAuth: requireAuth()
        }
      }
    }
  })
  .state('tab.homework.index', {
    url: '',
    templateUrl: 'templates/homework/index.html',
    controller: 'HomeworkCtrl',
    resolve: {
      currentAuth: requireAuth(),
      members: ['juvoTasks', 'juvoUsers', '$q', function(tasks, users, $q) {
        return users.list().then(function(members){
          return $q.all(members.map(function(member){
            return tasks.listByUser(member.id).then(function(memberTasks){
              member.homework = memberTasks.filter(function(memberTasks){
                return memberTasks.type === 'homework'
              })
              return member
            })
          }))
        })
      }]
    }
  })
  .state('tab.homework.view', {
    url: '/view',
    // resolve: {
    //   selectedTask: function($stateParams, tasks, users) {
    //     return user
    //       .getCurrentUser()
    //       .then(function(user) {
    //         return tasks.getTask(user.id, $stateParams.id)
    //       })
    //   },
    // },
    templateUrl: 'templates/homework/view.html',
  })
  .state('tab.homework.childView', {
    url: '/childView',
    templateUrl: 'templates/homework/childView.html',
    controller: 'HomeworkCtrl'
  })


  //----TODOS ROUTING----//

  .state('tab.todos', {
    abstract: true,
    url: '/todos',
    views: {
      'todos': {
        template: '<ion-nav-view></ion-nav-view>',
        resolve: {
          currentAuth: requireAuth()
        }
      }
    }
  })

  .state('tab.todos.index', {
    url: '',
    templateUrl: 'templates/todos/index.html',
    controller: 'TodosCtrl',
    resolve: {
      currentAuth: requireAuth(),
      todos: ['juvoTasks', 'juvoAuth', function(tasks, auth) {
        return auth.current()
          .then(function(user) {
            return tasks.listByUser(user.id)
          })
          .then(function(tasks) {
            return tasks.filter(function(task) {
              return task.type === 'todo'
            })
          })
      }]
    }
  })
  .state('tab.todos.view', {
    url: '/view',
    templateUrl: 'templates/todos/view.html',
    controller: 'TodosCtrl'
  })

//----SHOPPING ROUTING----//

  .state('tab.shopping', {
    abstract: true,
    url: '/shopping',
    views: {
      'shopping': {
        template: '<ion-nav-view></ion-nav-view>',
        resolve: {
          currentAuth: requireAuth()
        }
      }
    }
  })

  .state('tab.shopping.index', {
    url: '',
    templateUrl: 'templates/shopping/index.html',
    controller: 'ShoppingCtrl',
    resolve: {
      currentAuth: requireAuth(),
      shoppingLists: ['juvoTasks', 'juvoAuth', function(tasks, auth) {
        return auth.current()
          .then(function(user) {
            return tasks.listByUser(user.id)
          })
          .then(function(tasks) {
            return tasks.filter(function(task) {
              return task.type === 'shopping'
            })
          })
      }]
    }
  })
  .state('tab.shopping.view', {
    url: '/view',
    templateUrl: 'templates/shopping/view.html',
    controller: 'ShoppingCtrl'
  })


//----CHORES ROUTING----//

  .state('tab.chores', {
    abstract: true,
    url: '/chores',
    views: {
      'chores': {
        template: '<ion-nav-view></ion-nav-view>',
        resolve: {
          currentAuth: requireAuth()
        }
      }
    }
  })

  .state('tab.chores.index', {
    url: '',
    templateUrl: 'templates/chores/index.html',
    controller: 'ChoresCtrl',
    resolve: {
      currentAuth: requireAuth(),
      members: ['juvoTasks', 'juvoUsers', '$q', function(tasks, users, $q) {
        return users.list().then(function(members) {
          return $q.all(members.map(function(member) {
            return tasks.listByUser(member.id).then(function(memberTasks) {
              member.chores = memberTasks.filter(function(memberTask) {
                return memberTask.type === 'chore'
              })
              return member
            })
          }))
        })
      }]
    }
  })
  .state('tab.chores.view', {
    url: '/view/{userId}&{taskId}',
    templateUrl: 'templates/chores/view.html',
    resolve: {
      currentAuth: requireAuth(),
      selectedtask: function(tasks, $stateParams, juvoAuth) {
        return juvoAuth.current()
          .then(function(user) {
            return tasks.getTask($stateParams.userId, $stateParams.taskId)
          })
      }
    }
    // controller: 'ChoresCtrl'
  })

//----CHORES ROUTING----//

  .state('tab.notifications', {
    abstract: true,
    url: '/notifications',
    views: {
      'notifications': {
        template: '<ion-nav-view></ion-nav-view>',
        resolve: {
          currentAuth: requireAuth()
        }
      }
    }
  })

  .state('tab.notifications.index', {
    url: '',
    templateUrl: 'templates/notifications/index.html',
    controller: 'NotifyCtrl'
  })
  .state('tab.notifications.view', {
    url: '/view',
    templateUrl: 'templates/notifications/view.html',
    controller: 'NotifyCtrl'
  })

  .state('tab.settings', {
    abstract: true,
    url: '/settings',
    views: {
      'settings': {
        template: '<ion-nav-view></ion-nav-view>',
        resolve: {
          currentAuth: requireAuth()
        }
      }
    }
  })
  .state('tab.settings.index', {
    url: '',
    templateUrl: 'templates/settings/index.html',
    controller: 'SettingsCtrl'
  })
  .state('tab.settings.editUsers', {
    url: '/editUsers',
    templateUrl: 'templates/settings/editUsers.html',
    controller: 'SettingsUserCtrl',
    resolve: {
      currentAuth: requireAuth(),
      members: familyMembers,
      invites: ['juvoUsers', function(users) {
        return users.listInvites()
      }]
    }
  })
  .state('tab.settings.termsAndCond', {
    url: '/termsAndCond',
    templateUrl: 'templates/settings/termsAndCond.html',
    controller: 'SettingsCtrl'
  })
  .state('tab.settings.help', {
    url: '/help',
    templateUrl: 'templates/settings/help.html',
    controller: 'SettingsCtrl'
  })
  .state('tab.settings.personalSettings', {
    url: '/personalSettings',
    templateUrl: 'templates/settings/personalSettings.html',
    controller: 'SettingsCtrl'
  })
  .state('tab.settings.notifications', {
    url: '/notificationSettings',
    templateUrl: 'templates/settings/notificationSettings.html',
    controller: 'SettingsCtrl'
  })




  // console.log("Ran the stateProvider");
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('tab/home');

});
