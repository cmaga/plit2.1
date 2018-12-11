(function () {
    angular
        .module('Chrubix')
        .controller('headerController', headerController);

    function headerController($location, headerService, userService) {
        var model = this;
        headerService
            .checkUser()
            .then(function (user) {
            model.user = user;
        });
        console.log(model.user);

        model.logout = function logout(){
            userService.logout().then(function(){
                location.reload(true);
            })
        }
    }
})();