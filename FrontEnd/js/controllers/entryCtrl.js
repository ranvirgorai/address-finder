var app = angular.module('rbMgmSys')

app.controller('entryCtrl', ['$scope', '$http', '$localStorage', 'API_CONSTANTS', 'SEARCH_CONSUMER', 'GENERATE_INVOICE', function($scope, $http, $localStorage, API_CONSTANTS, SEARCH_CONSUMER, GENERATE_INVOICE) {

    var FullURL = 'http://localhost:1234/api/consumer';
    var invoiceNo;
    var newInvoiceNo;
    var name;
    var address;
    var mobile;
    var makingTime;
    var color;
    var spiece;

    //Piece
    var mid_piece;
    var small_piece;
    var large_piece;

    //Matrial
    var matrial_name;
    var matrial_cost;

    //remark
    var mixed;
    var ready;
    var rating;

    //invoice
    var advance;
    var total;
    var balance;

    //delevery
    var status;
    var dlv_date

    //Piece Cost

    var mid_piece_prc;
    var large_piece_prc;
    var small_piece_prc;

    var paid;

    (function() {
        $scope.M_Piece_Price = localStorage.getItem("M_Piece_Price");
        $scope.S_Piece_Price = localStorage.getItem("L_Piece_Price");
        $scope.L_Piece_Price = localStorage.getItem("S_Piece_Price");
        $scope.M_M_Piece_Price = localStorage.getItem("M_M_Piece_Price");
        $scope.M_S_Piece_Price = localStorage.getItem("M_L_Piece_Price");
        $scope.M_L_Piece_Price = localStorage.getItem("M_S_Piece_Price");
    }());


    function searchConsumer(ID) {
        if ($scope.searchByName) {
            console.log('SearchByName');
        } else {
            if ($scope.num_invoice /*&& Number.isInteger($scope.num_invoice) */ ) {
                $http.get(API_CONSTANTS.CONUSUMER_DATA + "/" + ID)
                    .success(function(responce) {
                        $scope.consoleText = "Searching Done ! Record Found !";
                        showData(responce);
                        setResponseData(responce);
                    })

                .error(function(responce) {
                    $scope.consoleText = "Sorry Record Not Found, Please Search Again !";
                    consumer = null;
                });
            } else {
                $scope.consoleText = "Please Enter Correct Number !";
            }
        }
        $scope.pay = true;
    }

    $scope.search = function() {
        var found = false;
        searchConsumer($scope.num_invoice);
        /* console.log(GENERATE_INVOICE.get());
        console.log(SEARCH_CONSUMER.getAll());
        console.log(SEARCH_CONSUMER.getConsumer('2010016'));
*/


    }

    function showData(responce) {
        clear();
        $scope.num_invoice = responce._id;
        $scope.txt_name = responce.name;
        $scope.num_mobile = responce.mobile;
        $scope.txt_address = responce.address;
        $scope.num_date = responce.date; //new Date(1433109600000);//

        $scope.num_color = responce.color;
        $scope.num_spiece = responce.grSpice;

        $scope.txt_material = responce.material.name;
        $scope.num_material = responce.material.cost;

        $scope.num_midPiece = responce.piece.mid;
        $scope.num_smallPiece = responce.piece.small;
        $scope.num_largePiece = responce.piece.large;


        $scope.num_advance = responce.invoice.paid;

        $scope.mixed = responce.remark.mixed;

        $scope.ready = responce.remark.ready;

        $scope.delivered = responce.delevery.status;
    }


    $scope.nextRecord = function() {
        if ($scope.searchByName) {

        } else {
            searchConsumer($scope.num_invoice + 100);
        }
    }
    $scope.previousRecord = function() {
        if ($scope.searchByName) {

        } else {
            searchConsumer($scope.num_invoice - 100);
        }
    }




    function setResponseData(responce) {
        //Main vairable
        //console.log(localStorage.getItem("newInvoiceNo"));
        localStorage.setItem("newInvoiceNo", $scope.num_invoice);
        localStorage.setItem("name", responce.name);
        localStorage.setItem("address", responce.address || "");
        localStorage.setItem("mobile", responce.mobile || 0);
        localStorage.setItem("makingTime", responce.date);
        localStorage.setItem("color", responce.color || 0);
        localStorage.setItem("spiece", responce.spiece || 0);
        localStorage.setItem("mid_piece", responce.piece.mid || 0);
        localStorage.setItem("small_piece", responce.piece.small || 0);
        localStorage.setItem("large_piece", responce.piece.large || 0);
        localStorage.setItem("matrial_name", responce.material.name || '');
        localStorage.setItem("matrial_cost", responce.material.cost || 0);
        localStorage.setItem("mixed", responce.remark.mixed ? true : false);
        localStorage.setItem("ready", responce.remark.ready ? true : false);
        localStorage.setItem("rating", 5);
        localStorage.setItem("advance", responce.invoice.advance || 0);
        localStorage.setItem("status", responce.delevery.status ? true : false);
        localStorage.setItem("dlv_date", responce.delevery.date);


    }

    function setData() {


        invoiceNo = localStorage.getItem("newInvoiceNo");
        localStorage.setItem("name", $scope.txt_name);
        localStorage.setItem("address", $scope.txt_address);
        localStorage.setItem("mobile", $scope.num_mobile || 0);
        localStorage.setItem("makingTime", $scope.delivered ? localStorage.getItem("makingTime"): Date.now());
        localStorage.setItem("color", $scope.num_color || 0);
        localStorage.setItem("spiece", $scope.num_spiece || 0);
        localStorage.setItem("mid_piece", $scope.num_midPiece || 0);
        localStorage.setItem("small_piece", $scope.num_smallPiece || 0);
        localStorage.setItem("large_piece", $scope.num_largePiece || 0);
        localStorage.setItem("matrial_name", $scope.txt_material || '');
        localStorage.setItem("matrial_cost", $scope.num_material || 0);
        localStorage.setItem("mixed", $scope.mixed ? true : false);
        localStorage.setItem("ready", $scope.ready ? true : false);
        localStorage.setItem("rating", 5);
        localStorage.setItem("advance", $scope.num_advance+$scope.num_pay|| 0);
        localStorage.setItem("status", $scope.delivered ? true : false);
        localStorage.setItem("dlv_date", $scope.delivered ? Date.now() : 0 );


    }

    function getData() {
        $scope.entryFormData = {
            "_id": localStorage.getItem("newInvoiceNo"),
            "name": localStorage.getItem("name"),
            "mobile": localStorage.getItem("mobile"),
            "address": localStorage.getItem("address"),
            "date": localStorage.getItem("makingTime"),
            "color": localStorage.getItem("color"),
            "grSpice": localStorage.getItem("spiece"),
            "material": {
                "name": localStorage.getItem("matrial_name"),
                "cost": localStorage.getItem("matrial_cost")
            },
            "piece": {
                "small": localStorage.getItem("small_piece"),
                "mid": localStorage.getItem("mid_piece"),
                "large": localStorage.getItem("large_piece")
            },
            "pieceCost": {
                "small": localStorage.getItem("small_piece_prc"),
                "mid": localStorage.getItem("mid_piece_prc"),
                "large": localStorage.getItem("large_piece_prc")
            },
            "remark": {
                "mixed": localStorage.getItem("mixed"),
                "ready": localStorage.getItem("ready"),
                "custmerRating": localStorage.getItem("rating")

            },
            "delevery": {
                "status": localStorage.getItem("status"),
                "date": localStorage.getItem("dlv_date")
            },
            "invoice": {
                "total": localStorage.getItem("total"),
                "paid": localStorage.getItem("advance"),
                "balance": localStorage.getItem("balance")
            }
        }

    }

    $scope.updateMe = function() {
        console.log("updae me");
        setData();
        calcInvoice();
        getData();

        console.log($scope.entryFormData);

        $http.put(API_CONSTANTS.CONUSUMER_DATA + "/" + $scope.num_invoice, $scope.entryFormData)
            .success(function(data) {

                $scope.consoleText = "Record Updated Successfully For "+$scope.txt_name;
            })
            .error(function(data) {
                console.error("error in posting");
                $scope.consoleText = "Error To Update Record !";
            });


    }




    $scope.deleveryDo = function() {
        setData();
        calcInvoice();
        getData();

        console.log($scope.entryFormData);



    }


    //Object to pass



    $scope.submitForm = function() {
        GENERATE_INVOICE.get();
        setData();
        calcInvoice();
        getData();

        console.log($scope.entryFormData);

        //$http.post(API_CONSTANTS.CONUSUMER_DATA, $scope.entryFormData)
        $http.post(FullURL, $scope.entryFormData)
            .success(function(data) {
                console.log("posted successfully");
                 $scope.consoleText = "Record Added Successfully for "+$scope.txt_name;
                 clear();
            })
            .error(function(data) {
                console.error("error in posting");
            });

        // $scope.num_invoice=localStorage.getItem("newInvoiceNo")+1;
    }

    function calcInvoice() {

        if (!(localStorage.getItem("M_Piece_Price")) || !(localStorage.getItem("M_M_Piece_Price"))) {
            $http.get(API_CONSTANTS.NORMAL_RATE)
                .success(function(responce) {
                    console.log(responce);

                    localStorage.setItem("M_Piece_Price", responce.price.M_Piece_Price);
                    localStorage.setItem("S_Piece_Price", responce.price.S_Piece_Price);
                    localStorage.setItem("L_Piece_Price", responce.price.L_Piece_Price);
                    localStorage.setItem("M_M_Piece_Price", responce.price.M_M_Piece_Price);
                    localStorage.setItem("M_S_Piece_Price", responce.price.M_S_Piece_Price);
                    localStorage.setItem("M_L_Piece_Price", responce.price.M_L_Piece_Price);

                })
                .error(function(responce) {
                    console.log("Fail To Fetch Data");
                });
        } else {

            if ((localStorage.getItem("mixed")) == 'false') {






                console.log("Not Mixed rate");

                localStorage.setItem("mid_piece_prc", localStorage.getItem("mid_piece") * localStorage.getItem("M_Piece_Price"));
                localStorage.setItem("large_piece_prc", localStorage.getItem("large_piece") * localStorage.getItem("L_Piece_Price"));
                localStorage.setItem("small_piece_prc", localStorage.getItem("small_piece") * localStorage.getItem("S_Piece_Price"));

            } else {
                console.log("Mixed rate");
                localStorage.setItem("mid_piece_prc", localStorage.getItem("mid_piece") * localStorage.getItem("M_M_Piece_Price"));
                localStorage.setItem("large_piece_prc", localStorage.getItem("large_piece") * localStorage.getItem("M_L_Piece_Price"));
                localStorage.setItem("small_piece_prc", localStorage.getItem("small_piece") * localStorage.getItem("M_S_Piece_Price"));


            }

            var total = parseInt(localStorage.getItem("mid_piece_prc")) + parseInt(localStorage.getItem("large_piece_prc")) + parseInt(localStorage.getItem("small_piece_prc")) + parseInt(localStorage.getItem("color")) + parseInt(localStorage.getItem("spiece")) + parseInt(localStorage.getItem("matrial_cost"));
            localStorage.setItem("total", total)
            localStorage.setItem("balance", (localStorage.getItem("total")) - (localStorage.getItem("advance")));



        }

    }


    $scope.printInvoice = function(printableInvoice) {
        console.log("print button pressed");
       var restorepage = document.body.innerHTML;
        var printcontent = document.getElementById(printableInvoice).innerHTML;
        document.body.innerHTML = printcontent;
        window.focus();
        window.print();
        window.close();
        //document.body.innerHTML = restorepage;
        //$state.go('app.entry');
    }






    $scope.clearform = function() {
        $scope.consoleText = "Cleared !";
        clear();
    }


    function clear() {

        $scope.num_invoice = "";
        $scope.txt_name = "";
        $scope.num_mobile = "";
        $scope.txt_address = "";
        $scope.num_date = "";

        $scope.num_color = "";
        $scope.num_spiece = "";

        $scope.txt_material = "";
        $scope.num_material = "";

        $scope.num_midPiece = "";
        $scope.num_smallPiece = "";
        $scope.num_largePiece = "";


        $scope.num_advance = "";
        $scope.num_pay = "";

        $scope.mixed = false;
        $scope.ready = false;
        $scope.deepSearch = false;
        $scope.delivered = false;
        $scope.searchByName = false;
    }

}]);
