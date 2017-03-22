module.exports = function (mongoose, q) {

    var UserSchema = require('./user.schema.server')(mongoose);
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api ={
        "createUser" : createUser,
        "findUserById" : findUserById,
        "findUserByUsername" : findUserByUsername,
        "findUserByCredentials" : findUserByCredentials,
        "updateUser" : updateUser,
        "deleteUser" : deleteUser,
        "addWebsite" : addWebsite
    };
    return api;
    
    function createUser(user) {
        var deferred = q.defer();
        UserModel.create(user, function (err, doc) {
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
    
    function findUserById(userId) {
        var deferred = q.defer();

        UserModel.findById(userId, function (err, user) {
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }
    
    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel.find({username: username}, function (err, user) {
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }
    
    function findUserByCredentials(username, password) {
        var deferred = q.defer();

        UserModel.find({$and: [{username: username}, {password: password}]}, function (err, user) {
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }
    
    function updateUser(userId, user) {
        var deferred = q.defer();
        UserModel.update(
            { _id : userId },
            {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }, function (err, user) {
                if(err){
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
    
    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel.remove({_id: userId}, function (err, status) {
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function addWebsite(userId, websiteId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, user) {
            if(err){
               deferred.reject(err);
            }
            else {
                user.websites.push(websiteId);
                user.save();
                deferred.resolve();
            }
        })
        return deferred.promise;
    }

};
