
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController);


    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.websiteID = $routeParams['wid'];
        vm.pageID = $routeParams['pid'];
        

        vm.doYouTrustURL = doYouTrustURL;
        vm.getTrustedHtml = getTrustedHtml;


        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageID)
                .success(function (widgets) {
                    vm.widgets = angular.copy(widgets);
                    vm.widgets.sort(function(a,b) {return (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0);} );
                })

            var initialIndex = -1;
            var finalIndex = -1;

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
            var headerWidget ={"type": "HEADING", "size": "2", "text": "GIZMODO"};
            WidgetService
                .createWidget(vm.pageID, headerWidget)
                .success(function (newWidget) {
                    $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page/" +
                        vm.pageID + "/widget/" + newWidget._id);
                })

        }

        function newImageWidget() {
            var imageWidget = {"type": "IMAGE", "width": "100%",
                "url": "http://lorempixel.com/400/200/"};
            WidgetService
                .createWidget(vm.pageID, imageWidget)
                .success(function (newImgWidget) {
                    $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page/" +
                        vm.pageID + "/widget/" + newImgWidget._id);
                })

        }

        function newYouTubeWidget() {
            var youTubeWidget ={"type": "YOUTUBE", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" };
            WidgetService
                .createWidget(vm.pageID, youTubeWidget)
                .success(function (newYTWidget) {
                    $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page/" +
                        vm.pageID + "/widget/" + newYTWidget._id);
                })
        }
    }

})();
