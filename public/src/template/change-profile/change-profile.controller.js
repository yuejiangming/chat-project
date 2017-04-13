import angular from 'angular';

export default class ChangeProfileController {
    constructor($http, $uibModalInstance) {
        angular.extend(this, {$http, $uibModalInstance});
    }
}

ChangeProfileController.$inject = ['$http', '$uibModalInstance']