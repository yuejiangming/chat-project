import angular from 'angular';

export default class ChangeProfileController {
    constructor($http, $uibModalInstance, $auth, $state) {
        angular.extend(this, {$http, $uibModalInstance, $auth, $state});

        this.profile = {};

        this.$http.get('/profile', {
            header: {
                Authorization: 'Bearer ' + this.$auth.getToken()
            } 
        }).then((res) => {
            console.log(res);
            this.setAllProfile(res.data);
        });
    }

    setAllProfile(data) {
        this.profile.name = data.name;
        this.profile.password = data.password;
        this.profile.nickName = data.nickname;
        this.profile.email = data.email;
        this.profile.adress = data.adress;
        this.profile.telNumber = data.telnumber;
        this.profile.selfComment = data.personal_comment;
    }

    submitProfile() {
        this.$http.post('/changeprofile', {
            name: this.profile.name,
            email: this.profile.email,
            nickName: this.profile.nickName,
            adress: this.profile.adress,
            telNumber: this.profile.telNumber,
            selfComment: this.profile.selfComment
        }).then((res) => {
            console.log(res);
            this.$uibModalInstance.close('success');
        });
    }

    cancel() {
        this.$uibModalInstance.dismiss();
    }
}

ChangeProfileController.$inject = ['$http', '$uibModalInstance', '$auth', '$state']