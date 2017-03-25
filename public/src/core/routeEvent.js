routeEvent.$inject = ['$rootScope', '$auth', '$state'];

export default function routeEvent($rootScope, $auth, $state) { 
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
        if (toState.name != 'login' && !$auth.isAuthenticated() && toParams.needAuthenticate) {
            event.preventDefault();
            $state.go('login');
        }
        console.log(toState);
    });
}
