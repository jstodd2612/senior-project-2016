angular.module('juvo.controllers', [])

.controller('HomeCtrl', function($scope, $ionicModal) {

  })
  .controller('HomeworkCtrl', function($scope) {

  })
  .controller('ChoresCtrl', function($scope, $ionicModal) {

  })
  .controller('ShoppingCtrl', function($scope, $ionicModal) {

  })

.controller('TodosCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

  })
  .controller('CreateHomeworkCtrl', function($scope, $ionicModal) {
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
  .controller('CreateChoresCtrl', function($scope, $ionicModal) {
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

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('SettingsCtrl', function($scope, $controller) {
  angular.extend(this, $controller('LoginCtrl', {$scope: $scope}));
  $scope.settings = {
    enableFriends: false
  };
});
