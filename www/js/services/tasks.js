angular.module('tasks', [
  'firebaseConfig',
  'auth',
  'users'
])
.factory('tasks', [
  '$firebaseObject',
  '$firebaseArray',
  '$q',
  'firebaseInstance',
  'users',
  function($firebaseObject, $firebaseArray, $q, firebase, users) {

    function createTask(data) {
      return users.getCurrentUser()
        .then(function(user) {
          var userTasks = firebase.child('users/' + user.id + '/tasks')
          var $userTasks = $firebaseArray(userTasks)
          return $userTasks
            .$add({
              title: data.title || null,
              createdBy: user.id,
              type: data.type,
              category: data.category || null,
              dueDate: data.dueDate || null,
              archived: false,
              subTasks: data.subTasks || null
            })
            .then(function(task) {
              var subTasks = userTasks.child(task.key() + '/subTasks')
              var $subTasks = $firebaseArray(subTasks)
              var inputSubTasks = data.subTasks || []
              return $q
                .all(inputSubTasks.map(function(subTask, i) {
                  subTask.order = 'order' in subTask ? subTask.order : i
                  subTask.completed = subTask.completed || false
                  return $subTasks.$add(subTask)
                }))
                .then(function () {
                  return $userTasks.$getRecord(task.key())
                })
            })
        })
        .then(function(newTask) {
          return newTask.$value
        })
    }

    function updateTask() {
      // TODO
    }

    function getTasksByUser(userId, type) {
      var userTasks = firebase.child('users/' + userId + '/tasks')
      return $firebaseArray(userTasks).$loaded()
        .then(function(arr) {
          // This is the array of tasks, but it returns all of them...
          // You'll have to filter them manually for now.
          return arr.filter(function(userTask) {
            return userTask.createdBy === userId && userTask.type === type && userTask.archived === false
          })
        })
    }

    // function archiveTask(userId, taskId) {
    //   return users.getCurrentUser()
    //     .then(function(user) {
    //       return task.update({ archived: true }});
    // }

    return {
      create: createTask,
      listByUser: getTasksByUser
    }

  }
])
