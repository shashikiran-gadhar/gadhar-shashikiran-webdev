module.exports = function (mongoose, q) {

    var UserSchema = require('./user.schema.server')(mongoose);
    var UserModel = mongoose.model('UserModel', UserSchema);

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
        var deferred = q.defer();
        UserModel.create(user, function (err, doc) {
            if(err){
                deferred.abort();
            }
            else{
                deferred.resolve();
            }
        });

        return deferred.promise;
    }
    
    function findUserById(userId) {
        
    }
    
    function findUserByUsername(username) {
        
    }
    
    function findUserByCredentials(username, password) {
        
    }
    
    function updateUser(userId, user) {
        
    }
    
    function deleteUser(userId) {
        
    }
    

};
