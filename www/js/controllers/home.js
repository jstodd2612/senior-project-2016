angular.module('juvo.controllers')
.controller('HomeCtrl', [
  '$scope',
  'members',
  'currentAuth',
  function($scope, members, currentAuth) {
    $scope.currentUser = currentAuth
    $scope.members = members
    $scope.taskTypes = [
      {
        label: 'Todos',
        value: 'todo'
      },
      {
        label: 'Shopping',
        value: 'shopping'
      },
      {
        label: 'Chores',
        value: 'chore'
      },
      {
        label: 'Homework',
        value: 'homework'
      }
    ]
    $scope.activeMembers = {}

    $scope.toggleActive = function(id) {
      $scope.activeMembers[id] = !$scope.activeMembers[id]
    }
  }
])
