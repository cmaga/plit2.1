(function () {
    angular
        .module('Chrubix')
        .controller('MBTAloginController', loginController);

    function loginController($location, userService, currentUser) {

        var model = this;
        console.log(currentUser);
        if(currentUser._id !== undefined){
            $location.href='/#!'
        }
        model.login = function (username, password) {
            if (!username) {
                return;
            }
            if (!password) {
                return;
            }
            userService
                .login(username, password)
                .then(login, handleError);

            function handleError(error) {
                model.message = "Username " + username + " not found, please try again";
            }

            function login(found) {
                if (found !== null) {
                    console.log(found);
                    if(found.loggedInBefore != true){
                        userService
                            .loggedInBefore(found._id)
                            .then(function(){
                                window.alert("This is your first time logging in- please change your password!")
                                $location.url('/settings')
                                window.location.reload()

                            })
                    }else{
                        window.location.reload()
                    }
                    // $scope.message = "Welcome " + username;
                } else {
                    model.message = "Username " + username + " not found, please try again";
                }
            }
        };
    }
})();