angular.module('juvo-api.view', [
  'juvo-api',
  'ionic'
])
.directive('taskListing', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      user: '=',
      tasks: '=',
      interface: '=',
      showCreate: '=',
      createTemplate: '@',
      type: '@'
    },
    templateUrl: 'templates/directives/task-listing.html',
    controller: [
      '$scope',
      '$ionicModal',
      'juvoTasks',
      'juvoUsers',
      function($scope, $ionicModal, tasks, users) {

        $scope.$watch('showCreate', function(val) {
          if (val) {
            $scope.createModal.show()
          }
        })

        $scope.interface = {
          showModel: function() {
            console.log('hello')
          }
        }

        $scope.createForm = {
          subTasks: []
        }

        $scope.editableSubTasks = {

        }

        $ionicModal.fromTemplateUrl($scope.createTemplate, {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.createModal = modal
        })

        $scope.handleCreateSubmit = function() {
          $scope.createForm.type = $scope.type
          $scope.createForm.error = null
          tasks.assignTask($scope.user.id, $scope.createForm)
            .then(function(task) {
              $scope.tasks.push(task)
              $scope.createForm = {
                subTasks: []
              }
              $scope.createModal.hide()
            })
            .catch(function(response) {
              $scope.createForm.error = response.data.message
            })
        }

        $scope.handleDeleteSubmit = function(taskToDelete) {
          tasks.deleteTask($scope.user.id, taskToDelete.id)
            .then(function() {
              $scope.tasks = $scope.tasks.filter(function(task) {
                return task.id !== taskToDelete.id
              })
            })
        }

        $scope.updateTodo = function(todo) {
          tasks.updateTask($scope.user.id, todo.id, todo)
        }

        $scope.handleArchiveSubmit = function(taskToArchive) {
          $scope.updateTodo({ id: taskToArchive.id, archived: true })
            .then(function() {
              $scope.tasks = $scope.tasks.filter(function(task) {
                return task.id !== taskToArchive.id
              })
            })
        }

        $scope.addCreateSubTask = function(title) {
          $scope.createForm.subTasks.push({
            title: title
          })
          $scope.createForm.newSubTask = ''
        }

        $scope.removeCreateSubTask = function(index) {
          $scope.createForm.subTasks.splice(index, 1)
        }

        $scope.makeSubTaskEditable = function(task, index, val) {
          $scope.editableSubTasks[task.id] = $scope.editableSubTasks[task.id] || {}
          $scope.editableSubTasks[task.id][index] = val
          $scope.updateTodo(task)
        }

      }
    ]
  }
})
