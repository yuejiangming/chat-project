export default function route($stateProvider) {
    $stateProvider
        .state('detailpage', {
            controller: 'DetailPageController as vm',
            template: require('./detail-page.html'),
            params: {
                needAuthticate: true
            },
            url: '/'
        });
}

route.$inject = ['$stateProvider']