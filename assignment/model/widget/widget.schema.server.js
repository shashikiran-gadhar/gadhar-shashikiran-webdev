module.exports = function (mongoose) {

    var widgets = ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT'];
    var WidgetSchema = mongoose.Schema({
        _page: {type:mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
        type: {type: String, enum: widgets},
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
        dateCreated: { type: Date, default: Date.now }
    }, {collection: 'assignmentDB.widget'});

    return WidgetSchema;
};