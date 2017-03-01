import angular from 'angular';

import route from './route';
import LoginController from './login.controller'

angular
    .module('app')
    .controller('LoginController', LoginController)
    .config(route);
