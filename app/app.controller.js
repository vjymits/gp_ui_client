(function () {
    angular.module('myApp')
        .controller('AppCtrl', AppController);

    AppController.$inject = ['$scope', '$translate', 'localStorageService'];
    function AppController($scope, $translate, localStorageService) {
        vm = this;
        vm.pageTitle ='Door to Door Application';
        var selectedLanguage = localStorageService.get("langKey");
        if(selectedLanguage != null){
        	$translate.use(selectedLanguage);
        }else{
        	$translate.use('es-mx');
        	localStorageService.set("langKey","es-mx");
        }
        $scope.$on('$stateChangeSuccess', function (event, toState) {
            if (angular.isDefined(toState.data.pageTitle)) {
                vm.pageTitle = toState.data.pageTitle + ' | ' + 'Door to Door Application';
                console.log(vm.pageTitle);
            }
        });
    };
})();

