angular.module('tasksService', [
  'auth',
  'firebaseConfig',
])
.factory('tasks', ['auth', 'fbaseHost', '$firebaseArray', '$q', function(auth, host, $firebaseArray, $q) {
  var taskItems;

  function resetUser(authData) {
    console.log("Special Data Would go here");
    if (!authData) {
      if (taskItems) { taskItems.destroy(); }
      return taskItems = null;
    }
    taskItems = $firebaseArray(new Firebase(host + '/' + authData.uid + '/tasks'));
    console.log(taskItems);
  }
  resetUser(auth.currentUser);
  auth.onChange(resetUser);

  return {
    getItems: function() {
      return taskItems || [];
      console.log(taskItems);
    },
    addItem: function(item) {
      if (!taskItems) { return $q.reject(new Error('Could not add an item')); }
      return taskItems.$add(item);
    },
    removeItem: function(id) {
      if (!taskItems) { return $q.reject(new Error('Could not remove the item')); }
      return taskItems.$remove(id);
    },
    save: function(id) {
      if (!taskItems) { return $q.reject(new Error('Could not save the item')); }
      return taskItems.$save(id);
    },
  };

}]);
