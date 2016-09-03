(function () {
    angular.module('myApp.step1').config(['$stateProvider', function config($stateProvider) {
            $stateProvider.state('step1', {
                url: '/step1',
                views: {
                    "main": {
                        controller: 'SalesRepCtrl as salesCtrl',
                        templateUrl: 'step1/checkoutstep1.html'
                    }
                },
                data: {pageTitle: 'Door to Door - CheckOut Step1'}
            });
        }])
})();