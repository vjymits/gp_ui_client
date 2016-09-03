describe('subscriber Info section', function () {

var $scope = {} , $translate = {} , $location ={}, $window = {}, localStorageService ={}, $rootScope ={}, $error = {};
var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
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
 				"paymentInfo":{
 					"payment": {},
 					"creditCard": {
 				        "cardNumber": "3214112341234121342",
 				        "expeditionDate": "2016-02",
 				        "expirationDate": "2025-05"
 				      },
 					"billingInformation":{
 						"billingInfo":{
 							"businessName": "BusinessName1",
 		                    "firstName": "FirstName4",
 		                    "lastName": "LastName4",
 		                    "phoneNumber": "0000000000",
 		                    "emailAddress": "0@0.0"
 						},
 						"billingAddress":{
 							 "addressLine1": "AddressLine13",
 		                    "addressLine2": "AddressLine23",
 		                    "addressLine3": "AddressLine33",
 		                    "city": "City4",
 		                    "state": "DistritoFederal",
 		                    "zip": "00000",
 		                    "suburb": "Suburb3",
 		                    "municipalOffice": "MunicipalOffice3"
 						}
 					}
 				},
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
            localStorageService.expedMonth= $scope.exped.month;
 		    localStorageService.expedYear= $scope.exped.year;
            SubscriberCtrl = $controller('SubscriberCtrl',{'$scope':$scope,'$rootScope':$rootScope,'$translate':$translate,'$location':$location,'$window':$window});
         
     		//Date
     		$scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate = new Date();
     		$scope.date = $scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate ;
     		$scope.subscriberInfoForm = "";
     		$scope.subscriberInfoForm.$invalid = "";
     		$scope.exped.year="2016";
     		$scope.expir.year="2017";
     		$scope.check=false;
}));

angular.isDefined(typeof localStorageService.expedMonth || typeof localStorageService.expedYear)
{
	 $scope.exped = "";
	 $scope.exped.month=14;
     $scope.exped.month=localStorageService.expedMonth;
     $scope.exped.year=localStorageService.expedYear;
}
angular.isDefined(typeof localStorageService.expedMonth || typeof localStorageService.expedYear)
{
	 $scope.exped.month=undefined;
     $scope.exped.month=localStorageService.expedMonth;
     $scope.exped.year=localStorageService.expedYear;
}
angular.isDefined(typeof localStorageService.expirMonth || typeof localStorageService.expirYear) 
{
	$scope.expir = "";
	$scope.expir.month=14;
    $scope.expir.month=localStorageService.expirMonth;
    $scope.expir.year=localStorageService.expirYear;
}
angular.isDefined(typeof localStorageService.expirMonth || typeof localStorageService.expirYear) 
{
	$scope.expir.month=undefined;
    $scope.expir.month=localStorageService.expirMonth;
    $scope.expir.year=localStorageService.expirYear;
}
describe('changeValidator',function(){
	it('Check validation  ',function(){
		$scope.DetailInformation.paymentInfo.payment.paymentType='Credit Card';
    	$scope.changeValidator();
    	expect($scope.validator.required).toBe(true);
	});
it('UnCheck validation  ',function(){
	$scope.DetailInformation.paymentInfo.payment.paymentType='Business';
	$scope.changeValidator();
	expect($scope.validator.required).toBe(false);
});
});

