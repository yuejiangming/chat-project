import angular from 'angular';

import DetailPageController from './detail-page.controller';
import route from './route';

angular.module('app')
    .controller('DetailPageController', DetailPageController)
    .config(route);