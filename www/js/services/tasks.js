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
              type: data.type || null,
              category: data.category || null,
              dueDate: data.dueDate || null,
              archived: false,
              subTasks: null
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

    function getTasksByUser(userId) {
      var userTasks = firebase.child('users/' + userId + '/tasks')
      return $firebaseArray(userTasks).$loaded()
    }

    function getTask(userId, taskId) {
      var task = firebase.child('users/' + userId + '/tasks/' + taskId)
      return $firebaseObject(task).$loaded()
    }

    // function archiveTask(userId, taskId) {
    //   return users.getCurrentUser()
    //     .then(function(user) {
    //       return task.update({ archived: true }});
    // }

    return {
      create: createTask,
      listByUser: getTasksByUser,
      getTask: getTask
    }

  }
])
