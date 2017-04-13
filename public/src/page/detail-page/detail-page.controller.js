export default class DetailPageController {
    constructor($http, $auth, $state, $uibModal, $timeout) {
        angular.extend(this, {$http, $auth, $state, $uibModal, $timeout});

        this.isChanging = false;
        this.profile = {};

        console.log(this.$auth.getToken())

        this.$http.get('/profile', {
            header: {
                Authorization: 'Bearer ' + this.$auth.getToken()
            } 
        }).then((res) => {
            console.log(res);
            this.setAllProfile(res.data);
        });
    }

    changePswd() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            controller: 'ChangePswdController as vm',
            template: require('./../../template/change-pswd/change-pswd.html')
        });

        modalInstance.result.then((res) => {
            if (res == 'success') {
                this.changePswdHint = '修改密码成功！';
            } else if (res == 'failed') {
                this.changePswdHint = '失败，原密码错误！';
            }
            this.$timeout(() => {
                this.changePswdHint = null;
            }, 2000);
        });
    }

    changeProfile() {
        this.isChanging = true;
    }

    submitChange() {
        
        this.isChanging = false;
    }

    setAllProfile(data) {
        this.profile.name = data.name;
        this.profile.password = data.password;
        this.profile.email = data.email;
        this.profile.adress = data.adress;
        this.profile.telnumber = data.telNumber;
        this.profile.selfComment = data.selfComment;
    }

    logout() {
        this.$auth.logout();
        this.$state.go('login');
    }
}

DetailPageController.$inject = ['$http', '$auth', '$state', '$uibModal', '$timeout'];