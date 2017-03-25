route.$inject = ['$stateProvider'];

export default function route($stateProvider) {
    $stateProvider
        .state('login', {
            template: require('./login.html'),
            controller: 'LoginController as vm'
        });
};
