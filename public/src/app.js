import angular from 'angular';

import './scss/app.scss';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

import appConfig from "./core/appConfig";

angular
    .module('app', [uiRouter, uiBootstrap])
    .config(appConfig);

require('./page');
