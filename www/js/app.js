// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('juvo', [
  'ionic',
  'auth',
  'users',
  'juvo.controllers',
  'juvo.services',
  'juvo-api',
  'tasks',
  'accordian',
  'addButt',
  'jvmodal'
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
    if (error === 'AUTH_REQUIRED') { $state.go('login'); }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  var requireAuth = ['juvoAuth', function(auth) {
    return auth.current();
  }];
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
          currentAuth: requireAuth,
          members: ['juvoUsers', function(users) {
            return users.list()
          }]
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
          currentAuth: requireAuth
        }
      }
    }
  })
  .state('tab.homework.index', {
    url: '',
    templateUrl: 'templates/homework/index.html',
    controller: 'HomeworkCtrl'
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
          currentAuth: requireAuth
        }
      }
    }
  })

  .state('tab.todos.index', {
    url: '',
    templateUrl: 'templates/todos/index.html',
    controller: 'TodosCtrl'
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
          currentAuth: requireAuth
        }
      }
    }
  })

  .state('tab.shopping.index', {
    url: '',
    templateUrl: 'templates/shopping/index.html',
    controller: 'ShoppingCtrl'
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
          currentAuth: requireAuth
        }
      }
    }
  })

  .state('tab.chores.index', {
    url: '',
    templateUrl: 'templates/chores/index.html',
    controller: 'ChoresCtrl'
  })
  .state('tab.chores.view', {
    url: '/view',
    templateUrl: 'templates/chores/view.html',
    controller: 'ChoresCtrl'
  })

//----CHORES ROUTING----//

  .state('tab.notifications', {
    abstract: true,
    url: '/notifications',
    views: {
      'notifications': {
        template: '<ion-nav-view></ion-nav-view>',
        resolve: {
          currentAuth: requireAuth
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
          currentAuth: requireAuth
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
    controller: 'SettingsCtrl'
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
