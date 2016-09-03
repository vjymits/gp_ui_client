describe('salesRep Info section', function () {

var $scope = {} , $translate = {} , $http = {}, $location ={}, $window = {}, localStorageService ={}, $rootScope ={};
	
beforeEach(module('myApp.step1'));

	var $controller;
	var salesCtrl,
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
        	
            spyOn($location, 'path').and.returnValue('/step2');
            spyOn(localStorageService,'get').and.returnValue(orderRequest);
            
            $translate = {
            	  use: jasmine.createSpy('$translate.use')
            }
             
            salesCtrl = $controller('SalesRepCtrl',{'$scope':$scope,'$rootScope':$rootScope,'$translate':$translate,'$location':$location,'$window':$window});
            
            $scope.salesRepInformation.firstName = 'firstName';
        	$scope.salesRepInformation.placeOfSale = 'admin';
     		$scope.salesRepInformation.city = 'Bangalore';
     		$scope.salesRepInformation.salesRepKey = 'salesRepKey';
     		$scope.salesRepInformation.pointOfSalekey = 'pointOfSalekey';
     		$scope.salesRepInformation.cadKey = 'cadKey'; 			
     		$scope.salesRepInformation.cadName = 'cadName';
     		$scope.salesRepInformation.salesCoordinator = 'salesCoordinator';
     		$scope.salesRepInformation.pointOfSalekey = 'pointOfSalekey';
     		$scope.salesRepInformation.appointmentDate = 'appointmentDate';
     		
     		//Date
     		$scope.salesRepInformation.appointmentDate = new Date();
     		$scope.date = $scope.salesRepInformation.appointmentDate;
     		
    		
    		expect($scope.alphabetic.test("asus")).toBe(true);
    		expect($scope.alphaNumeric.test("abc345")).toBe(true);
    		expect($scope.numeric.test("1234")).toBe(true);
    		expect($scope.salesList).toBe('');
    		expect($scope.checkBoxCount).toBe(0);
    		expect($scope.checkBoxSelected).toBe(true);    		
    		expect(localStorageService.get()).toBe(orderRequest);    		
    		expect($scope.salesRepInformation).toBe(orderRequest.vdscRequestBean.salesRepInformation);
    		expect($scope.dateOptions.formatYear).toBe('yy');
    		expect($scope.dateOptions.startingDay).toBe(1);
    		expect($scope.format).toBe('dd-MM-yyyy');
    		expect($scope.popup1.opened).toBe(false);
    		expect($scope.popup2.opened).toBe(false);
    		expect($scope.alphaNumericWithOutSpace.test("asus 565")).toBe(false);
    		expect($scope.alphaNumericWithOutSpace.test("asus565")).toBe(true);
    		

    		

}));
    
describe('today',function(){
	  it('Should be todays date  ',function(){
		   $scope.today();
		   console.log("$scope.salesRepInformation.appointmentDate ="+$scope.salesRepInformation.appointmentDate);
		
	  });
});

describe('clear',function(){
	  it('Clear todays date  ',function(){
		   $scope.clear();
		   expect($scope.salesRepInformation.appointmentDate).toBe(null);
		   console.log("$scope.salesRepInformation.appointmentDate ="+$scope.salesRepInformation.appointmentDate);
		
	  });
});

describe('toggleMin',function(){
	  it('toggleMin function  ',function(){
		   $scope.toggleMin();
		   expect($scope.minDate).toBe(null);
		   console.log("$scope.minDate ="+$scope.minDate);
		
	  });
});
   
describe('open1',function(){
	it('Should be todays date  ',function(){
    	$scope.open1();
    	expect($scope.popup1.opened).toBe(true);
	});
});
   
describe('open2',function(){
	it('Should be todays date  ',function(){
    	$scope.open2();
    	expect($scope.popup2.opened).toBe(true);
	});
});

describe('getDayClass',function(){
	it('getDayClass to give some  date  ',function(){
		var mode = 'day';
    	var dayToCheck=new Date(10).setHours(0,0,0,0);
    	$scope.getDayClass(new Date(),'day');
	});
	it('getDayClass to give some  date  ',function(){
    	var dayToCheck=new Date(10).setHours(0,0,0,0);
    	$scope.getDayClass(new Date(),'month');
	});
	it('getDayClass to give some  date  ',function(){
		var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
    	$scope.getDayClass(tomorrow,'day');
	});
});

    
describe('salesRepInfo',function(){
   	 it('should validate salesRep info', function () {   		 
   		    $scope.salesForm = "";
		    $scope.salesForm.$invalid = false;
        	$scope.salesRepInfo();

        	expect(orderRequest.vdscRequestBean.salesRepInformation).toBe($scope.salesRepInformation);
        	 var date = $scope.salesRepInformation.appointmentDate;        	
        	 expect(localStorageService.set("appointmentDay")).toBe(true);
        	 expect(localStorageService.set("appointmentMonth")).toBe(true);
        	 expect(localStorageService.set("appointmentYear")).toBe(true);
        	 expect(localStorageService.get()).toBe(orderRequest);        	 
        	expect($location.path()).toBe('/step2');
   	 });
   	beforeEach(function () {
 		$scope.salesRepInformation.salesChannel = false;
    });
   	it('should invalidate salesRep info', function () {
    	$scope.salesRepInfo();
    	expect($scope.checkBoxCount).toBe(0);
	 });
   	it('should invalidate salesRep info', function () {
   		$scope.salesForm.$invalid=true;
    	$scope.salesRepInfo();
	 });
   	it('should invalidate salesRep info', function () {
   		$scope.salesForm.$invalid=false;
    	$scope.salesRepInfo();
	 });
});
});

