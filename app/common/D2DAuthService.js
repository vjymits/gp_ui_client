(function () {
    'use strict';
    angular.module('myApp.D2DAuthService').factory('D2DAuthService', D2DAuthService);
    D2DAuthService.$inject = ['$http', '$location','localStorageService'];
    function D2DAuthService($http, $location,localStorageService) {
            var service = {
            	resetOauthToken:resetOauthToken,
                postOrderToGateway:postOrderToGateway
            };
            return service;
            function resetOauthToken(){
                var tokenResponseStatus = 0;
                var responseVar = {};
                var token = '';
                var tokenType = '';
                var req = {
                  'method': 'POST',
                  'url':'/api/gateway/oauth/token',
                  'data': 'grant_type=refresh_token&client_id=oauth_gui_client&refresh_token='+localStorageService.get("refreshToken"),
                  "headers": {'Content-Type': 'application/x-www-form-urlencoded', "Accept":'*/*'}
                };
                $http(req).then(function successCallback(successResponse){
                  tokenResponseStatus = successResponse.status;
                  responseVar = successResponse.data;
                  token = responseVar.tokenKey;
                  tokenType = responseVar.tokenType;
                  tokenType = tokenType.charAt(0).toUpperCase() + tokenType.slice(1);
                  tokenType = tokenType;
                  var currentDate = new Date();
                  currentDate.setSeconds(currentDate.getSeconds() + responseVar.expiresIn);
                  localStorageService.set("tokenType", tokenType);
                  localStorageService.set("token", responseVar.tokenKey);
                  localStorageService.set("refreshToken", responseVar.refreshToken);
                  console.log("resetOuthToken Called tokenType = " + tokenType);
                },function failureCallback(){
                  $location.path('/login');
                });
              }
            function postOrderToGateway(url, forms) {
                $http({
    	        	url : url,
    	        	method : 'POST',
    	        	data : forms,
    	        	headers: {'Content-Type': 'application/json','Authorization': localStorageService.get("tokenType") + " " + localStorageService.get("token")}
    	        }).then(function successCallback(successResponse){
    	        	console.log('the response is: '+successResponse.data);
    	        	localStorageService.set("success",JSON.parse(angular.toJson(successResponse.data)));
    	        	console.log(JSON.stringify);
    	        	$location.path('/success');
    	        },function failureCallback(failureResponse){
    		    	console.log('error call back called from service');
    		    	if(failureResponse.status === 401){
    		    		resetOauthToken();
        		    	$http({
            	        	url : url,
            	        	method : 'POST',
            	        	data : forms,
            	        	headers: {'Content-Type': 'application/json','Authorization': localStorageService.get("tokenType") + " " + localStorageService.get("token")}
            	        }).then(function successCallback(successResponse){
            	        	console.log('the response is: '+successResponse.data);
            	        	localStorageService.set("success",JSON.parse(angular.toJson(successResponse.data)));
            	        	console.log(JSON.stringify);
            	        	$location.path('/success');
            	        }
            	        );
    		    	}
    		    }
                );
            }
        }
})();
