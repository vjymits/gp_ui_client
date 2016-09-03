describe('login section', function () {

	var $scope = {} , $translate = {} , $http = {}, $location ={}, $window = {}, localStorageService ={}, $rootScope ={},$invalid={}, $error = {};

    beforeEach(module('myApp.login'));

    var $controller, $http;
    var loginCtrl;

    beforeEach(inject(function (_$controller_, _$location_, $httpBackend,_localStorageService_) {
    	$controller = _$controller_;
    	$location = _$location_;
    	httpBackend = $httpBackend;
    	localStorageService=_localStorageService_;

         spyOn($location, 'path').and.returnValue('/step1');
         
         $translate = {
        		  use: jasmine.createSpy('$translate.use')
        }
     	loginCtrl = $controller('LoginCtrl',{'$scope':$scope,'$location':$location,'$translate':$translate});
         $scope.loginForm ="";
     	$scope.loginForm.$invalid="";
    }));
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    describe('loginSubmit',function(){
    	 it('should validate user Credentials', function () {
        	$scope.username = 'admin';
        	$scope.password = 'admin';
        	httpBackend.expect('POST', '/api/gateway/oauth/token')
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
        	
        	$scope.loginSubmit();
        	httpBackend.flush();
        	if($scope.userNamepasswordErrorCheck){
        		expect($scope.userNamepasswordErrorCheck).toBe(true);
        		console.log("userNamepasswordErrorCheck true = "+$scope.userNamepasswordErrorCheck);
        		return;
        	}
        	 
    	 });
    	 it('should invalidate user Credentials', function () {
    		 $scope.username = '';
    		 httpBackend.expect('POST', '/api/gateway/oauth/token')
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
    		 $scope.loginSubmit();
    		 httpBackend.flush();
    		 expect($scope.userNamepasswordErrorCheck).toBe(false);
    	 });
    	 it('should invalidate user Credentials', function () {
    		 $scope.username = 'admin';
    		 $scope.password = '';
    		 httpBackend.expect('POST', '/api/gateway/oauth/token')
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
    		 $scope.loginSubmit();
    		 httpBackend.flush();
    		 expect($scope.userNamepasswordErrorCheck).toBe(false);
    	 });
    	 it('should invalidate user Credentials', function () {
    		 $scope.loginForm.$invalid=true;
    		 httpBackend.expect('POST', '/api/gateway/oauth/token')
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
    		 $scope.loginSubmit();
    		 httpBackend.flush();
    	 });
    	 it('should invalidate user Credentials', function () {
    		 $scope.loginForm.$invalid=false;
    		 httpBackend.expect('POST', '/api/gateway/oauth/token')
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
    		 $scope.loginSubmit();
    		 httpBackend.flush();
    	 });
    	 it('should invalidate user Credentials', function () {
         	$scope.username = 'admin';
         	$scope.password = 'admin';
         	httpBackend.expect('POST', '/api/gateway/oauth/token')
             .respond(404, null);
         	$scope.loginSubmit();
         	httpBackend.flush();
         	if($scope.userNamepasswordErrorCheck){
         		expect($scope.userNamepasswordErrorCheck).toBe(true);
         		console.log("userNamepasswordErrorCheck true = "+$scope.userNamepasswordErrorCheck);
         		return;
         	}
     	 });
    });
    
    describe('requestToken',function(){
    	it('Should get the token',function(){
    		httpBackend.expect('POST', '/api/gateway/oauth/token')
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
            $scope.requestToken();
    		httpBackend.flush();
    		expect($scope.refreshToken).toBe('80ef549e8a7488283810b41f5f9ac6bd');
    		expect($location.path()).toBe('/step1');
    	});
    });
    
    describe('changeLanguage',function(){
    	it('Should Change the language',function(){
    		$scope.changeLanguage('es-mx');
        	expect($scope.userNamepasswordErrorCheck).toBe(false);
        	expect($translate.use).toHaveBeenCalledWith('es-mx');
    		console.log("userNamepasswordErrorCheck false = "+$scope.userNamepasswordErrorCheck);
    		
    	});
    });
    
    describe('goHome',function(){
    	it('Should Go to Home ',function(){
        	$scope.goHome();
        	 localStorageService.set("estimatedMonthdate",undefined);
             localStorageService.set("estimatedYeardate",undefined);
             localStorageService.remove("expedMonth");
 			 localStorageService.remove("expedYear");
 			 localStorageService.remove("expirMonth");
 			 localStorageService.remove("expirYear");
        	 expect($location.path()).toBe('/step1');
    		
    	});
    });
    
    describe('toggleCustom',function(){
    	it('Should toggle ',function(){
        	$scope.toggleCustom();
        	expect($scope.custom).toBe(false);
        	console.log("custom ="+$scope.custom);
    	});
    	it('Should toggle ',function(){
    		$scope.custom=false;
        	$scope.toggleCustom();
        	expect($scope.custom).toBe(true);
        	console.log("custom ="+$scope.custom);
    	});
    });
    
});

