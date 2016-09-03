(function () {

    angular.module('myApp.login')
        .controller('LoginCtrl',  LoginController);
    LoginController.$inject = ['$scope','$http','$translate','$location','localStorageService'];
    function LoginController($scope, $http, $translate,$location,localStorageService) {
    	if($location.path()==="/success" && localStorageService.get("userName")===""){
    		$location.path('/');
    	}
        var currentLanguage = localStorageService.get("langKey");
        var vm = this;
        vm.name = 'Oauth Token Test';
        vm.token = "";
        vm.tokenType = "";
        vm.responseData = "";
        $scope.currentLanguage=currentLanguage;
        $scope.custom = true;
        var userName = "",password = "";
        $scope.success=localStorageService.get("success");
        $scope.custom = true;
        localStorageService.set("StartTime","");
        localStorageService.set("EndTime","");
    	var orderRequest = {
    			"vdscRequestBean":{
    				"header":{
    					"requestType":"Activate_Service",
    					"orderType":"",
    					"checkOnlineNextelBill":"false",
    					"emailDisclaimer":"false",
    					"monthlyChargeAcceptance":"false",
    					"internalId":"D2D"+Math.random()
    				},
    				"salesRepInformation":{},
    				"customerInfo":"",
    				"paymentInfo":{
    					"billingInformation":{},
    					"creditCard":{},
    					"payment":{}
    				},
    				"referenceInfo":"",
    				"authorizeCreditReportRequest":"",
    				"products": {
    					"ratePlan":[{}],
    					"equipment":[{}]
    				},
    				"tacAcceptance": {
    				      "name": "Provision of Services",
    				      "version": "PROFECO_1987-2016",
    				      "acceptanceDate": new Date(),
    				      "documentType":"Email. Hard Copy"
    				    }
    			}
    	};
    	var addressTypeInit = {
                "businessCheck":false,
                "deliveryCheck":false,
                "mailCheck":true
    	};
    	localStorageService.set("addressTypeInit", addressTypeInit);
    	var saleChannelInit = {
    	        "directCheck":false,
                "indirectCheck":false,
                "sisCheck":false,
                "kioskCheck":false,
                "capCheck":false,
                "dsCheck":false,
                "nsCheck":false
    	};
    	localStorageService.set("saleChannelInit", saleChannelInit);
    	var Initial={
        		"accountType":true
        };
    	localStorageService.set("Initial", Initial);
    	$scope.custom = true;
    	$scope.userNamepasswordErrorCheck = false;
    	$scope.userNamepasswordInvalid = false;
        $scope.loginSubmit = function() {
        	$scope.userNamepasswordInvalid = false;
        	$scope.userNamepasswordErrorCheck = false;
		    userName = $scope.username;
		    password = $scope.password;
		  if($scope.loginForm.$invalid){
		    	$scope.userNamepasswordErrorCheck = true;
				return;
		  }
		//$scope.requestToken();
	    if(userName=='admin' && password=='admin'){
		   localStorageService.set("userName", userName);
	    	$location.path('/step1');
	    }else{
	    	$location.path('/');
	    }
        };
        $scope.requestToken = function() {
            var req = {
                method: 'POST',
                url: "/api/gateway/oauth/token",
                data: "grant_type=password&username="+$scope.username+"&password="+$scope.password+"&client_id=oauth_gui_client",
                headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept':'*/*'}
            };
            $http(req).then(function mySuccess(response) {
                $scope.tokenResponseStatus = response.status;
                var responseVar = response.data;
                $scope.accessToken = responseVar.tokenKey;
                vm.token = responseVar.tokenKey;
                $scope.tokenType = responseVar.tokenType;
                var tokenType = $scope.tokenType.charAt(0).toUpperCase() + $scope.tokenType.slice(1);
                vm.tokenType = tokenType;
                var currentDate = new Date();
                currentDate.setSeconds(currentDate.getSeconds() + responseVar.expiresIn);
                $scope.expiration = currentDate;
                $scope.refreshToken = responseVar.refreshToken;
                localStorageService.set("userName", userName);
                localStorageService.set("tokenType", tokenType);
                localStorageService.set("token", responseVar.tokenKey);
                localStorageService.set("refreshToken", responseVar.refreshToken);
                console.log("Token : "+responseVar.tokenKey);
                $location.path('/step1');
            }, function myError(response) {
                $scope.tokenResponseStatus = response.status;
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                $scope.userNamepasswordInvalid =true;
                $location.path('/');
            });
        };
        $scope.changeLanguage = function (key){
        	$scope.userNamepasswordErrorCheck = false;
        	$scope.userNamepasswordInvalid =false;
        	localStorageService.set("langKey", key);
        	$scope.currentLanguage=key;
    		$translate.use(key);
    	};
    	localStorageService.set("orderRequest", orderRequest);
    	$scope.goHome = function(){
    		localStorageService.set("estimatedMonthdate",undefined);
    		localStorageService.set("estimatedYeardate",undefined);
			localStorageService.remove("expedMonth");
			localStorageService.remove("expedYear");
			localStorageService.remove("expirMonth");
			localStorageService.remove("expirYear");
    		localStorageService.remove("success");
    		localStorageService.remove("delYear");
    		localStorageService.remove("delMonth");
    		localStorageService.remove("delDate");
    		localStorageService.remove("maskCreditCardVal");
    		$location.path('/step1');
    	};
        $scope.toggleCustom = function() {
        	$scope.custom = $scope.custom === false ? true: false;
        };
    };
})();
