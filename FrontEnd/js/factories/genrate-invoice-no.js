angular.module('rbMgmSys')
    .factory('GENERATE_INVOICE', ['$http', '$localStorage', 'API_CONSTANTS', function($http, $localStorage, API_CONSTANTS) {
                return {
                    get: function() {
                        var invoiceNo = {};
                        var lastInvoice;
                        var lastInvoiceDate;
                        var lastInvoiceYear;
                        var lastInvoiceNo;
                        var lastInvoiceNoYear
                        var newInvoiceNo;
                        var date;
                        var year;
                        var dateObj;


                        if (!(localStorage.getItem("newInvoiceNo"))) {  
                            $http.get(API_CONSTANTS.CONUSUMER_DATA)
                                .success(function(responce) {
                                    localStorage.setItem("newInvoiceNo",(responce[responce.length - 1]._id));
                                    })

                                    .error(function(responce) {
                                        console.error("error in newInvoiceNo Genration");
                                    });
                                }

                                    lastInvoice = localStorage.getItem("newInvoiceNo"); 
                                    lastInvoiceDate = parseInt(lastInvoice / 100000); lastInvoiceNoYear = lastInvoice % 100000; lastInvoiceNo = parseInt(lastInvoiceNoYear / 100); lastInvoiceYear = lastInvoiceNoYear % 100;

                                    dateObj = new Date(); date = dateObj.getDate(); year = dateObj.getFullYear() % 100;


                                    /*  console.log(lastInvoiceDate);
                                      console.log(lastInvoiceYear);
                                      console.log(lastInvoiceNo);
                                      console.log(date);
                                      console.log(year);*/
                                    invoiceNo.lastInvoiceNo = lastInvoice;

                                    if (lastInvoiceDate == date && lastInvoiceYear == year) {

                                        newInvoiceNo = (100000 * date) + ((lastInvoiceNo + 1) * 100) + year;
                                        invoiceNo.newInvoiceNo = newInvoiceNo;
                                    } else {
                                        newInvoiceNo = (100000 * date) + 10000 + year;
                                        invoiceNo.newInvoiceNo = newInvoiceNo;
                                    }
                                    localStorage.setItem("newInvoiceNo", newInvoiceNo); localStorage.setItem("lastInvoice", lastInvoice);



                                    return invoiceNo;
                                }

                        }
                    }])
