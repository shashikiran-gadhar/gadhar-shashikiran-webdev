module.exports = function (mongoose, q) {

    var WidgetSchema = require('./widget.schema.server')(mongoose);
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

}