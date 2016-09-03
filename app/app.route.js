(function () {
    angular.module('myApp').config(['$stateProvider', '$urlRouterProvider', '$translateProvider','localStorageServiceProvider', function appConfig($stateProvider, $urlRouterProvider, $translateProvider,localStorageServiceProvider) {
        	console.info('window.navigator.userLanguage', window.navigator.userLanguage);
            console.info('window.navigator.language', window.navigator.language);
            var language = window.navigator.userLanguage || window.navigator.language;
            language = language.toLowerCase();
            $translateProvider.useStaticFilesLoader({
        		prefix: 'localization/locale-',
        		suffix: '.json'
        	});
        	$translateProvider.preferredLanguage('es-mx');
        	localStorageServiceProvider.setStorageType('sessionStorage');
        	$urlRouterProvider
            	.when('/login','/login')
            	.when('/logout','/login')
            	.when('/step1','/step1')
            	.when('/step2','/step2')
            	.when('/step3','/step3')
            	.when('/success','/success')
            	.when('','/login')
            .otherwise('/login');
        }]).run(run);
    run.$inject = ['$document','$timeout'];
    function run($document,$timeout) {

        // Session Timeout timer value 30 minutes as default
        var timeOutTimerValue = 1800000;//30*60000

        // Start a timeout
        var timeOutThread = $timeout(function(){
        	        logoutByTimer();
        	}, timeOutTimerValue);

        var bodyElement = angular.element($document);

        angular.forEach(['keydown', 'keyup', 'click','scroll'],
            function(EventName) {
               bodyElement.bind(EventName, function () {
            	   timeOutResetter();
               });
            });

        function logoutByTimer(){
            window.location.href = '#login';
        };

        function timeOutResetter(){

            /// Stop the pending timeout
            $timeout.cancel(timeOutThread);

            /// Reset the timeout
            timeOutThread = $timeout(function(){
            	logoutByTimer();
            } , timeOutTimerValue);
        };

    };
})();

