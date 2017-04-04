
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, $rootScope) {
        var vm = this;

        //Event Handlers
        vm.register = register;

        function init() {
        }
        init();

        function register(user) {
            UserService
                .findUserByUsername(user.username)
                .success(function (user) {
                    vm.error = "Username already taken";
                })
                .error(function () {
                    UserService
                        .register(user)
                        .then(function(response) {
                                var user = response.data;
                                $rootScope.currentUser = user;
                                $location.url("/user/"+user._id);
                            })
                        .error(function () {
                            vm.error = "User Registration Failed";
                        })
                });
        }


    }
})();
