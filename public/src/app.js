import angular from 'angular';
import './scss/app.scss';

import uiRouter from 'angular-ui-router';

import appConfig from "./core/appConfig";

angular
    .module('app', [uiRouter])
    .config(appConfig);

require('./page');
