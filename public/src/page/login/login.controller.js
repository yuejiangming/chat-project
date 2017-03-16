export default class LoginController{
    constructor($auth, $http) {
        angular.extend(this, {$auth, $http});
    }

    login() {
        this.$http.get('/login').then(function(data) {
            console.log(data);
        });
    }
}

LoginController.$inject = ['$auth', '$http'];