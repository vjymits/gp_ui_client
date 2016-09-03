(function () {
    angular.module('myApp.step2').config(['$stateProvider', function config($stateProvider) {
            $stateProvider.state('step2', {
                url: '/step2',
                views: {
                    "main": {
                        controller: 'SubscriberCtrl as subscriberCtrl',
                        templateUrl: 'step2/checkoutstep2.html'
                    }
                },
                data: {pageTitle: 'Door to Door - CheckOut Step2'}
            });
        }])
})();