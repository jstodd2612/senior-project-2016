angular.module('juvo.controllers', ['users'])

.controller('HomeCtrl', function($scope, $state, $controller) {
    $scope.settingsClick = function() {
      $state.go('settings');
    }
  })
  .controller('TestingCtrl', function($scope, $ionicModal) {

  })

// TODOS CONTROLLERS //

.controller('TodosCtrl', function($http, $scope, tasks, $controller) {
    angular.extend(this, $controller('UserCtrl', {$scope: $scope}));
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.getTasks = function(){
      tasks.listByUser($scope.currentUser.id, 'todo')
        .then(function(arr){
          $scope.todos = arr
        })
    }

    $scope.$on('$ionicView.enter', function() {
      $scope.getTasks();
    })

    $scope.createForm = {}

    $scope.handleCreateSubmit = function() {
      $scope.createForm.type = 'todo'
      $scope.closeModal()
      tasks.create($scope.createForm)
        .then(function() {
          $scope.createForm = {}
        })
      $scope.doRefresh();
    }

    $scope.doRefresh = function() {
    $http.get('/todos')
     .success(function() {
       $scope.getTasks()
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };



  })
  .controller('CreateTodosCtrl', function($scope, $ionicModal, $controller) {
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

.controller('ShoppingCtrl', function($scope, tasks, $controller) {
  $scope.taskType = 'shopping'
  angular.extend(this, $controller('UserCtrl', {$scope: $scope}))

  $scope.getTasks = function(){
    tasks.listByUser($scope.currentUser.id, $scope.taskType)
      .then(function(arr){
        $scope.shopping = arr
      })
  }

  $scope.$on('$ionicView.enter', function() {
    $scope.getTasks();
    // console.log($scope.createForm);
  })

  $scope.createForm = {}

  $scope.handleCreateSubmit = function() {
    // console.log($scope.createForm);
    $scope.createForm.type = $scope.taskType
    // $scope.closeModal()
    tasks.create($scope.createForm)
      .then(function() {
        $scope.createForm = {}
      })
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

.controller('ChoresCtrl', function($scope) {
    $scope.chores = {
      children: ['Karen', 'Timothy', 'Samantha', 'Susan'],
      jobs: ['Sweep', 'Clean', 'Dishes', 'Vacuum'],
      rooms: ['Kitchen', 'Bathrooms', 'Bedrooms', 'Backyard'],
      days: ['Sun', 'M', 'T', 'W', 'R', 'F', 'S']
    }
  })
  .controller('CreateChoresCtrl', function($scope, $ionicModal, $controller) {
    angular.extend(this, $controller('ChoresCtrl', {$scope: $scope}));
    $scope.template = 'templates/chores/create.html';
    angular.extend(this, $controller('AppModalCtrl', {$scope: $scope}));
  })

// HOMEWORK CONTROLLERS //

.controller('HomeworkCtrl', function($scope) {
    $scope.homework = {
      children: ['Haley', 'Jack'],
      subject: ['English', 'Science', 'Math', 'History'],
      assignments: ['History', 'Math', 'Music', 'Computers'],
      overdue: ['Math', 'English', 'Health']
    }
    $scope.haleyHomework = {
      Overdue: ['Math', 'English', 'Health'],
      ThisWeek: ['Science'],
      NextWeek: ['Dance']
    }

    $scope.groups = ['Overdue', 'ThisWeek', 'NextWeek'];

    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };
  })
  .controller('CreateHomeworkCtrl', function($scope, $ionicModal, $controller) {
    angular.extend(this, $controller('HomeworkCtrl', {$scope: $scope}));
    $scope.template = 'templates/homework/create.html';
    angular.extend(this, $controller('AppModalCtrl', {$scope: $scope}));
  })


.controller('SettingsCtrl', function($scope, $controller) {
    angular.extend(this, $controller('LoginCtrl', {$scope: $scope}));
    $scope.settings = {
      enableFriends: false
    };
  })
  .controller('SettingsUserCtrl', function($scope, $ionicModal, $controller) {
    angular.extend(this, $controller('SettingsCtrl', {$scope: $scope}));
    $scope.template = 'templates/settings/newUser.html';
    angular.extend(this, $controller('AppModalCtrl', {$scope: $scope}));
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

.controller('UserCtrl', function($scope, users) {
  $scope.currentUser = null
  users.getCurrentUser()
    .then(function(authData) {
      $scope.currentUser = authData
    })
})


.controller('AppModalCtrl', function($scope, $ionicModal, $controller) {

  $ionicModal.fromTemplateUrl($scope.template, {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })
  $scope.openModal = function() {
    $scope.modal.show()
  }
  $scope.closeModal = function() {
    $scope.modal.hide();
  }
  $scope.modalLogout = function() {
    $scope.modal.hide();
    logout();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  })
});
