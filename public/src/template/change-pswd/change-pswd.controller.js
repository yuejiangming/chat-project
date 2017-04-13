import angular from 'angular';

export default class ChangePswdController {
    constructor($http, $uibModalInstance) {
        angular.extend(this, {$http, $uibModalInstance});

        this.pswd = {};
    }

    isIllegal() {
        if (this.pswd.oriPswd == null || this.pswd.oriPswd == '' || this.pswd.newPswd == null || this.pswd.newPswd == '' || this.pswd.rePswd == null || this.pswd.rePswd == '') {
            return true;
        }

        if (this.pswd.newPswd != this.pswd.rePswd) {
            return true;
        }

        return false;
    }

    submitNewPassword() {
        this.$http.post('./changepswd', {
            oriPswd: this.pswd.oriPswd,
            curPswd: this.pswd.newPswd
        }).then((res) => {
            console.log(res.data);

            if (res.data.success != null) {
                this.$uibModalInstance.close('success');
            } else if (res.data.failed != null) {
                this.$uibModalInstance.close('failed');
            }
        });
    }

    cancel() {
        this.$uibModalInstance.dismiss();
    }
}
ChangePswdController.$inject = ['$http', '$uibModalInstance'];