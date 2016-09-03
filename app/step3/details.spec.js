describe('details Info section', function () {

var $scope = {} , $translate = {} , $http = {}, $location ={}, $window = {}, localStorageService ={}, $rootScope ={};
	
beforeEach(module('myApp.step3'));

	var $controller;
	var detailsCtrl,localStorageService;
	
	var chekdeliveryfound=true;
	        
    $scope.orderRequest = {
 			"vdscRequestBean":{
    	    "header": {
    	        "requestType": "Activate_Service",
    	        "orderType": "Persona Fisica",
    	        "langId": "es-mx",
    	        "internalId": "D2D0.8387235105814838",
    	        "customerType": "New",
    	        "carrier": "Nextel",
    	        "subscriberGuarantee": "",
    	        "checkOnlineNextelBill": true,
    	        "emailDisclaimer": true,
    	        "advertisingDisclaimer": true,
    	        "customerSignature": true,
    	        "notes": "fsdfsdfsdf"
    	      },
    	      "salesRepInformation": {
    	        "salesChannel": "Direct",
    	        "appointmentDate": "2016-03-15T08:04:33.001Z",
    	        "firstName": "s",
    	        "placeOfSale": "s",
    	        "city": "s",
    	        "folioNumber": "s",
    	        "replacementFolio": "s",
    	        "salesRepKey": "s",
    	        "pointOfSalekey": "s",
    	        "cadKey": "s",
    	        "cadName": "ss",
    	        "salesCoordinator": "ss"
    	      },
    	      "customerInfo": {
    	        "customer": {
    	          "accountType": "Small Account",
    	          "businessName": "1",
    	          "firstName": "1",
    	          "rfc": "1",
    	          "legalRepresentative": "1",
    	          "nationality": "1",
    	          "legalRepPhone": "+52852963852",
    	          "phoneNumber": "+52852963852",
    	          "idType": "3123",
    	          "idNumber": "3123123",
    	          "customerCategory": "3123123",
    	          "addressType": "Mail,Business,Delivery",
    	          "emailAddress": "sfadfsa@fsdf.gfd"
    	        },
    	        "address": {
    	          "addressLine1": "1",
    	          "suburb": "dwadadww",
    	          "municipalOffice": "ss",
    	          "state": "Hidalgo",
    	          "zip": "23445"
    	        }
    	      },
    	      "paymentInfo": {
    	        "payment": {
    	          "paymentType": "Legal entities",
    	          "equipment": "Charge or Return",
    	          "service": "Cash",
    	          "paymentMode": "Postpaid"
    	        },
    	        "billingInformation": {
    	          "billingInfo": {
    	            "phoneNumber": "+52852963852",
    	            "firstName": "1",
    	            "businessName": "1"
    	          },
    	          "billingAddress": {
    	            "addressLine1": "1",
    	            "suburb": "dwadadww",
    	            "municipalOffice": "ss",
    	            "state": "Hidalgo",
    	            "zip": "23445"
    	          }
    	        },
    	        "creditCard": {
    	          "cardNumber": "2313123424234434"
    	        }
    	      },
    	      "referenceInfo": {
    	        "referenceType": "Commercial",
    	        "referenceName": "sdsfsd",
    	        "contactName": "fgsdfsdf",
    	        "telephone": "+52852963963",
    	        "referenceDeclaration": true
    	      },
    	      "authorizeCreditReportRequest": {
    	        "authCreditInfo": {
    	          "authorizationDate": "2016-03-15T08:06:07.095Z",
    	          "customerName": "dasdas",
    	          "tin": "dsad",
    	          "phoneNumber": "+52852963963"
    	        },
    	        "authAddress": {
    	          "addressLine1": "adasd",
    	          "suburb": "sadsad",
    	          "municipalOffice": "dsad",
    	          "state": "Chiapas",
    	          "zip": "34565"
    	        }
    	      },
    	      "products": {
    	        "ratePlan": [
    	          {
    	            "minTermForced": "true",
    	            "minTermLength": "6",
    	            "units": "1",
    	            "planType": "1",
    	            "features": "1",
    	            "unitPrice": "1",
    	            "totalPriceIvaIncluded": "1",
    	            "estimatedRenewalDate": "March-2019"
    	          }
    	        ],
    	        "equipment": [
    	          {
    	            "deviceInfo": {
    	              "units": "1",
    	              "description": "1",
    	              "features": "1",
    	              "deviceKey": "1",
    	              "unitPriceMpe": "1",
    	              "totalPriceIvaIncluded": "12"
    	            },
    	            "deliveryInformation": {
    	              "deliveryAddress": {
    	                "addressLine1": "1",
    	                "suburb": "dwadadww",
    	                "municipalOffice": "ss",
    	                "state": "Hidalgo",
    	                "zip": "23445"
    	              },
    	              "deliveryInfo": {
    	                "deliveryDate": "2016-03-15T08:04:49.908Z",
    	                "phoneNumber": "+52852963852",
    	                "firstName": "1"
    	              }
    	            }
    	          }
    	        ]
    	      },
    	      "tacAcceptance": {
    	        "name": "Accepted"
    	      }
    	    }
    };
        
beforeEach(inject(function (_$controller_, _$location_ , _localStorageService_,_$httpBackend_) {
        	$controller = _$controller_;
        	$location = _$location_;
        	localStorageService = _localStorageService_;
        	$httpBackend = _$httpBackend_;
            spyOn($location, 'path').and.returnValue('/step2');
            spyOn(localStorageService,'get').and.returnValue($scope.orderRequest);
            
            $scope.$on=function(){};
            $translate = {
            	  use: jasmine.createSpy('$translate.use')
            }
            detailsCtrl = $controller('DetailsCtrl',{'$scope':$scope,'$rootScope':$rootScope,'$translate':$translate,'$location':$location,'$window':$window});
            
    		if(localStorageService.get("userName")===""){
        		$location.path('/');
        	}
    		
    		 var tokenResponseStatus = 0;
             var responseVar = {};
             var token = '';
             var tokenType = '';
             var refreshToken = '';
          
             $httpBackend.when('POST', '/api/gateway/oauth/token')
             .respond('{"tokenKey":"tokenKey","tokenType":"bearer","refreshToken":"refreshToken","expiresIn":3600,"issuedAt":-1,"parameters":{},"approvedScope":null}');
   		  
}));
  
afterEach(function() {
	$httpBackend.verifyNoOutstandingRequest();
});

describe('getAddressType',function(){
	  it('Should be Mail address  ',function(){
		 $scope.getAddressType(2);
		 expect($scope.addressType).toBe('Mailing Address');
	  });
	  it('Should be Physical Address  ',function(){
			 $scope.getAddressType(3);
			 expect($scope.addressType).toBe('Physical Address');
	  });
	  it('Should be Mail Address, Physical Address  ',function(){
			 $scope.getAddressType(5);
			 expect($scope.addressType).toBe('Mailing Address, Physical Address');
	  });
});

describe('today',function(){
	  it('Should be todays date  ',function(){
		  $scope.details.vdscRequestBean.customerInfo.customer.addressType = "Mail,Business,Delivery";
		   $scope.today();
		   //console.log("$scope.salesRepInformation.appointmentDate ="+$scope.salesRepInformation.appointmentDate);
		
	  });
});

describe('clear',function(){
	  it('Clear todays date  ',function(){
		   $scope.clear();
		   expect($scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate).toBe(null);
		   console.log("$scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate ="+$scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate);
		
	  });
});

describe('unmaskedCC',function(){
	  it('unmaskedCC data  ',function(){
		   $scope.unmaskedCC();
		   expect($scope.maskedCC).toBe(false);
	  });
});

describe('submitDetailInfo',function(){
	
	  it('submitt details  ',function(){
		  $scope.detailsForm = "";
		  $scope.detailsForm.$invalid = false;
		  $scope.gaurentee="";
		  $scope.gaurentee.cash =undefined;
		  $scope.details.vdscRequestBean.authorizeCreditReportRequest.authCreditInfo.phoneNumber='333-333-3333';
		  $httpBackend.when('POST', '/api/gateway/oauth/token')
          .respond('{"tokenKey":"tokenKey","tokenType":"bearer","refreshToken":"refreshToken","expiresIn":3600,"issuedAt":-1,"parameters":{},"approvedScope":null}');
		  
		  $scope.submitDetailInfo();
		  /*$httpBackend.flush();*/
		   if($scope.detailsForm.$invalid){			    
				expect($scope.detailsFieldsInfo).toBe(true);
		    	return;
		    }
		   
		   var cCheck = false;
		   var bCheck = false;
           var pCheck = false;
           // expect($location.path()).toBe('/success');
        	expect($scope.details.vdscRequestBean.header.subscriberGuarantee).toBe("");
        
		  	expect($scope.details.vdscRequestBean.authorizeCreditReportRequest).toBe($scope.DetailInformation.authorizeCreditReportRequest);
			expect($scope.details.vdscRequestBean.referenceInfo).toBe($scope.DetailInformation.referenceInfo);
			expect($scope.details.vdscRequestBean.paymentInfo.billingInformation).toBe($scope.DetailInformation.paymentInfo.billingInformation);
				
			expect($scope.details.vdscRequestBean.customerInfo.customer.legalRepPhone).toBe($scope.details.vdscRequestBean.customerInfo.customer.legalRepPhone.replace(/-/g,''));
			expect($scope.details.vdscRequestBean.customerInfo.customer.phoneNumber).toBe($scope.details.vdscRequestBean.customerInfo.customer.phoneNumber.replace(/-/g,''));
			expect($scope.details.vdscRequestBean.referenceInfo.telephone).toBe($scope.details.vdscRequestBean.referenceInfo.telephone.replace(/-/g,''));

			if($scope.contains("Business,Mail", 'Business')){
				expect($scope.details.vdscRequestBean.paymentInfo.billingInformation.billingInfo.phoneNumber).toBe($scope.details.vdscRequestBean.paymentInfo.billingInformation.billingInfo.phoneNumber.replace(/-/g,''));
			}	
			if($scope.contains("Business,Delivery", 'Delivery')){
				expect($scope.details.vdscRequestBean.products.equipment[0].deliveryInformation.deliveryInfo.phoneNumber).toBe($scope.details.vdscRequestBean.products.equipment[0].deliveryInformation.deliveryInfo.phoneNumber.replace(/-/g,''));
			}

			if(expect($scope.details.vdscRequestBean.authorizeCreditReportRequest.authCreditInfo.phoneNumber).not.toBe(null)){
				expect($scope.details.vdscRequestBean.authorizeCreditReportRequest.authCreditInfo.phoneNumber).toBe($scope.details.vdscRequestBean.authorizeCreditReportRequest.authCreditInfo.phoneNumber.replace(/-/g,''));

			}
	  });
	  it('submitt details  ',function(){
		  $scope.detailsForm.$invalid = true;
		  $httpBackend.when('POST', '/api/gateway/oauth/token')
          .respond('{"tokenKey":"tokenKey","tokenType":"bearer","refreshToken":"refreshToken","expiresIn":3600,"issuedAt":-1,"parameters":{},"approvedScope":null}');
		  
		  $scope.submitDetailInfo();
		  /*$httpBackend.flush();*/
		   if($scope.detailsForm.$invalid){			    
				expect($scope.detailsFieldsInfo).toBe(true);
		    	return;
		    }
	  });
	  it('submitt details  ',function(){
		  $scope.detailsForm.$invalid = false;
		  $scope.details.vdscRequestBean.customerInfo.customer.phoneNumber=undefined;
		  $httpBackend.when('POST', '/api/gateway/oauth/token')
          .respond('{"tokenKey":"tokenKey","tokenType":"bearer","refreshToken":"refreshToken","expiresIn":3600,"issuedAt":-1,"parameters":{},"approvedScope":null}');
		  $scope.submitDetailInfo();
	  });
	  it('submitt details  ',function(){
		  $scope.detailsForm.$invalid = false;
		  $scope.details.vdscRequestBean.customerInfo.customer.legalRepPhone=null;
		  $httpBackend.when('POST', '/api/gateway/oauth/token')
          .respond('{"tokenKey":"tokenKey","tokenType":"bearer","refreshToken":"refreshToken","expiresIn":3600,"issuedAt":-1,"parameters":{},"approvedScope":null}');
		  $scope.submitDetailInfo();
	  });
	  it('submitt details  ',function(){
		  $scope.detailsForm.$invalid = false;
		  $scope.details.vdscRequestBean.authorizeCreditReportRequest.authCreditInfo.phoneNumber=null;
		  $httpBackend.when('POST', '/api/gateway/oauth/token')
          .respond('{"tokenKey":"tokenKey","tokenType":"bearer","refreshToken":"refreshToken","expiresIn":3600,"issuedAt":-1,"parameters":{},"approvedScope":null}');
		  $scope.submitDetailInfo();
	  });
	  it('submitt details  ',function(){
		  $scope.detailsForm.$invalid = false;
		  $scope.details.vdscRequestBean.authorizeCreditReportRequest.authCreditInfo.phoneNumber=undefined;
		  $httpBackend.when('POST', '/api/gateway/oauth/token')
          .respond('{"tokenKey":"tokenKey","tokenType":"bearer","refreshToken":"refreshToken","expiresIn":3600,"issuedAt":-1,"parameters":{},"approvedScope":null}');
		  $scope.submitDetailInfo();
	  });
	  it('submitt details  ',function(){
		  $scope.detailsForm.$invalid = false;
		  $scope.details.vdscRequestBean.authorizeCreditReportRequest.authCreditInfo.phoneNumber='333-333-3333';
		  $httpBackend.when('POST', '/api/gateway/oauth/token')
          .respond('{"tokenKey":"tokenKey","tokenType":"bearer","refreshToken":"refreshToken","expiresIn":3600,"issuedAt":-1,"parameters":{},"approvedScope":null}');
		  $scope.submitDetailInfo();
	  });
	  it('submitt details  ',function(){
		  $scope.detailsForm.$invalid = false;
		  $scope.details.vdscRequestBean.paymentInfo.payment.paymentType=undefined;
		  $httpBackend.when('POST', '/api/gateway/oauth/token')
          .respond('{"tokenKey":"tokenKey","tokenType":"bearer","refreshToken":"refreshToken","expiresIn":3600,"issuedAt":-1,"parameters":{},"approvedScope":null}');
		  $scope.submitDetailInfo();
	  });
	  it('submitt details  ',function(){
		  $scope.detailsForm.$invalid = false;
		  $scope.details.vdscRequestBean.paymentInfo.payment.paymentType=null;
		  $httpBackend.when('POST', '/api/gateway/oauth/token')
          .respond('{"tokenKey":"tokenKey","tokenType":"bearer","refreshToken":"refreshToken","expiresIn":3600,"issuedAt":-1,"parameters":{},"approvedScope":null}');
		  $scope.submitDetailInfo();
	  });
	  it('submitt details  ',function(){
		  $scope.detailsForm.$invalid = false;
		  $scope.details.vdscRequestBean.paymentInfo.payment.paymentType='Credit Card';
		  $httpBackend.when('POST', '/api/gateway/oauth/token')
          .respond('{"tokenKey":"tokenKey","tokenType":"bearer","refreshToken":"refreshToken","expiresIn":3600,"issuedAt":-1,"parameters":{},"approvedScope":null}');
		  $scope.submitDetailInfo();
	  });
	  it('submitt details  ',function(){
		  $scope.detailsForm.$invalid = false;
		  $scope.details.vdscRequestBean.paymentInfo.payment.paymentType='Debit Card';
		  $httpBackend.when('POST', '/api/gateway/oauth/token')
          .respond('{"tokenKey":"tokenKey","tokenType":"bearer","refreshToken":"refreshToken","expiresIn":3600,"issuedAt":-1,"parameters":{},"approvedScope":null}');
		  $scope.submitDetailInfo();
	  });
});

describe('toggleMin',function(){
	  it('toggleMin function  ',function(){
		  $scope.toggleMin();
	  });
});
describe('contains',function(){
	  it('contains function  ',function(){
		  $scope.contains("Business,Mail", 'Business');
	  });
	  it('contains function  ',function(){
		  $scope.contains("Business,Mail", null);
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

describe('setDate',function(){
	it('set date  ',function(){
    	$scope.setDate();
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

describe('returnStep2',function(){
	it('Should be return in Step2 ',function(){
    	$scope.returnStep2();
    	expect($location.path()).toBe('/step2');

	});
});

describe('contains',function(){
	it('Should be return in Step2 ',function(){
		var searchString = "Business,Mail";
		var searchTerm = "Mail";
		if(null != searchString.match(searchTerm)){
			return true;
		}else{
			return false;
		}

	});
});

it('should not be able to login with incorrect credential', function () {
    $httpBackend.when('POST', '/api/gateway/oauth/token').respond(401, null);    
});

});