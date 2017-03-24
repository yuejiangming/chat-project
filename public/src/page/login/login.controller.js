export default class LoginController{
    constructor($auth, $http, $timeout, $scope, $state, $rootScope) {
        angular.extend(this, {$auth, $http, $timeout, $scope, $state, $rootScope});

        console.log($auth.isAuthenticated());

        if ($auth.isAuthenticated()) {
            $http.get('/validateaccount', {
               header: {
                   Authorization: 'Bearer ' + $auth.getToken()
               } 
            }).then((res) => {
                console.log(res);
                $rootScope.nickname = res.data;
                $state.go('chatpage');
            });
        }
    }

    login() {
        var user = {
            name: this.name,
            password: this.password
        }

        this.$auth.login(user).then((res) => {
            var data = res.data,
                token;

            if (data.error != null) {
                this.loginFailed = true;
                console.log('login failed');

                this.$timeout(() => {
                    this.loginFailed = false;
                }, 2000);
            } else {
                console.log(data);
                token = data.token;

                this.$auth.setToken(token);

                this.$rootScope.nickname = data.nickname;

                this.$state.go('chatpage');
            }
        }); 
    }

    validate() {
        var token = this.$auth.getToken();

        this.$http.get('/validate', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((data) => {
            console.log(data);
        })
    }
}

LoginController.$inject = ['$auth', '$http', '$timeout', '$scope', '$state', '$rootScope'];