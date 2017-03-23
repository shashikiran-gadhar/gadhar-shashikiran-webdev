
module.exports = function (app, userModel) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userID", findUserByID);
    app.put("/api/user/:userID", updateUser);
    app.post("/api/user", createUser);
    app.delete("/api/user/:userID", deleteUser);
    app.put("/api/user/:userId/website/:websiteId", addWebsite);


    function createUser(req, res) {
        var newUser = req.body;
        userModel.createUser(newUser)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password){
            findUserByCredentials(req, res);
        }
        else if(username){
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel.findUserByUsername(username)
            .then(function (user) {
                if(user.length != 0){
                    res.json(user);
                }
                else{
                    res.sendStatus(500).send('err');
                }
            }, function (err) {
                res.sendStatus(500).send('err');

            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        userModel.findUserByCredentials(username, password)
            .then(function (user) {
                if(user.length != 0){
                    res.json(user);
                }
                else{
                    res.sendStatus(500).send('err');
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserByID(req, res) {
        var userID = req.params.userID;
        userModel.findUserById(userID)
            .then(function (user) {
                if(user.length != 0){
                    res.json(user);
                }
                else{
                    res.sendStatus(500).send('err');
                }
            }, function (err) {
                res.sendStatus(404).send({message: 'User Not Found'});
            });
    }

    function updateUser(req, res) {
        var userId = req.params.userID;
        var newUser = req.body;
        userModel.updateUser(userId, newUser)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.userID;
        userModel.deleteUser(userId)
            .then(function (user) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
    
    function addWebsite(req, res) {
        var userId = req.params.userId;
        var websiteId = req.params.websiteId;
        userModel.addWebsite(userId, websiteId)
            .then(function (user) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }
};

