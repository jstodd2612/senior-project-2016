angular.module('accordian', ['ionic'])

.controller('accordCtrl', function($scope) {
  $scope.groups = ['Samantha', 'Jerry', 'Kaylene', 'Finch'];

  for (var i=0; i<$scope.groups.length; i++) {
    // console.log($scope.groups[i]);
    $scope.groups[i] = {
      name: $scope.groups[i],
      items: ['item1']
    };
    // console.log($scope.groups[i]);
    for (var j=0; j<0; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }

  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

});
