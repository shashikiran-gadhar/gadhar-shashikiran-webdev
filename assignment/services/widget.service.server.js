
module.exports = function (app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": "2", "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var newWidget = req.body;
        newWidget._id = (new Date()).getTime();
        newWidget.pageId = pageId;
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pageId;
        var widgetlist = [];
        for(var w in widgets){
            if(widgets[w].pageId == pageId){
                widgetlist.push(widgets[w]);
            }
        }
        res.json(widgetlist);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        var widget = widgets.find(function (w) {
            return w._id == widgetId;
        });
        res.send(widget);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        for(var w in widgets){
            if(widgets[w]._id == widgetId){
                switch (newWidget.widgetType){
                    case "HEADER":
                        widgets[w].size = newWidget.size;
                        widgets[w].text = newWidget.text;
                        res.json(widgets[w]);
                        return;

                    case "YOUTUBE":
                        widgets[w].url = newWidget.url;
                        widgets[w].width = newWidget.width;
                        res.json(widgets[w]);
                        return;

                    case "IMAGE":
                        widgets[w].url = newWidget.url;
                        widgets[w].width = newWidget.width;
                        res.json(widgets[w]);
                        return;

                    default:
                        res.sendStatus(404);
                }
            }
        }
        res.sendStatus(404);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for(var w in widgets){
            if(widgets[w]._id == widgetId){
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

}