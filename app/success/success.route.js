(function () {
    angular.module('myApp.success')
        .config(['$stateProvider', function config($stateProvider) {
            $stateProvider.state('success', {
                url: '/success',
                views: {
                    "main": {
                        controller: 'LoginCtrl as loginCtrl',
                        templateUrl: 'success/successinfo.html'
                    }
                },
                data: {pageTitle: 'Door to Door - success'}
            });
        }])
})();