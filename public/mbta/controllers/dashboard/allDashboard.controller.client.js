(function () {
    angular
        .module('Chrubix')
        .controller('allDashboardController', allDashboardController);

    function allDashboardController(dashService, getterService, currentUser, updateService) {
        var model = this;
        model.user = currentUser;
        model.limitTo = 10;
        model.reqInformation = [];
        model.transmitted = [];
        model.hold = [];
        model.normalReqs = [];
        model.last_Update = {};

        getLastUpdate();
        function getLastUpdate(){
            updateService
                .getLastDashboardUpdate()
                .then(function(updateOutput){
                    model.last_Update = new Date(updateOutput.last_updated_time * 1000) ;
                })
        }
        model.sortVar = "req.reqInfo.flag";
        model.getDashboardInformation = function () {
            model.limitTo = 10;
            model.reqInformation = [];
            model.transmitted = [];
            model.hold = [];
            model.normalReqs = [];
            dashService
                .getDashboard(model.buyerID)
                .then(function (dash) {
                    //console.log(dash);
                    model.dash = dash;
                    for (req in dash) {
                        if (dash[req].Hold_From_Further_Processing === 'Y') {
                            model.hold.push(dash[req]);
                            getAdditionalInfo(dash[req].Req_ID, 'hold', model.hold.length);
                        }
                        else if (dash[req].Transmitted === 'Y') {
                            model.transmitted.push(dash[req]);
                            getAdditionalInfo(dash[req].Req_ID, 'transmitted', model.transmitted.length);
                            //console.log("M" + model.transmitted)
                        } else {
                            model.normalReqs.push(dash[req]);
                            getAdditionalInfo(dash[req].Req_ID, 'normal', model.normalReqs.length);

                        }
                        // console.log(dash[req])
                    }
                });
        };
        model.showMore = function () {
            model.limitTo = model.limitTo + 10;
        };

        function getAdditionalInfo(reqId, arrayID, arrayIndex) {
            getterService
                .findREQ(reqId)
                .then(function (reqOut) {
                    reqOut[0].Amount = getSumOfLines(reqOut[0].lines);
                    if (arrayID == 'hold') {
                        model.hold[arrayIndex - 1].reqInfo = reqOut[0]
                    }
                    if (arrayID == 'transmitted') {
                        model.transmitted[arrayIndex -1].reqInfo = reqOut[0]
                    }
                    if (arrayID == 'normal') {
                        console.log(model.normalReqs);
                        model.normalReqs[arrayIndex - 1].reqInfo = reqOut[0]
                    }
                });
        }

        model.formatDate = function (mongoDate) {
            if (mongoDate == null) {
                return "";
            }
            var today = new Date();
            var date = today - new Date(mongoDate);
            //var month = date.getMonth() + 1;
            //var day = date.getDate();
            //var year = date.getFullYear();
            return convertms(date);
            //return month + "/" + day + "/" + year;

        };
        model.addFlag = function (reqId) {
            dashService
                .addFlag(reqId)
                .then(function () {
                    model.reqInformation = [];
                    model.transmitted = [];
                    model.hold = [];
                    model.normalReqs = [];
                    model.dash = [];
                     model.getDashboardInformation();
                });
            model.limitTo = 10;
        };

        model.unFlag = function (reqId) {
            dashService
                .unFlag(reqId)
                .then(function () {
                    model.reqInformation = [];
                    model.transmitted = [];
                    model.hold = [];
                    model.normalReqs = [];
                    model.dash = [];
                    model.getDashboardInformation();
                });
            model.limitTo = 10;
        };

        function convertms(msec){
            seconds = Math.floor(msec/1000);
            minute = Math.floor(seconds/60);
            //seconds = seconds % 60;
            hour = Math.floor(minute /60)
            day = Math.floor(hour / 24)
            return day;
        }

        function getSumOfLines(lines) {
            sum = 0;
            for (line in lines) {
                sum += lines[line].Line_Total;
            }
            return sum;
        }

        model.formatMoney = function (text) {
            if (text == null) {
                return "";
            }
            return "$" + text.toLocaleString();
        }
    }
})();