// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('juvo', [
  'ionic',
  'auth',
  'juvo.controllers',
  'juvo.services',
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
    if (error === 'AUTH_REQUIRED') { $state.go('login'); }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  var requireAuth = ['auth', function(auth) {
    return auth.$requireAuth();
  }];

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
          currentAuth: requireAuth
        }
      }
    }
  })

  .state('tab.homework', {
    url: '/homework',
    views: {
      'homework': {
        templateUrl: 'templates/homework/index.html',
        controller: 'HomeworkCtrl',
        resolve: {
          currentAuth: requireAuth
        }
      }
    }
  })
  .state('tab.homework.create', {
    url:'/create',
    views: {
      'homeworkCreate' : {
        templateUrl: 'templates/homework/create.html',
        // template: '<h1>CREATE HOMEWORK!</h1>',
        // controller: function($scope){
        //   console.log("Not working!!!");
        // },
        resolve: {
          currentAuth: requireAuth
        }
      }
    }
  })
  // .state('tab.expand', {
  //   url:'/homework/expand',
  //   views: {
  //     'homework-expand' : {
  //       templateUrl: 'templates/homework/expand.html',
  //       resolve: {
  //         currentAuth: requireAuth
  //       }
  //     }
  //   }
  // })

  .state('tab.shopping', {
    url: '/shopping',
    views: {
      'shopping': {
        templateUrl: 'templates/shopping.html',
        controller: 'ShoppingCtrl',
        resolve: {
          currentAuth: requireAuth
        }
      }
    }
  })

  .state('tab.chores', {
    url: '/chores',
    views: {
      'chores': {
        templateUrl: 'templates/chores/index.html',
        controller: 'ChoresCtrl',
        resolve: {
          currentAuth: requireAuth
        }
      }
    }
  })
  .state('tab.chores.create', {
    url:'/create',
    views: {
      'choresCreate' : {
        templateUrl: 'templates/chores/create.html',
        // template: '<h1>CREATE HOMEWORK!</h1>',
        // controller: function($scope){
        //   console.log("Not working!!!");
        // },
        resolve: {
          currentAuth: requireAuth
        }
      }
    }
  })

  .state('tab.todos', {
      url: '/todos',
      views: {
        'todos': {
          templateUrl: 'templates/todos.html',
          controller: 'TodosCtrl',
          resolve: {
            currentAuth: requireAuth
          }
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-sub.html',
          controller: 'ChatDetailCtrl',
          resolve: {
            currentAuth: requireAuth
          }
        }
      }
    })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'settings': {
        templateUrl: 'templates/account-settings.html',
        controller: 'SettingsCtrl',
        resolve: {
          currentAuth: requireAuth
        }
      }
    }
  });
  console.log("Ran the stateProvider");
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('tab/home');

});
