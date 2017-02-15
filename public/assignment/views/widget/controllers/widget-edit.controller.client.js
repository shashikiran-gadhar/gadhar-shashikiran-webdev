
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

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
