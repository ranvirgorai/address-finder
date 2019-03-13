var app=angular.module('rbMgmSys')

app.controller("indexCtrl",function($scope,$timeout){

/*	$scope.banks = [];

	$scope.fetching = false;
	$scope.searchBank = function(search){
		$scope.fetching = true;
		$http
			.get("http://beta.remitr.com/api/banks",{params:{country:"IN",search_str:search}})
			.then(function(res){
				$scope.banks = res.data;
				$scope.fetching = false;
			},function(err){
				$scope.banks = [];
				$scope.fetching = false;

				console.log("Erro",err);
			});
	}*/
   $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000 //ms

    var tick = function() {
        $scope.clock = Date.now(); // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    }

    // Start the timer
    $timeout(tick, $scope.tickInterval);


});
