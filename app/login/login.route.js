(function () {
    angular.module('myApp.login')
        .config(['$stateProvider', function config($stateProvider) {
            $stateProvider.state('login', {
                url: '/login',
                views: {
                    "main": {
                        controller: 'LoginCtrl as loginCtrl',
                        templateUrl: 'login/login.html'
                    }
                },
                data: {pageTitle: 'Door to Door - Login'}
            });
        }])
})();