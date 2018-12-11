(function () {
    angular
        .module('Chrubix')
        .controller('userSettingsController', userSettingsController);

    function userSettingsController($location, userService, currentUser) {
        //console.log("here")
        var model = this;
        model.user = currentUser;
        // event handlers
        model.changePW = function(newPassword1, newPassword2) {
            console.log(newPassword1)
            if(!newPassword1) {
                model.error = "Passwords are required";
                return;
            }
            if(!newPassword2) {
                model.error = "Please Verify Password";
                return;
            }
            if(newPassword1 !== newPassword2) {
                model.error = "Passwords must match";
                return;
            }else{

                var user = {
                    _id: currentUser._id,
                    username: currentUser.username,
                    password: newPassword1,
                    role: currentUser.role,
                    fullname: currentUser.fullname,
                    email: currentUser.email
                };
                // model.message = user;
                userService
                    .changePW(user)
                    .then(function(user){
                        $location.url('/logout');
                    });
        }}

        model.updatePersonalInfo = function(){
            console.log(model.user)
            userService.
                updateUser(model.user)
                .then(function(){
                    $location.url('/#!');
                });
        }
    }
})();