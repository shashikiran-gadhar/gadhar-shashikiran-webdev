(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

    function loginController(UserService, $location, $rootScope) {
        var vm = this;

        //event handlers
        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            var promise = UserService.login(user);

            promise.success(function (user) {
                user = user.data;
                if(user[0]){
                    $rootScope.currentUser = user;
                    console.log(user);
                    $location.url("/user/" + user[0]._id);
                }
                else{
                    vm.error = "User not found";
                }
           });

        }
    }

})();
