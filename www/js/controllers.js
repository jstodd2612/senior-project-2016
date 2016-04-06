angular.module('juvo.controllers', [])

  .controller('HomeCtrl', function($scope, $state, $controller) {
    $scope.settingsClick = function(){
      $state.go('settings');
    }
  })
  .controller('TestingCtrl', function($scope, $ionicModal) {

  })

  // TODOS CONTROLLERS //

  .controller('TodosCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});



  })
  .controller('CreateTodosCtrl', function($scope, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/todos/create.html', {
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
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
  })
  .controller('ViewTodosCtrl', function($scope, $ionicModal, $controller) {
    $ionicModal.fromTemplateUrl('templates/todos/view.html', {
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
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
  })

  // SHOPPING CONTROLLERS //

  .controller('ShoppingCtrl', function($scope, $ionicModal) {

  })
  .controller('CreateShoppingCtrl', function($scope, $ionicModal, $controller) {
  $scope.template = 'templates/shopping/create.html';
  angular.extend(this, $controller('appModalCtrl', {$scope: $scope}));
  })
  .controller('ViewShoppingCtrl', function($scope, $ionicModal, $controller) {
    $scope.template = 'templates/shopping/view.html';
    angular.extend(this, $controller('appModalCtrl', {$scope: $scope}));
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
    angular.extend(this, $controller('appModalCtrl', {$scope: $scope}));
  })

  // HOMEWORK CONTROLLERS //

  .controller('HomeworkCtrl', function($scope) {
    $scope.homework = {
      children: ['Karen', 'Timothy', 'Samantha', 'Susan'],
      subject: ['English', 'Science', 'Math', 'History'],
      assignments: ['History', 'Math', 'Music', 'Computers']
    }

    $scope.groups = [['Overdue', 'ThisWeek', 'NextWeek'],['Math:Section 4-7', 'Science : Volcano Project', 'History : Chapter 6']];

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
    angular.extend(this, $controller('appModalCtrl', {$scope: $scope}));
  })

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
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
  angular.extend(this, $controller('appModalCtrl', {$scope: $scope}));
})

.controller('LogoutCtrl', function($scope, $ionicModal, $controller) {
  angular.extend(this, $controller('SettingsCtrl', {$scope: $scope}));
  $scope.template = 'templates/settings/confirmLogout.html';
  angular.extend(this, $controller('appModalCtrl', {$scope: $scope}));
})

.controller('NotifyCtrl', function($scope, $ionicModal, $controller) {
  angular.extend(this, $controller('SettingsCtrl', {$scope: $scope}));
  $scope.template = 'templates/settings/confirmLogout.html';
  angular.extend(this, $controller('appModalCtrl', {$scope: $scope}));
})

.controller('appModalCtrl', function($scope, $ionicModal, $controller) {

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
