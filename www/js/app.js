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
//   .state('tab.homework', {
//   abstract: true,
//   url: '/homework',
//   views: {
//     'homework': {
//       template: '<ion-nav-view></ion-nav-view>'
//     }
//   }
// })
//   .state('tab.homework.index', {
//     url: '',
//     views: {
//       'homework': {
//         templateUrl: 'templates/homework/index.html',
//         controller: 'HomeworkCtrl',
//         resolve: {
//           currentAuth: requireAuth
//         }
//       }
//     }
//   })
//   .state('tab.homework.create', {
//     url:'/create',
//     views: {
//       'homeworkCreate' : {
//         templateUrl: 'templates/homework/create.html',
//         resolve: {
//           currentAuth: requireAuth
//         }
//       }
//     }
//   })

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
  .state('tab.homework.create', {
    url: '/create',
    templateUrl: 'templates/homework/create.html',
  })
  .state('tab.homework.view', {
    url: '/view',
    templateUrl: 'templates/homework/view.html',
  })



  // .state('tab.expand', {
  //   url:'/homework/expand',
  //   views: {
  //     'homework-expand' : {
  //       templateUrl: 'templates/homework/expand.html',
          //  template: '<h1>CREATE HOMEWORK!</h1>',
          //  controller: function($scope){
          //    console.log("Not working!!!");
          //  },
  //       resolve: {
  //         currentAuth: requireAuth
  //       }
  //     }
  //   }
  // })

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
  .state('tab.todos.create', {
    url: '/create',
    templateUrl: 'templates/todos/create.html',
    controller: 'TodosCtrl'
  })
  .state('tab.todos.view', {
    url: '/view',
    templateUrl: 'templates/todos/view.html',
    controller: 'TodosCtrl'
  })

  // .state('tab.shopping', {
  //   url: '/shopping',
  //   views: {
  //     'shopping': {
  //       templateUrl: 'templates/shopping.html',
  //       controller: 'ShoppingCtrl',
  //       resolve: {
  //         currentAuth: requireAuth
  //       }
  //     }
  //   }
  // })
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
  .state('tab.shopping.create', {
    url: '/create',
    templateUrl: 'templates/shopping/create.html',
    controller: 'ShoppingCtrl'
  })
  .state('tab.shopping.view', {
    url: '/view',
    templateUrl: 'templates/shopping/view.html',
    controller: 'ShoppingCtrl'
  })

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
  .state('tab.chores.create', {
    url: '/create',
    templateUrl: 'templates/chores/create.html',
    controller: 'ChoresCtrl'
  })
  .state('tab.chores.view', {
    url: '/view',
    templateUrl: 'templates/chores/view.html',
    controller: 'ChoresCtrl'
  })

  // .state('tab.chores', {
  //   url: '/chores',
  //   views: {
  //     'chores': {
  //       templateUrl: 'templates/chores/index.html',
  //       controller: 'ChoresCtrl',
  //       resolve: {
  //         currentAuth: requireAuth
  //       }
  //     }
  //   }
  // })
  // .state('tab.chores.create', {
  //   url:'/create',
  //   views: {
  //     'choresCreate' : {
  //       templateUrl: 'templates/chores/create.html',
  //       resolve: {
  //         currentAuth: requireAuth
  //       }
  //     }
  //   }
  // })

  // .state('tab.todos', {
  //     url: '/todos',
  //     views: {
  //       'todos': {
  //         templateUrl: 'templates/todos.html',
  //         controller: 'TodosCtrl',
  //         resolve: {
  //           currentAuth: requireAuth
  //         }
  //       }
  //     }
  //   })
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

  // .state('tab.settings', {
  //   url: '/settings',
  //   views: {
  //     'settings': {
  //       templateUrl: 'templates/settings/account-settings.html',
  //       controller: 'SettingsCtrl',
  //       resolve: {
  //         currentAuth: requireAuth
  //       }
  //     }
  //   }
  // })
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




  // console.log("Ran the stateProvider");
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('tab/home');

});
