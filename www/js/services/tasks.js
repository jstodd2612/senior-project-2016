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
            title: data.title,
            content: data.content,
            createdBy: user.id,
            assigned: data.assigned,
            type: data.type,
            category: data.category,
            dueDate: data.dueDate,
            completed: false,
            archived: false,
            quantity: data.quantity
          })
        })
        .then(function(newTask) {
          // You have the new task!
          return newTask
        })
    }

    function getTasksByUser(userId) {
      return $firebaseArray(tasks).$loaded()
        .then(function(arr) {
          // This is the array of tasks, but it returns all of them...
          // You'll have to filter them manually for now.
          return arr.filter(function(task) {
            return task.assigned === userId
          })
        })
    }

    return {
      create: createTask,
      listByUser: getTasksByUser
    }

  }
])
