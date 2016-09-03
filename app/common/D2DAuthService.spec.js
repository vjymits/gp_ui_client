describe( 'D2D auth service', function() {

	beforeEach(module( 'myApp.D2DAuthService' ));
	
  var D2DAuthService;
  var localStorageService;
  var $scope = {} , $translate = {} , $http = {}, $location ={}, $window = {}, localStorageService ={}, $rootScope ={}, $httpBackend={};
  var $injector, resetOauthToken;
  $scope.orderRequest = {
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
  
  

  beforeEach(inject(function(_$httpBackend_,_$http_,_$q_, _$location_,_$rootScope_ , _localStorageService_,_D2DAuthService_) { 
	  
	$http = _$http_;
  	$location = _$location_;
  	$rootScope = _$rootScope_;
  	localStorageService = _localStorageService_;
  	D2DAuthService=_D2DAuthService_;
	$httpBackend = _$httpBackend_;
	$q = _$q_;
	
		
	$scope.$on = function() {};  	
  	spyOn($location, 'path').and.returnValue('/step2');
    spyOn(localStorageService,'get').and.returnValue($scope.orderRequest);
    $httpBackend.when('POST', '/api/gateway/oauth/token')
    .respond({
        "success": true,
        "tokenKey":"000000000#000145872959937",
        "tokenType":"bearer",
        "refreshToken":"80ef549e8a7488283810b41f5f9ac6bd",
        "expiresIn":3600,
        "issuedAt":-1,
        "parameters":{},
        "approvedScope":null
    });
      $translate = {
      	  use: jasmine.createSpy('$translate.use')
      }
}));
  
describe('resetOauthToken',function(){
		it('Should be resetOauthToken in Page3 ',function(){
	    	
	    	 var tokenResponseStatus = 0;
	         var responseVar = {};
	         var token = '';
	         var tokenType = '';
	         var refreshToken = '';
	         D2DAuthService.resetOauthToken();
	         $httpBackend.flush();
		});
	});
describe('postOrderToGateway',function(){
	it('Should be postOrderToGateway pass ',function(){
		var forms = JSON.stringify($scope.orderRequest);
		D2DAuthService.postOrderToGateway('/api/gateway/oauth/token',forms);
		$httpBackend.flush();
	});
	it('Should be postOrderToGateway failed 401 ',function(){
		var forms = JSON.stringify($scope.orderRequest);
		$httpBackend.when('POST', '/api/gateway/public/vdsc/v1/create')
	      .respond(401, null);   
		D2DAuthService.postOrderToGateway('/api/gateway/public/vdsc/v1/create',forms);
		$httpBackend.flush();
	});
	it('Should be postOrderToGateway failed 500 ',function(){
		var forms = JSON.stringify($scope.orderRequest);
		$httpBackend.when('POST', '/api/gateway/public/vdsc/v1/create')
	      .respond(500, null);   
		D2DAuthService.postOrderToGateway('/api/gateway/public/vdsc/v1/create',forms);
		$httpBackend.flush();
	});
  });
});