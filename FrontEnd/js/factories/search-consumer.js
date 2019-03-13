angular.module('rbMgmSys')
    .factory('SEARCH_CONSUMER', ['$http',"$q", 'API_CONSTANTS', function($http, $q,API_CONSTANTS) {
        var allConsumer={};
        var consumer={"name":"Ranvir"};


        return {
            getAll: function() {
            	//var defer=$q.defer();
                //console.log(invoice);
                $http.get(API_CONSTANTS.CONUSUMER_DATA)
                    .success(function(responce) {
                     allConsumer=responce;
                    
                  //   defer.resolve(responce);
                    })

                .error(function(responce) {
                    console.error("error in newInvoiceNo Genration");
                    defer.resolve(responce);
                });
                 
                
                return allConsumer; //defer.promise; 
           },
            getConsumer: function(id) {
            	
                $http.get(API_CONSTANTS.CONUSUMER_DATA+"/"+id)
                    .success(function(responce) {
                    // consumer=responce.name;
                     
                    })

                .error(function(responce) {
                    //console.error("error in Search");
                    consumer=null;
                });

                return consumer; 
           }

        }
    }])
