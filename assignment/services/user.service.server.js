
module.exports = function (app, userModel) {

    var passport = require('passport');
    var auth = authorized;
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/login', passport.authenticate('local'), login);
    //app.post('/api/logout', logout);
    //app.post('/api/register', register);
    app.get("/api/user", findUser);
    app.get("/api/user/:userID", findUserByID);
    app.put("/api/user/:userID", updateUser);
    app.post("/api/user", createUser);
    app.delete("/api/user/:userID", deleteUser);
    app.put("/api/user/:userId/website/:websiteId", addWebsite);

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

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