describe('subscriber info',function(){
	  it('Should be subscriber info  ',function(){
		  $scope.addressTypeInit.businessCheck=false;
		  $scope.addressTypeInit.mailCheck=true;
		   $scope.subscriberInfo();	
		   
		   if(expect($scope.subscriberInfoForm.$invalid)){
				$scope.formInvalid = 1;
		    	return;
		    }
		   
		   expect($rootScope.estimatedMonthdate).toBe($scope.estimated.month);
		   expect($rootScope.estimatedYeardate).toBe($scope.estimated.year);
		   expect(orderRequest.vdscRequestBean.customerInfo).toBe($scope.customerInfo);
		   expect(orderRequest.vdscRequestBean.products.equipment[0].deliveryInformation).toBe($scope.DetailInformation.deliveryInformation);
		   expect(orderRequest.vdscRequestBean.paymentInfo).toBe($scope.DetailInformation.paymentInfo);
		   expect(orderRequest.vdscRequestBean.customerInfo.customer.addressType).toBe($scope.addressList);
		   expect($scope.subscriber.vdscRequestBean.paymentInfo).toBe($scope.DetailInformation.paymentInfo);
		   expect($scope.subscriber.vdscRequestBean.products.equipment[0].deliveryInformation).toBe($scope.DetailInformation.deliveryInformation);
		   expect(StartTime).toBe($scope.delivery.StartTime);
		   expect(EndTime).toBe($scope.delivery.EndTime);
		   
		   if((expect(StartTime).not.toBe(null) && expect(StartTime).not.toBe('') && expect(StartTime).not.toBe('undefined')) && (expect(EndTime).not.toBe(null) && expect(EndTime).not.toBe('') && expect(EndTime).not.toBe('undefined')) ){
			    expect($scope.subscriber.vdscRequestBean.products.equipment[0].deliveryInformation.deliveryInfo.deliveryTime).toBe($scope.delivery.StartTime+" EST - "+$scope.delivery.EndTime+" EST");
			}
		   
		   if(expect($scope.exped.year).not.toBe("") || expect($scope.expir.year).not.toBe("") ){
				if (expect($scope.exped.year).toBeGreaterThan($scope.expir.year) || ((expect($scope.exped.year).toEqual($scope.expir.year)) && (expect($scope.exped.month).toBeGreaterThan($scope.expir.month)))){
					 expect($scope.validCardDate).toBe(true);
				     return;
				 }
	        }
		   
		   expect(expMonth).toBe($scope.exped.month);
		   expect(expYear).toBe($scope.exped.year);
		   localStorageService.expedMonth= $scope.exped.month;
		   localStorageService.expedYear= $scope.exped.year;
		   
		   if((expect(expMonth).not.toBe(null) && expect(expMonth).not.toBe('') && expect(expMonth).not.toBe('undefined'))	&& (expect(expYear).not.toBe(null) && expect(expYear).not.toBe('') && expect(expYear).not.toBe('undefined')) ){
				expect($scope.subscriber.vdscRequestBean.paymentInfo.creditCard.expeditionDate).toBe(expYear +"-"+expMonth);
				var displayexpeditionDate = expMonth+"/"+expYear.substr(expYear.length-2);
				localStorageService.set("displayexpeditionDate", displayexpeditionDate);
			}
		   
		    expect(expMonth).toBe($scope.expir.month);
			expect(expYear).toBe($scope.expir.year) ;
			
			localStorageService.expirMonth = $scope.expir.month;
		    localStorageService.expirYear = $scope.expir.year;
			
			if((expect(expMonth).not.toBe(null) && expect(expMonth).not.toBe('') && expect(expMonth).not.toBe('undefined') ) && (expect(expYear).not.toBe(null) && expect(expYear).not.toBe('') && expect(expYear).not.toBe('undefined'))){
				expect($scope.subscriber.vdscRequestBean.paymentInfo.creditCard.expirationDate).toBe(expYear +"-"+expMonth);
				var displayexpirationDate = expMonth+"/"+expYear.substr(expYear.length-2);
				localStorageService.set("displayexpirationDate", displayexpirationDate);

			}
			
			var delDate = $scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate;
			localStorageService.set("delDate", delDate.getDate());
			localStorageService.set("delMonth", delDate.getMonth());
			localStorageService.set("delYear", delDate.getFullYear());
			

			if(expect($scope.DetailInformation.paymentInfo.creditCard).not.toBe(null) ) {
				var creditCard = $scope.DetailInformation.paymentInfo.creditCard.cardNumber;
				if(expect(creditCard).not.toBe(null) ) {
					var maskCreditCardVal = "************" + creditCard.substr(creditCard.length-4);
					localStorageService.set("maskCreditCardVal", maskCreditCardVal);
				}
			}
			window.scrollTo(0,0);
			localStorageService.set("orderRequest", orderRequest);
		    $location.path('/step3');
		   
	  });
	  it('Should be subscriber info  ',function(){
		  $scope.delivery.StartTime='';
		  $scope.delivery.EndTime='';
		  $scope.subscriberInfo();	
	  });
	  it('Should be subscriber info  ',function(){
		  $scope.addressTypeInit = {
	                "businessCheck":false,
	                "deliveryCheck":false,
	                "mailCheck":false
	    	};
		  $scope.subscriberInfo();	
		  expect($scope.selectAtleastOneAddressType).toBe(true);
	  });
	  it('Should be subscriber info  ',function(){
		  $scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate = null;
		  $scope.subscriberInfo();	
	  });
	  it('Should be subscriber info  ',function(){
		  var tomorrow = new Date();
	      tomorrow.setDate(tomorrow.getDate() + 1);
		  $scope.estimated.year=tomorrow.getFullYear();
		  $scope.estimated.month=monthNames[tomorrow.getMonth()];
		  $scope.subscriberInfo();	
	  });
	  
	  it('Should be subscriber info  ',function(){
		  $scope.DetailInformation.paymentInfo.payment.paymentType='Personal';
		  $scope.subscriberInfo();	
	  });
	  it('Should be subscriber info  ',function(){
		  $scope.DetailInformation.paymentInfo.payment.paymentType=undefined;
		  $scope.subscriberInfo();	
	  });
	  it('Should be subscriber info  ',function(){
		  $scope.DetailInformation.paymentInfo.payment.paymentType='Credit Card';
		  $scope.exped.year=2016;
		  $scope.expir.year=2015;
		  $scope.subscriberInfo();	
	  });
	  it('Should be subscriber info  ',function(){
		  $scope.DetailInformation.paymentInfo.payment.paymentType='Debit Card';
		  $scope.exped.year=2016;
		  $scope.expir.year=2016;
		  $scope.exped.month=1;
		  $scope.expir.month=1;
		  $scope.subscriberInfo();	
	  });
	  it('Should be subscriber info  ',function(){
		  $scope.DetailInformation.paymentInfo.payment.paymentType='Debit Card';
		  $scope.exped.year=2016;
		  $scope.expir.year=2016;
		  $scope.exped.month=10;
		  $scope.expir.month=1;
		  $scope.subscriberInfo();	
	  });
	  it('Should be subscriber info  ',function(){
		  $scope.DetailInformation.paymentInfo.payment.paymentType='Credit Card';
		  $scope.DetailInformation.paymentInfo.creditCard.cardNumber=undefined;
		  $scope.exped.year=2016;
		  $scope.expir.year=2016;
		  $scope.exped.month=1;
		  $scope.expir.month=1;
		  $scope.subscriberInfo();	
	  });
	  it('Should be subscriber info  ',function(){
		  $scope.DetailInformation.paymentInfo.payment.paymentType='Credit Card';
		  $scope.DetailInformation.paymentInfo.creditCard.cardNumber=null;
		  $scope.exped.year=2016;
		  $scope.expir.year=2016;
		  $scope.exped.month=1;
		  $scope.expir.month=1;
		  $scope.subscriberInfo();	
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
describe('addressSelection',function(){
	  it('Should be subscriber info  ',function(){
		  var type = 'Business';
		  var idx = $scope.selection.indexOf(type);
		  
		  $scope.addressSelection();
		  expect($scope.selection.indexOf(type)).toBe(idx);
		  
		  if (idx > -1) {
	          $scope.selection.splice(idx, 1);
	          if(type==="Business"){
	        	expect($scope.addressTypeInit.businessCheck).toBe(false);
	          	expect($scope.DetailInformation.paymentInfo.billingInformation).toBe({});
	          }else if(type==="Delivery"){
	        	expect($scope.addressTypeInit.deliveryCheck).toBe(false);
	          	expect($scope.DetailInformation.deliveryInformation.deliveryAddress).toBe({});
	            expect($scope.DetailInformation.deliveryInformation.deliveryInfo.phoneNumber).toBe('');
	            expect($scope.DetailInformation.deliveryInformation.deliveryInfo.firstName).toBe('');
	          }else if(type==="Mail"){
	        	  expect($scope.addressTypeInit.mailCheck).toBe(false);
	          }
	        }else {
	          $scope.selection.push(type);
	          if(type==="Business"){
	        	  $scope.addressTypeInit.businessCheck = true;
	          	$scope.DetailInformation.paymentInfo.billingInformation={
	          			"billingAddress":{},
	          			"billingInfo":{}
	          	};
	          	expect($scope.DetailInformation.paymentInfo.billingInformation.billingAddress).toBe($scope.DetailInformation.paymentInfo.billingInformation.billingAddress);
	          	expect($scope.DetailInformation.paymentInfo.billingInformation.billingInfo.phoneNumber).toBe($scope.customerInfo.customer.legalRepPhone);//$scope.customerInfo.customer.phoneNumber;
	          	expect($scope.DetailInformation.paymentInfo.billingInformation.billingInfo.businessName).toBe($scope.customerInfo.customer.businessName);          	
	          	expect($scope.DetailInformation.paymentInfo.billingInformation.billingInfo.firstName).toBe($scope.customerInfo.customer.firstName);
	          }else if(type==="Delivery"){
	        	expect($scope.addressTypeInit.deliveryCheck).toBe(true);
	          	expect($scope.DetailInformation.deliveryInformation.deliveryAddress).toBe($scope.customerInfo.address);
	          	expect($scope.DetailInformation.deliveryInformation.deliveryAddress.state).toBe($scope.customerInfo.address.state);
	            expect($scope.DetailInformation.deliveryInformation.deliveryInfo.phoneNumber).toBe($scope.customerInfo.customer.phoneNumber);
	            expect($scope.DetailInformation.deliveryInformation.deliveryInfo.firstName).toBe($scope.customerInfo.customer.firstName);
	          }else if(type==="Mail"){
	        	  expect($scope.addressTypeInit.mailCheck).toBe(true);
	          }
	        }
	        expect($scope.addressList).toBe('Mail,');
	        expect($scope.addressTypeInit.businessCheck).toBe(true);
	        expect($scope.selectAtleastOneAddressType).toBe(false);
	  });
	  
	  it('Should be Mail  ',function(){
		  $scope.addressTypeInit = {
	                "businessCheck":false,
	                "deliveryCheck":false,
	                "mailCheck":true
	    	};
		  $scope.addressSelection("Mail");
		  expect($scope.addressTypeInit.mailCheck).toBe(false);
		$scope.addressSelection("Mail");
		  expect($scope.addressTypeInit.deliveryCheck).toBe(false);
		  $scope.addressSelection("Nothing");
	  });
	  it('Should be Delivery  ',function(){
		  $scope.addressTypeInit = {
	                "businessCheck":false,
	                "deliveryCheck":false,
	                "mailCheck":true
	    	};
		  $scope.check=false;
		  $scope.addressSelection("Delivery");
		  expect($scope.addressTypeInit.deliveryCheck).toBe(true);
		  $scope.addressSelection("Delivery");
		  expect($scope.addressTypeInit.deliveryCheck).toBe(false);
	  });
});

describe('autoCheckedAddressType',function(){
	  it('auto check address  ',function(){
		  $scope.check=false;
		  $scope.addressTypeInit.businessCheck = true;
		  $scope.addressTypeInit.deliveryCheck = true;
		  $scope.addressTypeInit.mailCheck = true;
		   $scope.autoCheckedAddressType();
		   if($scope.addressTypeInit.businessCheck == true){
			   $scope.check=false;
	    		  $scope.addressSelection("Business");
	    	  }
	    	  if($scope.addressTypeInit.deliveryCheck == true){
	    		  $scope.check=false;
	    		  $scope.addressSelection("Delivery");
	    	  }
	    	  if($scope.addressTypeInit.mailCheck == true){
	    		  $scope.check=false;
	    		  $scope.addressSelection("Mail");
	    	  }
	  });
});

describe('changeToDeliveryAddressState',function(){
	  it('change To Delivery Address State  ',function(){
          $scope.changeToDeliveryAddressState();
	  });
});

describe('setDate',function(){
	  it('Should set date  ',function(){
		   $scope.setDate();
	  });
});

describe('returnStep',function(){
	  it('Should returnStep  ',function(){
		   $scope.returnStep();
	  });
});
    
describe('today',function(){
	  it('Should be todays date  ',function(){
		   $scope.today();
		   console.log("$scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate =" + $scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate);
		
	  });
});

describe('clear',function(){
	  it('Should clear the date  ',function(){
		   $scope.clear();
		   expect($scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate).toBe(null);
		   console.log("$scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate =" + $scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate);
		
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

describe('populateDeliveryDate',function(){
	it('Should be todays date  ',function(){
    	$scope.populateDeliveryDate(undefined);
	});
	it('Should be todays date  ',function(){
    	$scope.populateDeliveryDate(null);
	});
	it('Should be clear  ',function(){
    	$scope.populateDeliveryDate('June - 2016');
	});
});

describe('changeDates',function(){
	it('Should be false  ',function(){
    	$scope.changeDates();
    	expect($scope.validCardDate).toBe(false);
	});
});
describe('getMonthInfo',function(){
	it('Should be English  ',function(){
		$scope.currentLang='en-us';
    	$scope.getMonthInfo(1,false);
	});
	it('Should be Spanish  ',function(){
		$scope.currentLang='';
    	$scope.getMonthInfo(1,false);
	});
});
describe('validateLocalStorage',function(){
	it('Should be true  ',function(){
    	$scope.validateLocalStorage('delDate');
	});
	it('Should be true  ',function(){
    	$scope.validateLocalStorage('xyz');
	});
});
describe('monthSelection',function(){
	it('Should be disabling March 2016 English',function(){
		var val="March";
		var currentLanguage="en-us";
		var today = new Date(2016,3,1);
    	$scope.monthSelection();
    	expect($scope.yearList[0].disabled).toBe(true);
	});
	it('Should be enabling June 2016 English',function(){
		var val="June";
		var currentLanguage="en-us";
		var today = new Date(2017,3,1);
    	$scope.monthSelection();
    	expect($scope.yearList[1].disabled).toBe(false);
	});
	it('Should be disabling March 2016 Spanish',function(){
		var val="Marzo";
		var currentLanguage="es-mx";
		var today = new Date(2016,3,1);
    	$scope.monthSelection();
    	expect($scope.yearList[0].disabled).toBe(true);
	});
	it('Should be enabling June 2016 Spanish',function(){
		var val="Junio";
		var currentLanguage="es-mx";
		var today = new Date(2017,3,1);
    	$scope.monthSelection();
    	expect($scope.yearList[1].disabled).toBe(false);
	});
});

describe('yearSelection',function(){
	it('Should be disabling months of 2015 English',function(){
		var val=2015;
		$scope.estimated.year=2015;
		var currentLanguage="en-us";
		localStorageService.set("langKey", "en-us");
		var today = new Date(2016,3,1);
    	$scope.yearSelection();
    	expect($scope.monthList[3].disabled).toBe(true);
	});
	it('Should be disabling months of 2015 Spanish',function(){
		var val=2015;
		$scope.estimated.year=2015;
		var currentLanguage="es-mx";
		var today = new Date(2016,3,1);
    	$scope.yearSelection();
    	expect($scope.monthList[3].name).toBe("Abril");
	});
	it('Should be enabling 2016 English',function(){
		var val=2016;
		$scope.estimated.year=2016;
		var currentLanguage="en-us";
		localStorageService.set("langKey", "en-us");
		var today = new Date(2016,3,1);
    	$scope.yearSelection();
    	expect($scope.monthList[0].disabled).toBe(true);
    	expect($scope.monthList[10].disabled).toBe(false);
	});
	it('Should be enabling 2016 Spanish',function(){
		var val=2016;
		$scope.estimated.year=2016;
		localStorageService.set("langKey", "es-mx");
		var today = new Date(2016,3,1);
    	$scope.yearSelection();
    	expect($scope.monthList[0].disabled).toBe(true);
    	expect($scope.monthList[10].disabled).toBe(false);
	});
	it('Should be enabling 2016 Spanish',function(){
		var val=2016;
		$scope.estimated.year=null;
		localStorageService.set("langKey", "es-mx");
		var today = new Date(2016,3,1);
    	$scope.yearSelection();
	});
	it('Should be enabling 2015 English',function(){
		var val=2015;
		$scope.estimated.year=2015;
		localStorageService.set("langKey", "en-us");
		var today = new Date(2016,3,1);
    	$scope.yearSelection();
	});
	it('Should be enabling 2016 English',function(){
		var val=2016;
		$scope.estimated.year=2016;
		localStorageService.set("langKey", "en-us");
		var today = new Date(2016,3,1);
    	$scope.yearSelection();
	});
	it('Should be enabling 2030 English',function(){
		var val=2030;
		$scope.estimated.year=2030;
		localStorageService.set("langKey", "en-us");
		var today = new Date(2016,3,1);
    	$scope.yearSelection();
	});
	it('Should be enabling 2030 Spanish',function(){
		var val=2030;
		$scope.estimated.year=2030;
		localStorageService.set("langKey", "es-mx");
		var today = new Date(2016,3,1);
    	$scope.yearSelection();
	});
});
  
});