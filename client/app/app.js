'use strict';

angular
  .module('myApp', [
    'myApp.controllers',
    'myApp.services',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'ui.utils.masks'
  ])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/home/home.html',
        controller: 'HomeCtrl'
      });

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })

  .constant('CONSTANTS', {
		'API_URL': 'http://localhost:4040/api/v1' // DEV
		// 'API_URL': 'http://www.domain.com:4040/api/v1' // PRODUCTION
	});
