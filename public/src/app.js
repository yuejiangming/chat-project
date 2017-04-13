import angular from 'angular';

import './scss/app.scss';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import satellizer from 'satellizer';

import appConfig from "./core/appConfig";
import routeEvent from "./core/routeEvent";

angular
    .module('app', [uiRouter, uiBootstrap, satellizer])
    .config(appConfig)
    .run(routeEvent);

require('./template');
require('./page');

