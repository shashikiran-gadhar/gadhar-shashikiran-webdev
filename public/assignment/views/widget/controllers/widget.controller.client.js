
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.websiteID = $routeParams['wid'];
        vm.pageID = $routeParams['pid'];
        

        vm.doYouTrustURL = doYouTrustURL;
        vm.getTrustedHtml = getTrustedHtml;


        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageID);
        }
        init();

        function doYouTrustURL(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlparts = url.split("/");
            var id = urlparts[urlparts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }
    }

    function NewWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.websiteID = $routeParams['wid'];
        vm.pageID = $routeParams['pid'];

        //Event Handlers
        vm.newHeaderWidget = newHeaderWidget;
        vm.newImageWidget = newImageWidget;
        vm.newYouTubeWidget = newYouTubeWidget;

        function init() {
        }
        init();

        function newHeaderWidget() {
            var headerWidget ={"widgetType": "HEADER", "size": 2, "text": "GIZMODO"};
            WidgetService.createWidget(vm.pageID, headerWidget);
            $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page/" + vm.pageID + "/widget");

        }

        function newImageWidget() {
            var imageWidget = {"widgetType": "IMAGE", "width": "100%",
                "url": "http://lorempixel.com/400/200/"};
            WidgetService.createWidget(vm.pageID, imageWidget);
            $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page/" + vm.pageID + "/widget");

        }

        function newYouTubeWidget() {
            var youTubeWidget ={"widgetType": "YOUTUBE", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" };
            WidgetService.createWidget(vm.pageID, youTubeWidget);
            $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page/" + vm.pageID + "/widget");
        }
    }

    function EditWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.websiteID = $routeParams['wid'];
        vm.pageID = $routeParams['pid'];
        vm.widgetID = $routeParams['wgid'];


        //Event Handler
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWid = updateWid;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetID);
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/widget-'+type+'.view.client.html';
        }

        function updateWid(widget) {
            WidgetService.updateWidget(vm.widgetID, widget);
            $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page/" + vm.pageID + "/widget");
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetID);
            $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page/" + vm.pageID + "/widget");
        }



    }



})();
