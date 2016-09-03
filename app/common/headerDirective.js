var app = angular.module('myApp');

app.directive('headerContainer', function(){
	return {
	    restrict: 'E',
	    transclude: true,
	    templateUrl: 'common/header.html'
	  };
})
.controller('HeaderController',['$scope','$translate','$location','$window','localStorageService', function($scope,$translate, $location,$window,localStorageService) {
	 $scope.username = localStorageService.get("userName");
	 $scope.logout = function () {
	 localStorageService.set("userName", "");
	 localStorageService.set("estimatedMonthdate",undefined);
     localStorageService.set("estimatedYeardate",undefined);
     localStorageService.remove("langKey");
	 localStorageService.set("langKey","es-mx");
     localStorageService.remove("expedMonth");
     localStorageService.remove("expedYear");
     localStorageService.remove("expirMonth");
     localStorageService.remove("expirYear");
     localStorageService.remove("success");
     localStorageService.remove("delYear");
	 localStorageService.remove("delMonth");
	 localStorageService.remove("delDate");
	 localStorageService.remove("maskCreditCardVal");
   	 $translate.use("es-mx");
     $location.path('/');
	 };
}]);