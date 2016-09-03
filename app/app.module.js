(function () {
    angular.module('myApp', [
/*
   AngularUI Router is a routing framework for AngularJS,
   which allows you to organize the parts of your interface
   into a state machine. Unlike the $route service in the
   Angular ngRoute module, which is organized around URL routes,
   UI-Router is organized around states, which may optionally
   have routes, as well as other behavior, attached.
   For more information see:
     https://github.com/angular-ui/ui-router
*/
        'ui.router',
/*
   The three modules below correspond to the three directories
   with the home, numbers and example1 directories.
*/
        'myApp.login',
        'LocalStorageModule'
    ]);
})();

