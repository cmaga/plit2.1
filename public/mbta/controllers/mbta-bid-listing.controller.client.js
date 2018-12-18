(function () {
    angular
        .module('Chrubix')
        .controller('MBTAlistController', MBTAlistController);

    function MBTAlistController(bidService) {
        var model = this;
        model.getBids = function () {
            bidService
                .getBids()
                .then(function (bids) {
                    console.log(bids);
                    model.bids = bids;
                });
        };
        model.getBids();

        model.bidNumberComparator = function(bidNumOne, bidNumTwo) {
            var id_one = parseInt(bidNumOne.value.replace(/\D/g, ''))
            var id_two = parseInt(bidNumTwo.value.replace(/\D/g, ''))
            return (id_one > id_two) ? 1 : -1 
        }

        model.formatDate = function (mongoDate) {
            var date = new Date(mongoDate);
            if(date == "Invalid Date"){
                return "N/A"
            }
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var year = date.getFullYear();
            return month + "/" + day + "/" + year;
        };

    }
})();
