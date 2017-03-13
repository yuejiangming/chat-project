route.$inject = ['$stateProvider'];

export default function route($stateProvider) {
    $stateProvider
        .state('chatpage', {
            template: require('./chat-page.html'),
            controller: 'ChatPageController as vm',
            url: '/chatpage'
        });
};
