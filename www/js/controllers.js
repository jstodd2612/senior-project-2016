angular.module('juvo.controllers', [])

  .controller('HomeCtrl', function($scope, $ionicModal) {

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
  .controller('ViewTodosCtrl', function($scope, $ionicModal) {
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
  .controller('CreateShoppingCtrl', function($scope, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/shopping/create.html', {
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
  .controller('ViewShoppingCtrl', function($scope, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/shopping/view.html', {
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

    $ionicModal.fromTemplateUrl('templates/chores/create.html', {
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

  // HOMEWORK CONTROLLERS //

  .controller('HomeworkCtrl', function($scope) {
    $scope.homework = {
      children: ['Karen', 'Timothy', 'Samantha', 'Susan'],
      subject: ['English', 'Science', 'Math', 'History']
    }
  })
  .controller('CreateHomeworkCtrl', function($scope, $ionicModal, $controller) {
    angular.extend(this, $controller('HomeworkCtrl', {$scope: $scope}));

    $ionicModal.fromTemplateUrl('templates/homework/create.html', {
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

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('SettingsCtrl', function($scope, $controller) {
  angular.extend(this, $controller('LoginCtrl', {$scope: $scope}));
  $scope.settings = {
    enableFriends: false
  };
});
