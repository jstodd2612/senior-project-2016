angular.module('tasks', [
  'firebaseConfig',
  'auth',
  'users'
])
.factory('tasks', [
  '$firebaseObject',
  '$firebaseArray',
  'firebaseInstance',
  'users',
  function($firebaseObject, $firebaseArray, firebase, users) {

    var tasks = firebase.child('tasks')

    function createTask(data) {
      return users.getCurrentUser()
        .then(function(user) {
          return $firebaseArray(tasks).$add({
            title: data.title || null,
            content: data.content || null,
            createdBy: user.id,
            assigned: user.id || null,
            type: data.type,
            category: data.category || null,
            dueDate: data.dueDate || null,
            completed: false,
            archived: false,
            quantity: data.quantity || null
          })
        })
        .then(function(newTask) {
          return newTask
        })
    }

    function getTasksByUser(userId, type) {
      return $firebaseArray(tasks).$loaded()
        .then(function(arr) {
          // This is the array of tasks, but it returns all of them...
          // You'll have to filter them manually for now.
          return arr.filter(function(task) {
            return task.createdBy === userId && task.type === type && task.archived === false
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
