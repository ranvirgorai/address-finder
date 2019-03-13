var API_URL = 'http://localhost:3001';
var API_BASE = '/api';

var API = API_URL + API_BASE;

angular.module('rbMgmSys').constant('API_CONSTANTS', {
  API: API,
  CONUSUMER_DATA: API + '/consumer',
  NORMAL_RATE: 'data/pricelist.json',
  MIXED_RATE: 'data/mixedpricelist.json'
});
