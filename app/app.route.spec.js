describe('app route section', function () {

var $scope = {} , $location ={}, $rootScope ={}, $log ={}, $state ={};
	
beforeEach(module('myApp'));

beforeEach(inject(function () {
            
            $translate = {
            	  use: jasmine.createSpy('$translate.use')
            }
}));
  
});