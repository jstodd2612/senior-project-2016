angular.module('addButt', ['ionic'])

.controller('addButtCtrl', function($scope, $ionicModal) {


  $ionicModal.fromTemplateUrl('../../templates/buttModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


});
