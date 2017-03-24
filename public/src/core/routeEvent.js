routeEvent.$inject = ['$rootScope'];

export default function routeEvent($rootScope) { 
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
 
    });
}
