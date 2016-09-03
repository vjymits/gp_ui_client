describe('App Info section', function () {

var $scope = {} , $location ={}, $rootScope ={}, $log ={}, $state ={}, $translate, localStorageService;
	
beforeEach(module('myApp'));
        
beforeEach(inject(function (_$controller_, _$location_ , _localStorageService_) {
	
	localStorageService = _localStorageService_;
	
	$translate = {
  		  use: jasmine.createSpy('$translate.use')
	}
	
	spyOn(localStorageService,'get').and.returnValue('es-mx');
	spyOn(localStorageService,'get').and.returnValue(null);
    $scope.$on = function() {    	
    	  if (angular.isDefined(toState.data.pageTitle)) {
              vm.pageTitle = toState.data.pageTitle + ' | ' + 'Door to Door Application';
              console.log(vm.pageTitle);
          }
    };
             
}));
    
});