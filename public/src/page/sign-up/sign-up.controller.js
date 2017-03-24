export default class signupController {
    constructor($http, $state, $timeout) {
        angular.extend(this, {$http, $state, $timeout});
    }

    submitSignup() {
        this.$http.put('/register', {
            name: this.signUp.userName,
            password: this.signUp.password,
            email: this.signUp.email
        }).then((res) => {
            alert('注册成功！两秒钟后返回主页');
            
            this.$timeout(() => {
                this.$state.go('login');
            }, 2000);
        });
    }
}

signupController.$inject = ['$http', '$state', '$timeout'];