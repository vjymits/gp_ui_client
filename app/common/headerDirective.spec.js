/**
 * 
 */
(function (){
	"use strict";	
	describe("Directive: header unit test", function() {
		var $compile, $rootScope, $translate;
		var $scope = {} , $translate = {} , $http = {}, $location ={}, $window = {}, localStorageService ={}, $rootScope ={};
		beforeEach(module("myApp"));
		var $controller;
		var HeaderController,
		localStorageService;
		
		beforeEach(inject(function(_$compile_, _$rootScope_,_$controller_,_localStorageService_,_$location_){
			$compile = _$compile_;
		    $rootScope = _$rootScope_;
		    $controller = _$controller_;
		    localStorageService = _localStorageService_;
		    $location=_$location_;
		    $translate = {
		    	use: jasmine.createSpy('$translate.use')
		    }
		    HeaderController = $controller('HeaderController',{'$scope':$scope,'$translate':$translate,'$location':$location,'$window':$window,'localStorageService':localStorageService});
		}));
		
		describe('logout',function(){
			  it('Should logout application  ',function(){
				   $scope.logout();
				   localStorageService.set("estimatedMonthdate",undefined);
				   localStorageService.set("estimatedYeardate",undefined);
				   localStorageService.remove("langKey");
				   localStorageService.set("langKey","es-mx");
				   localStorageService.remove("expedMonth");
				   localStorageService.remove("expedYear");
				   localStorageService.remove("expirMonth");
				   localStorageService.remove("expirYear");
				   $translate.use("es-mx");
			       $location.path('/');
			  });
		});
		
		it("should load the template", function(){
			var element = $compile("<header-container></header-container>")($rootScope);		    
			expect(element.find('header-container').length).toEqual(0);
		})
	})
	
}())