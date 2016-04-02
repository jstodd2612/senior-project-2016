angular.module('juvo.controllers', [])

.controller('HomeCtrl', function($scope, $ionicModal) {})
.controller('HomeworkCtrl', function($scope) {

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
.controller('ChoresCtrl', function($scope, $ionicModal) {
  
})
.controller('ShoppingCtrl', function($scope, $ionicModal) {})

.controller('TodosCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: false
  };
});
