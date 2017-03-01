import angular from 'angular';

import route from './route';
import PageController from './page.controller'

angular
    .module('app')
    .controller('PageController', PageController)
    .config(route);
