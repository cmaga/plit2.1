(function () {
        angular
            .module('Chrubix')
            .factory('contractService', contractService);

        function contractService($http) {
            var api = {
                getAllContracts: getAllContracts,
                hide: hide,
                unHide: unHide,
                getHiddenStatus: getHiddenStatus,
                requestNumber: requestNumber,
                getRequests: getRequests,
                updateRequest: updateRequest,
                removeRequest: removeRequest
            };
            return api;
            function removeRequest(rId) {
                var url = "/api/contract/remove-request/" + rId;
                return $http.delete(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function updateRequest(requestInformation, rId) {
                var url = "/api/contract/update-request/" + rId;
                return $http.put(url, requestInformation)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function getRequests() {
                var url = '/api/contract/requests';
                console.log(url);
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function requestNumber(request){
                var url = "/api/contract/request";
                return $http.post(url, request)
                    .then(function (response) {
                        return response.data;
                    });
            }
            function getHiddenStatus(contract_id){
                var url = "/api/tag/"+contract_id;
                return $http.get(url)
                    .then(function (response) {
                        console.log(response.data);
                        return response.data;
                    });
            }

            function getAllContracts(){
                var url = "/api/contract";
                return $http.get(url)
                    .then(function (response) {

                        return response.data;
                    });
            }

            function hide(contractID){
                var url = '/api/contract/hide/' + contractID;
                console.log(url);
                return $http.put(url)
                    .then(function(response,error){
                        return response.data;
                    })
            }

            function unHide(contractID){
                var url = '/api/contract/unhide/' + contractID;
                console.log(url);
                return $http.put(url)
                    .then(function(response,error){
                        console.log(error)
                        return response.data;
                    })
            }
        }}

)();
