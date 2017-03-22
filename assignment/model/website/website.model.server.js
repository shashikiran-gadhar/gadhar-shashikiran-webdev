module.exports = function (mongoose, q) {

    var WebsiteSchema = require('./website.schema.server')(mongoose);
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

    var api = {
        "createWebsiteForUser": createWebsiteForUser,
        "findAllWebsitesForUser": findAllWebsitesForUser,
        "findWebsiteById": findWebsiteById,
        "updateWebsite": updateWebsite,
        "deleteWebsite": deleteWebsite,
        "addPage": addPage
    };

    return api;

    function createWebsiteForUser(userId, website) {
        var deferred = q.defer();
        website._user = userId;
        WebsiteModel.create(website, function (err, doc) {
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllWebsitesForUser(userId) {
        var deferred = q.defer();
        WebsiteModel.find({_user: userId}, function (err, websites) {
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(websites);
            }
        });
        return deferred.promise;
    }

    function findWebsiteById(websiteId) {
        var deferred = q.defer();
        WebsiteModel.findById(websiteId, function (err, website) {
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(website);
            }
        });
        return deferred.promise;
    }

    function updateWebsite(websiteId, website) {
        var deferred = q.defer();
        WebsiteModel.update(
            { _id:websiteId },
            {
                name: website.name,
                description: website.description
            }, function (err, website) {
                if(err){
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }

    function deleteWebsite(websiteId) {
        var deferred = q.defer();
        WebsiteModel.remove({_id: websiteId}, function (err, status) {
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve();
            }
        });
        return deferred.promise;
    }
    
    function addPage(websiteId, pageId) {
        var deferred = q.defer();
        WebsiteModel.findById(websiteId, function (err, website) {
            if(err){
                deferred.reject(err);
            }
            else {
                website.pages.push(pageId);
                website.save();
                deferred.resolve();
            }
        });
        return deferred.promise;
    }
};