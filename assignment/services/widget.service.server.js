
module.exports = function (app) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/page/:pageId/widget", updateIndex);
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": "2", "text": "GIZMODO",
            "name": "", "index": "0"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum",
            "name": "", "index": "1"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/", "name": "", "title": "", "index": "2"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>",
            "name": "", "text": "", "index": "3"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum", "name": ""
            , "index": "4"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E", "name": "", "title":"", "index": "5" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "name":""
            , "index": "6"}
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
                        widgets[w].name = newWidget.name;
                        res.json(widgets[w]);
                        return;

                    case "YOUTUBE":
                        widgets[w].title = newWidget.title;
                        widgets[w].name = newWidget.name;
                        widgets[w].url = newWidget.url;
                        widgets[w].width = newWidget.width;
                        res.json(widgets[w]);
                        return;

                    case "IMAGE":
                        widgets[w].title = newWidget.title;
                        widgets[w].name = newWidget.name;
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

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var userId         = req.body.userId;
        var pageId         = req.body.pageId;
        var websiteId      = req.body.websiteId;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        var serverPath = "../../../../../uploads/"+filename;

        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i]._id == widgetId) {
                widgets[i].width = width;
                widgets[i].url = serverPath;
                res.redirect("/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                return;
            }
        }
    }


    function updateIndex(req, res) {
        var pageId = req.params.pageId;
        var newmap = req.body;
        console.log(pageId);
        console.log(newmap);
        for (var i = 0; i < widgets.length; i++) {
            if(widgets[i].pageId === pageId) {
                id = widgets[i]._id;
                widgets[i].index = newmap[id];
            }
        }
        res.sendStatus(200);
    }

}