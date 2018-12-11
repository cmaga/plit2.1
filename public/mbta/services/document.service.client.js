(function () {
        angular
            .module('Chrubix')
            .factory('documentService', documentService);

        function documentService($http) {
            var api = {
                getDocument: getDocument
            };
            return api;

            function getDocument(bidInfo){
                var url = "/api/generate-doc";
                return $http.post(url, bidInfo)
                    .then(function (response) {
                        return response.data;
                    });    }}}
)();
