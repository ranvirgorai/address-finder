var app = angular.module('rbMgmSys');

app.controller('deleveryCtrl', [
  '$scope',
  '$http',
  '$localStorage',
  'API_CONSTANTS',
  'SEARCH_CONSUMER',
  'GENERATE_INVOICE',
  function($scope, $http, $localStorage, API_CONSTANTS, SEARCH_CONSUMER, GENERATE_INVOICE) {
    var url = API_CONSTANTS.API;

    $scope.loadCountries = function() {
      $scope.countries = {};
      $http.get(url + '/address/all').then(function(response) {
        if (response.data) {
          $scope.countries = response.data.data.country;
          $scope.states = response.data.data.state;
          $scope.cities = response.data.data.city;
        } else {
          $scope.countries = 'No data Found';
        }
      });
    };
    $scope.loadCountries();
    $scope.getZipCode = function(data) {
      $scope.zip = '';
      $http
        .get(url + '/address/get-zip', {
          params: {
            country: data.countrySelected,
            state: data.stateSelected,
            city: data.citySelected
          }
        })
        .then(function(response) {
          if (response.data.data.zipcode) {
            $scope.zip = response.data.data.zipcode;
          } else {
            $scope.zip = 'No data Found';
          }
        });
    };
  }
]);
var app = angular.module('rbMgmSys');
