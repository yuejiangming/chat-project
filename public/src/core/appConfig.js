appConfig.$inject = ['$locationProvider', '$urlRouterProvider'];

export default function appConfig($locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
};
