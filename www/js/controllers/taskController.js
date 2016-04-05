angular.module('starter.controllers')
.controller('TaskCtrl', ['$scope', 'task', function($scope, task) {
  $scope.task = task;

  $scope.complete = function(index) {
    $scope.task[index].checked = true;
    task.save(index);
  };

  $scope.create = function(todo) {
    task.addItem(todo).then(function() {
      console.log('Todo created');
    });
  };

  $scope.remove = function(id) {
    task.removeItem(id).then(function() {
      console.log('Todo removed');
    });
  };

  $scope.save = function(id) {
    task.save(id).then(function() {
      console.log('Todo saved');
    });
  };

}]);
