(function () {
    angular
        .module('Chrubix')
        .factory('updateService', updateService);

    function updateService($http) {
        var api = {
            getLastDashboardUpdate: getLastDashboardUpdate
        };
        return api;

    function getLastDashboardUpdate(){
        var url = "/api/update/dashboard";
        return $http.get(url)
            .then(function (response) {
                return response.data;
            });    }}}
)();
