module.exports = function (mongoose) {

    var WebsiteSchema = mongoose.Schema({
        _user: {type:mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        name: String,
        description: String,
        pages: [{type:mongoose.Schema.Types.ObjectId, ref: 'PageModel'}],
        dateCreated: Date
    }, {collection: 'assignmentDB.website'});

    return WebsiteSchema;
};
