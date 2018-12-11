(function () {
    angular
        .module('Chrubix')
        .controller('mbtaContractsController', mbtaContractsController);

    function mbtaContractsController(contractService, currentUser) {

        var model = this;
        model.user = currentUser;

        function init() {
            contractService
                .getAllContracts()
                .then(function (contracts) {
                    model.contracts = contracts;
                    if (model.user.role != 'Admin') {
                        model.contracts = hideHidden(model.contracts);
                    }
                });
        }

        init();

        function hideHidden() {
            var returnCons = [];
            for (con in model.contracts) {
                var contractVal = model.contracts[con].hidden;
               if(contractVal != true){
                   returnCons.push(model.contracts[con]);
               }
            }
            console.log(returnCons);
            return returnCons;
        }

        model.formatDate = function (mongoDate) {
            if (mongoDate == null) {
                return "";
            }
            var date = new Date(mongoDate);
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var year = date.getFullYear();

            return month + "/" + day + "/" + year;

        };
        model.formatMoney = function (text) {
            if (text == null) {
                return "";
            }
            return "$" + text.toLocaleString();
        }
        model.concatDescr = function (lines) {
            var allDescr = "";
            for (l in lines) {
                if (allDescr.length > 0) {
                    allDescr = allDescr + ", ";
                }
                allDescr = allDescr + lines[l].Description;
            }
            return allDescr;
        }
        model.sumOfLines = function (lines) {
            var sum = 0.00;
            for (l in lines) {
                sum = sum + lines[l].Max_Amt;
            }
            return sum;
        }
        model.hide = function (contract) {
            console.log("HIDING");
            contractService
                .hide(contract._id)
                .then(function () {
                    model.contracts = [];
                    init();
                });
        }
        model.unHide = function (contract) {
            console.log("UNHIDING")
            contractService
                .unHide(contract._id)
                .then(function () {
                    model.contracts = [];
                    init();
                });
        }
    }


})();