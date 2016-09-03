describe('salesRep Info section', function () {

var $scope = {} , $translate = {} , $location ={}, $window = {}, localStorageService ={}, $rootScope ={};
	
beforeEach(module('myApp.step2'));

	var $controller;
	var $location;
	var SubscriberCtrl,
	localStorageService;
	var orderRequest = {
 			"vdscRequestBean":{
 				"header":{
 					"requestType":"Activate_Service",
 					"orderType":"",
 					"langId":"en-us",
 					"internalId":"D2D"+Math.random()
 				},
 				"salesRepInformation":{
 					"salesChannel":"Direct"
 				},
 				"customerInfo":"",
 				"paymentInfo":"",
 				"referenceInfo":"",
 				"authorizeCreditReportRequest":"",
 				"products": {
 					"ratePlan":[{
 						
 					}],
 					"equipment":[{
 						
 					}]
 				}
 			}
 	};	        
        
beforeEach(inject(function (_$controller_, _$location_ , _localStorageService_) {
	
        	$controller = _$controller_;
        	$location = _$location_;
        	localStorageService = _localStorageService_;
        	
            spyOn($location, 'path').and.returnValue('/step3');
            spyOn(localStorageService,'get').and.returnValue(orderRequest);
            $scope.$on = function() {};
            
            $translate = {
            	  use: jasmine.createSpy('$translate.use')
            }
             
            SubscriberCtrl = $controller('SubscriberCtrl',{'$scope':$scope,'$rootScope':$rootScope,'$translate':$translate,'$location':$location,'$window':$window});
         
}));
  
});