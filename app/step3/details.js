(function (){
	angular.module('myApp.step3')
    .controller('DetailsCtrl',  DetailsController);
	DetailsController.$inject = ['$scope','$translate','$location','localStorageService','D2DAuthService'];
	function DetailsController($scope, $translate,$location,localStorageService,D2DAuthService) {
		var postUrl = '/api/gateway/public/vdsc/v1/create';
		$scope.alphaNumeric = /^[a-zA-Z0-9\s]*$/;
		if(localStorageService.get("userName")===""){
    		$location.path('/');
    	}
		$scope.DetailInformation = {
				"referenceInfo":{
								"referenceDeclaration":"false",
								"referenceType":"",
								"referenceName":"",
								"contactName":"",
								"telephone":""
								}
		};
		var orderRequest1 = localStorageService.get("orderRequest");
		var addCount=localStorageService.get("displayAddressType");
		$scope.addressType="";
		var selectedLanguage = localStorageService.get("langKey");
		$scope.details = orderRequest1;
		$scope.displayAddressType="lbl_addressType"+localStorageService.get("displayAddressType");
		$scope.delivery = {};
		$scope.exped = {};
		$scope.expir = {};
		$scope.test={};
		$scope.test1={};
		$scope.expir.year = "";
		$scope.expir.month = "";
		$scope.exped.year = "";
		$scope.exped.month = "";
		$scope.tacAcceptance="";
		$scope.username = localStorageService.get("userName");
		$scope.displayExpeditionDate = localStorageService.get("displayexpeditionDate");
		$scope.displayExpirationDate = localStorageService.get("displayexpirationDate");
		$scope.maskCreditCardVal = localStorageService.get("maskCreditCardVal");
		$scope.addressTypeArray = {};
		$scope.addressTypeArray = $scope.details.vdscRequestBean.customerInfo.customer.addressType.split(',');
		var chekdeliveryfound=true;
		var billingCheck=false;
		$scope.estimatedMonthdate = localStorageService.get("estimatedMonthdate");
	    $scope.estimatedYeardate = localStorageService.get("estimatedYeardate");
		for (var i = 0; i < $scope.addressTypeArray.length ; i++) {
	         if ($scope.addressTypeArray[i] === 'Delivery') {
	        	 $scope.test=$scope.details.vdscRequestBean.customerInfo.address;
	        	 $scope.test1=$scope.details.vdscRequestBean.customerInfo.customer;
	        	 chekdeliveryfound = false;
	         }
	         if($scope.addressTypeArray[i] === 'Business' || $scope.addressTypeArray[i] === 'Mail'){
	        	 $scope.test=$scope.details.vdscRequestBean.customerInfo.address;
	        	 $scope.test1=$scope.details.vdscRequestBean.customerInfo.customer;
	        	 billingCheck=true;
	         }
		}
		$scope.DetailInformation.deliveryInformation={
			deliveryAddress:$scope.test
		 };
		 $scope.DetailInformation.deliveryInformation.deliveryInfo = {
				 phoneNumber:$scope.test1.phoneNumber,
				 firstName:$scope.test1.firstName,
				 deliveryDate:''
		 };
		 $scope.DetailInformation.authorizeCreditReportRequest={
				 "authCreditInfo": {
					 "authorizationDate":''
				 },"authAddress": {}
		 };
		 $scope.DetailInformation.paymentInfo={
				 "billingInformation":{
					 "billingInfo":{},
					 "billingAddress":{}
				 }
		 };
		 if(billingCheck){
			 $scope.DetailInformation.paymentInfo.billingInformation.billingInfo.phoneNumber=$scope.test1.phoneNumber;
			 $scope.DetailInformation.paymentInfo.billingInformation.billingInfo.firstName=$scope.test1.firstName;
			 $scope.DetailInformation.paymentInfo.billingInformation.billingInfo.businessName=$scope.test1.businessName;
			 $scope.DetailInformation.paymentInfo.billingInformation.billingAddress=$scope.test;
		 }
		 $scope.getAddressType=function(addCount){
			 if((addCount===2 || addCount===6)){
				 $scope.addressType="Mailing Address";
			 }else if((addCount===3 || addCount===7)){
				 $scope.addressType="Physical Address";
			 }else if((addCount===5 || addCount===9)){
				 $scope.addressType="Mailing Address, Physical Address";
			 }
		};
		$scope.getAddressType(addCount);
		 $scope.today = function() {
		        $scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate = new Date();
		        $scope.DetailInformation.authorizeCreditReportRequest.authCreditInfo.authorizationDate = new Date();
		      };
		      $scope.today();
		      $scope.clear = function() {
		    	  $scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate = null;
		      };
		      $scope.toggleMin = function() {
		        $scope.minDate = $scope.minDate ? null : new Date();
		      };
		      $scope.toggleMin();
		      $scope.maxDate = new Date(2050, 12, 31);
		      $scope.open1 = function() {
		        $scope.popup1.opened = true;
		      };
		      $scope.open2 = function() {
		        $scope.popup2.opened = true;
		      };
		      $scope.setDate = function(year, month, day) {
		    	  $scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate = new Date(year, month, day);
		      };
		      $scope.dateOptions = {
		        formatYear: 'yy',
		        startingDay: 1
		      };
		      $scope.formats = ['dd-MM-yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		      $scope.format = $scope.formats[0];
		      $scope.altInputFormats = ['M!/d!/yyyy'];
		      $scope.popup1 = {
		        opened: false
		      };
		      $scope.popup2 = {
		        opened: false
		      };
		      var tomorrow = new Date();
		      tomorrow.setDate(tomorrow.getDate() + 1);
		      var afterTomorrow = new Date();
		      afterTomorrow.setDate(tomorrow.getDate() + 1);
		      $scope.events =
		        [
		          {
		            date: tomorrow,
		            status: 'full'
		          },
		          {
		            date: afterTomorrow,
		            status: 'partially'
		          }
		        ];
		      $scope.getDayClass = function(date, mode) {
			        if (mode === 'day') {
			          var dayToCheck = new Date(date).setHours(0,0,0,0);
			          for (var i = 0; i < $scope.events.length; i++) {
			            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
			            if (dayToCheck === currentDay) {
			              return $scope.events[i].status;
			            }
			          }
			        }
			        return '';
			      };
			$scope.detailsFieldsInfo = false;
			$scope.contains = function(searchString, searchTerm) {
				var found=false;
				if(null !== searchString.match(searchTerm)){
					found=true;
				}
				return found;
		    };
		  $scope.maskedCC = true;
		  $scope.unmaskedCC = function(){
			  $scope.maskedCC = false;
		  };
		  $scope.isDisabled = false;
		  $scope.submitDetailInfo = function() {
			  if($scope.detailsForm.$invalid){
		            return;
			  }
			  $scope.isDisabled = true;
			    $translate.use(localStorageService.get("langKey"));
				$scope.details.vdscRequestBean.authorizeCreditReportRequest = $scope.DetailInformation.authorizeCreditReportRequest;
				$scope.details.vdscRequestBean.referenceInfo = $scope.DetailInformation.referenceInfo;
				$scope.details.vdscRequestBean.paymentInfo.billingInformation = $scope.DetailInformation.paymentInfo.billingInformation;
				$scope.details.vdscRequestBean.header.langId = selectedLanguage.toString();;
				if($scope.details.vdscRequestBean.customerInfo.customer.phoneNumber !== undefined){
					$scope.details.vdscRequestBean.customerInfo.customer.phoneNumber = $scope.details.vdscRequestBean.customerInfo.customer.phoneNumber.replace(/-/g,'');
				}
				if($scope.details.vdscRequestBean.customerInfo.customer.legalRepPhone != null){
					$scope.details.vdscRequestBean.customerInfo.customer.legalRepPhone = $scope.details.vdscRequestBean.customerInfo.customer.legalRepPhone.replace(/-/g,'');
				}
				$scope.details.vdscRequestBean.referenceInfo.telephone=$scope.details.vdscRequestBean.referenceInfo.telephone.replace(/-/g,'');
				if($scope.contains($scope.details.vdscRequestBean.customerInfo.customer.addressType, 'Business') && $scope.details.vdscRequestBean.paymentInfo.billingInformation.billingInfo.phoneNumber !== undefined){
					$scope.details.vdscRequestBean.paymentInfo.billingInformation.billingInfo.phoneNumber = $scope.details.vdscRequestBean.paymentInfo.billingInformation.billingInfo.phoneNumber.replace(/-/g,'');
				}
				if($scope.contains($scope.details.vdscRequestBean.customerInfo.customer.addressType, 'Delivery') && $scope.details.vdscRequestBean.products.equipment[0].deliveryInformation.deliveryInfo.phoneNumber !== undefined){
					$scope.details.vdscRequestBean.products.equipment[0].deliveryInformation.deliveryInfo.phoneNumber=$scope.details.vdscRequestBean.products.equipment[0].deliveryInformation.deliveryInfo.phoneNumber.replace(/-/g,'');
				}
				$scope.details.vdscRequestBean.customerInfo.customer.addressType=$scope.addressType;
				if($scope.details.vdscRequestBean.authorizeCreditReportRequest.authCreditInfo.phoneNumber != null && $scope.details.vdscRequestBean.authorizeCreditReportRequest.authCreditInfo.phoneNumber !== undefined){
					$scope.details.vdscRequestBean.authorizeCreditReportRequest.authCreditInfo.phoneNumber=$scope.details.vdscRequestBean.authorizeCreditReportRequest.authCreditInfo.phoneNumber.replace(/-/g,'');
				}
				if($scope.details.vdscRequestBean.paymentInfo.payment.paymentType!==null && $scope.details.vdscRequestBean.paymentInfo.payment.paymentType!==undefined && $scope.details.vdscRequestBean.paymentInfo.payment.paymentType!=='Credit Card' && $scope.details.vdscRequestBean.paymentInfo.payment.paymentType!=='Debit Card'){
					$scope.details.vdscRequestBean.paymentInfo.creditCard={};
				}
			var deliveryDateVal = $scope.details.vdscRequestBean.products.equipment[0].deliveryInformation.deliveryInfo.deliveryDate;
			var phoneNumberVal = $scope.details.vdscRequestBean.products.equipment[0].deliveryInformation.deliveryInfo.phoneNumber;
			var firstNameVal = $scope.details.vdscRequestBean.products.equipment[0].deliveryInformation.deliveryInfo.firstName;
			var deliveryTimeVal = $scope.details.vdscRequestBean.products.equipment[0].deliveryInformation.deliveryInfo.deliveryTime;
			$scope.details.vdscRequestBean.products.equipment[0].deliveryInformation.deliveryInfo ={};
			$scope.details.vdscRequestBean.products.equipment[0].deliveryInformation.deliveryInfo.deliveryDate = deliveryDateVal;
			$scope.details.vdscRequestBean.products.equipment[0].deliveryInformation.deliveryInfo.phoneNumber = phoneNumberVal;
			$scope.details.vdscRequestBean.products.equipment[0].deliveryInformation.deliveryInfo.firstName = firstNameVal;
			$scope.details.vdscRequestBean.products.equipment[0].deliveryInformation.deliveryInfo.deliveryTime = deliveryTimeVal;
			$scope.details.vdscRequestBean.customerInfo.customer.deliveryDate=undefined;
			$scope.details.vdscRequestBean.customerInfo.customer.deliveryTime=undefined;
		    var forms = JSON.stringify($scope.details.vdscRequestBean);
		    console.log('the test is:'+JSON.stringify($scope.details.vdscRequestBean));
		    D2DAuthService.postOrderToGateway(postUrl,forms);
	    };
	    $scope.returnStep2 = function(){
	   	 $location.path('/step2');
	    };
	    $scope.$on('$viewContentLoaded', function() {
			setTimeout(function () {
				$.fn.wrapSelect();
			}, 500);
	    });
	}
})();