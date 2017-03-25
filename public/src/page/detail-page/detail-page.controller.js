export default class DetailPageController {
    constructor($http, $auth, $state) {
        angular.extend(this, {$http, $auth, $state});

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

DetailPageController.$inject = ['$http', '$auth', '$state'];