var app = angular.module('myApp');

app.directive('footerContainer', function(){
	return {
	    restrict: 'E',
	    transclude: true,
	    templateUrl: 'common/footer.html'
	  };
});