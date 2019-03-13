angular
  .module('rbMgmSys')

  .config(function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(true);
    $stateProvider
      .state('app', {
        url: '/',
        templateUrl: 'templates/index.html',
        controller: 'indexCtrl'
      })

      .state('app.addToZip', {
        url: 'add-zip',
        templateUrl: 'templates/addToZip.html',
        controller: 'addToZipCtrl'
      })
      .state('app.home', {
        url: 'home',
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      });
    $urlRouterProvider.otherwise('home');
  });
