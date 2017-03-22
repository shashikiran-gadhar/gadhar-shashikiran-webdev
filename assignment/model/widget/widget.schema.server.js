module.exports = function (mongoose) {

    var WidgetSchema = mongoose.Schema({
        _page: {type:mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
        type: String,
        name: String,
        text: String,
        placeholder: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: Date
    }, {collection: 'assignmentDB.widget'});

    return WidgetSchema;
};