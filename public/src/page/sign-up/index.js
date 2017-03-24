import angular from 'angular';

import signupController from './sign-up.controller';
import route from './route';

angular.module('app')
    .controller('signupController', signupController)
    .config(route);
