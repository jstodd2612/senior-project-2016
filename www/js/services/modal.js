angular.module('modal', [])
.directive('modal', ['$rootScope', '$ionicModal', function($rootScope, $ionicModal) {
  return {
    restrict: 'E',
    scope: {
      template: '@',
      animation: '@',
      show: '='
    },
    link: function(scope, elem) {
      var modal
      $ionicModal.fromTemplateUrl(scope.template, {
        scope: scope.$parent,
        animate: scope.animate
      }).then(function(data) {
        modal = data
      })
      scope.$on('$destroy', $rootScope.$on('$ionicView.beforeLeave', function() { modal.hide() }));
      // Listen to scope destroy events
      scope.$on('$destroy', function() { modal.remove() });
      scope.$watch('show', function(show) {
        console.log(show)
        if (!modal) return
        var method = show ? 'show' : 'hide'
        modal[method]()
      });
      scope.$on('modal.hidden', function() {
        console.log('hiding and setting to false')
        scope.show = false
      })
    }
  }
}])
