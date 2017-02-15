(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@gmail.com" },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob.marley@gmail.com"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly123@gmail.com"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose2323@gmail.com" }
        ];
        
        var api ={
            "createUser" : createUser,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser
        };
        return api;
        
        function createUser(user) {
            user._id = (new Date()).getTime();
            users.push(user);
            return user;
        }

        function findUserById(userId) {
            for(var u in users){
                var user = users[u];
                if(user._id == userId){
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for(var i in users){
                if(users[i].username == username)
                    return angular.copy(users[i]);
            }
            return null;

        }

        function findUserByCredentials(username, password) {
            for(var i in users){
                if(users[i].username == username
                && users[i].password == password)
                    return angular.copy(users[i]);
            }
            return null;
        }

        function updateUser(userId, newUser) {
            for(var u in users){
                var user = users[u];
                if(user._id == userId){
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    users[u].username = newUser.username;
                    return user;
                }
            }
            return null;
        }

        function deleteUser(userId) {
            for(var u in users){
                if(users[u]._id == userId){
                    users.splice(u, 1);
                }
            }
        }
    }

})();