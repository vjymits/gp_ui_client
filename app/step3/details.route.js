(function () {
    angular.module('myApp.step3')
        .config(['$stateProvider', function config($stateProvider) {
            $stateProvider.state('step3', {
                url: '/step3',
                views: {
                    "main": {
                        controller: 'DetailsCtrl as detailCtrl',
                        templateUrl: 'step3/checkoutstep3.html'
                    }
                },
                data: {pageTitle: 'Door to Door - CheckOut Step3'}
            });
        }])
})();