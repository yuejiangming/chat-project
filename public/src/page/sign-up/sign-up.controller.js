export default class signupController {
    constructor($http, $state, $timeout) {
        angular.extend(this, {$http, $state, $timeout});
    }

    submitSignup() {
        this.$http.put('/register', {
            name: this.signUp.userName,
            password: this.signUp.password,
            email: this.signUp.email,
            nickname: this.signUp.nickname
        }).then((res) => {
            console.log(res);

            if (res.data.error != null) {
                if (res.data.error == "dublicated_user_name") {
                    this.duplicatedUserName = true;
                }
                this.$timeout(() => {
                    this.duplicatedUserName = false;
                }, 2000);
                return;
            }

            alert('注册成功！两秒钟后返回主页');
            
            this.$timeout(() => {
                this.$state.go('login');
            }, 2000);
        });
    }
}

signupController.$inject = ['$http', '$state', '$timeout'];