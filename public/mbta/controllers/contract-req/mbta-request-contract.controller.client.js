(function () {
    angular
        .module('Chrubix')
        .controller('mbtaContractRequestController', mbtaContractRequestController);

    function mbtaContractRequestController($location, contractService, currentUser) {

        var model = this;
        model.user = currentUser;
        model.submitRequest = function () {
            var d = new Date;
            var request = {
                "Requesting_User": model.user,
                "Vendor_Name": model.vendorName,
                "Requested_Dttm": d.getTime(),
                "Status": "Pending"
            };
            contractService.requestNumber(request)
                .then(function (bid) {
                    $location.url('/view-contract-requests');
                });
            ;
        }

    }
})();