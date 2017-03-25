export default function route($stateProvider) {
    $stateProvider
        .state('signup', {
            url: '/signup',
            controller: 'signupController as vm',
            template: require('./sign-up.html'),
            params: {
                needAuthticate: true
            }
        });
}

route.$inject = ['$stateProvider'];