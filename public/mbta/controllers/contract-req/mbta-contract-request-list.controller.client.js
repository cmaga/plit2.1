(function () {
    angular
        .module('Chrubix')
        .controller('MBTAcontractRequestListController', MBTAcontractRequestListController);

    function MBTAcontractRequestListController(contractService, currentUser) {
        var model = this;
        model.user = currentUser;
        model.getRequests = function () {
            contractService
                .getRequests()
                .then(function (contracts) {
                    model.contracts = contracts;
                });
        };
        model.getRequests();

        model.formatDate = function (mongoDate) {
            var date = new Date(mongoDate);
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var year = date.getFullYear();
            return month + "/" + day + "/" + year;
        };

        model.isAdmin= function(){
            if(model.user.role == 'Admin' || model.user.role == 'Manager'){
                return false;
            }else{
                return true;
            }
        }

    }
})();