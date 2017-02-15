
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;

        //Event Handlers
        vm.register = register;


        function init() {
        }
        init();

        function register(user) {
             var newUser = UserService.createUser(user);
             console.log(newUser);
             $location.url("/user/" + newUser._id);
        }

    }
})();
