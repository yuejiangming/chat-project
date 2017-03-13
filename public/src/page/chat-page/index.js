import angular from 'angular';

import route from './route';
import ChatPageController from './chat-page.controller'

angular
    .module('app')
    .controller('ChatPageController', ChatPageController)
    .config(route);
