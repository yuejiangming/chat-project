route.$inject = ['$stateProvider'];

export default function route($stateProvider) {
    $stateProvider
        .state('page', {
            template: require('./page.html'),
            controller: 'PageController as vm',
            url: '/'
        });

        alert('guaile')
};
