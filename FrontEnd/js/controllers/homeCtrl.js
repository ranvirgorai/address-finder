var app = angular.module('rbMgmSys');

app.controller('homeCtrl', [
  '$scope',
  '$http',
  '$localStorage',
  'API_CONSTANTS',
  'SEARCH_CONSUMER',
  'GENERATE_INVOICE',
  function($scope, $http, $localStorage, API_CONSTANTS, SEARCH_CONSUMER, GENERATE_INVOICE) {
    var url = API_CONSTANTS.API;

    $scope.getAddress = function(addr) {
      $scope.dispAddress = {};
      $http
        .get(url + '/address', {
          params: {
            zipcode: addr.zipcode
          }
        })
        .then(function(response) {
          if (response.data.data.city && response.data.data.stateName && response.data.data.country) {
            $scope.dispAddress.city = response.data.data.city;
            $scope.dispAddress.state = response.data.data.stateName;
            $scope.dispAddress.country = response.data.data.country;
          } else {
            $scope.dispAddress = 'No data found';
          }
        });
    };
  }
]);
var app = angular.module('rbMgmSys');
