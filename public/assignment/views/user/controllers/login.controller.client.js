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
            if(user && user.username && user.password){
                UserService
                    .login(user)
                    .then(function (response) {
                        if(response){
                            user = response.data;
                            if(user[0]){
                                //$rootScope.currentUser = user[0];
                                $location.url("/user/" + user[0]._id, user);
                            }
                            else{
                                vm.error = "User not found";
                            }
                        }

                    })
                    .catch(function (err) {
                        vm.error = "User not found";
                    })
            }
        }
    }

})();
