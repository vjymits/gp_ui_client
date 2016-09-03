describe('success section', function () {

var $scope = {} , $translate = {} , $location ={}, $window = {}, localStorageService ={}, $rootScope ={};
	
beforeEach(module('myApp.success'));
        
beforeEach(inject(function () {
            
            $translate = {
            	  use: jasmine.createSpy('$translate.use')
            }
             
}));
  
});