angular.module('rbMgmSys')

.config(function($stateProvider,$urlRouterProvider,$urlMatcherFactoryProvider,$locationProvider){


	$urlMatcherFactoryProvider.caseInsensitive(true);
	$stateProvider
		.state("app",{
			url:"/",
			templateUrl :"templates/index.html",
			controller: "indexCtrl"
				})
		.state("app.entry",{
			url:"entry",
			templateUrl :"templates/entry.html",
			controller: "entryCtrl"
				})
		.state("app.delevery",{
			url:"delevery",
			templateUrl :"templates/delevery.html",
			controller: "deleveryCtrl"
				})
		.state("app.print",{
			url:"print",
			templateUrl :"templates/print.html",
			controller: "printCtrl"
				})
		.state("app.queentry",{
			url:"queentry",
			templateUrl :"templates/queEntery.html",
			controller: "queentryCtrl"
				})
		.state("app.admin",{
			url:"admin",
			templateUrl :"templates/admin.html",
			controller: "adminCtrl"
				})	
		.state("app.tool",{
			url:"tool",
			templateUrl :"templates/tool.html",
			controller: "toolCtrl"
				})
		.state("app.home",{
			url:"home",
			templateUrl :"templates/home.html",
			controller: "homeCtrl"
				})
		.state("app.pricelist",{
			url:"pricelist",
			templateUrl :"data/pricelist.json",
			controller: ""
				})
		$urlRouterProvider.otherwise("home");

		});
