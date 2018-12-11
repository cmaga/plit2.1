(function () {
    angular
        .module('Chrubix')
        .controller('MBTAhomeController', homeController);

    function homeController(currentUser) {
        var model = this;
        model.user = currentUser;

    }
})();