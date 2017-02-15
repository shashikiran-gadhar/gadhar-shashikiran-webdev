(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController(UserService, $routeParams, $location) {
        var vm = this;
        var userID = $routeParams['uid'];

        //event handlers
        vm.update = update;

        function init() {
            vm.user = UserService.findUserById(userID);
        }
        init();

        function update(newUser) {
            var updatedUser = UserService.updateUser(userID, newUser);
            if(updatedUser == null){
                vm.error = "Unable to Update User";
            }else{
                vm.message = "User Successfully Updated";
            }
        }
    }
    
})();
