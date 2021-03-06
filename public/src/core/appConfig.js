appConfig.$inject = ['$locationProvider', '$urlRouterProvider', '$authProvider'];

export default function appConfig($locationProvider, $urlRouterProvider, $authProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $authProvider.loginUrl = '/login';
    $authProvider.storageType = 'localStorage'
};
