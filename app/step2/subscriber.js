(function () {
	angular.module('myApp.step2')
    .controller('SubscriberCtrl',  SubscriberController);
	SubscriberController.$inject = ['$scope','$rootScope','$translate','$location','$window','localStorageService'];
	function SubscriberController($scope,$rootScope,$translate,$location,$window,localStorageService) {
		if(localStorageService.get("userName")===""){
    		$location.path('/');
    	}
		$scope.selectAtleastOneAddressType = false;
		var currentLanguage = localStorageService.get("langKey");
		$scope.currentLang = localStorageService.get("langKey");
		$scope.customerInfo={};
		$scope.sameAsAbove=false;
		$scope.customerInfo.customer={};
		$scope.customerInfo.address={};
		$scope.DetailInformation={};
		$scope.delivery = {};
		$scope.check=true;
		$scope.exped = {};
		$scope.expir = {};
		$scope.expir.year = "";
		$scope.expir.month = "";
		$scope.exped.year = "";
		$scope.exped.month = "";
		$scope.username = localStorageService.get("userName");
		$scope.delivery.StartTime = localStorageService.get("StartTime");
		$scope.delivery.EndTime = localStorageService.get("EndTime");
	    $scope.alphanumericPattern = /^[a-zA-Z0-9\s]*$/;
	    $scope.alphanumericWithHyphenPattern = /^[a-zA-Z0-9-\s]*$/;
		$scope.numericPattern = /^([0-9]*)$/;
		$scope.alphabeticPattern = /^[a-zA-Z\s]*$/;
		$scope.zcPattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
		$scope.creditCardPattern = /^[0-9\-]{0,19}$/;
		$scope.pricePattern = /^[$]?[0-9]+$/;
		$scope.phonePattern = /^\d{3}-\d{3}-\d{4}|^\d{2}-\d{4}-\d{4}|^\d{10}$/;
		$scope.DetailInformation.deliveryInformation={};
	    $scope.DetailInformation.deliveryInformation.deliveryAddress={};
	    $scope.DetailInformation.deliveryInformation.deliveryInfo={};
	    var orderRequest = localStorageService.get("orderRequest");
	    $scope.subscriber = orderRequest;
		$scope.selection=[];
	    $scope.addressList='';
	    $scope.estimated={};
	    var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
	    var spanishMonths = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
	    $scope.yearList=[];
	    $scope.monthList = [];
	    $scope.formInvalid = 0;
	    var expYear = '';
		var expMonth = '';
		var StartTime ='';
		var EndTime ='';
		var maskData=localStorageService.get("maskCreditCardVal");
		$scope.validCardDate=false;
		$scope.DetailInformation.paymentInfo={
				 "payment": {},
				 "creditCard": {}
		 };
		$scope.stateList =[
		                   {name:"Aguascalientes"},
		                   {name:"Baja California"},
		                   {name:"Baja California Sur"},
		                   {name:"Campeche"},
		                   {name:"Chiapas"},
		                   {name:"Chihuahua"},
		                   {name:"Coahuila de Zaragoza"},
		                   {name:"Colima"},
		                   {name:"Durango"},
		                   {name:"Guanajuato"},
		                   {name:"Guerrero"},
		                   {name:"Hidalgo"},
		                   {name:"Jalisco"},
		                   {name:"Mexico"},
		                   {name:"Ciudad de Mexico"},
		                   {name:"Michoacan de Ocampo"},
		                   {name:"Morelos"},
		                   {name:"Nayarit"},
		                   {name:"Nuevo Leon"},
		                   {name:"Oaxaca"},
		                   {name:"Puebla"},
		                   {name:"Queretaro de Arteaga"},
		                   {name:"Quintana Roo"},
		                   {name:"San Luis Potosi"},
		                   {name:"Sinaloa"},
		                   {name:"Sonora"},
		                   {name:"Tabasco"},
		                   {name:"Tamaulipas"},
		                   {name:"Tlaxcala"},
		                   {name:"Veracruz"},
		                   {name:"Yucatan"},
		                   {name:"Zacatecas"}
		];
		$scope.cardValidation={
				check:{"required":true,"minLength":13,"maxLength":19,"pattern":"^([0-9]+-)*[0-9]+$"},
				uncheck:{"required":false,"minLength":0,"maxLength":19,"pattern":".*"}
		};
		$scope.validator=$scope.cardValidation.uncheck;
		$scope.changeValidator=function(){
			if($scope.DetailInformation.paymentInfo.payment.paymentType==='Credit Card' || $scope.DetailInformation.paymentInfo.payment.paymentType==='Debit Card'){
				$scope.validator=$scope.cardValidation.check;
			}else{
				$scope.validator=$scope.cardValidation.uncheck;
			}
		};
		if(maskData!==undefined && maskData!==null){
			$scope.validator=$scope.cardValidation.check;
		}else{
			$scope.validator=$scope.cardValidation.uncheck;
		}
		$scope.monthSelection = function(){
			var val = $scope.estimated.month;
			$scope.yearList=[];
			var pastMonth = false;
			var today = new Date();
			if(currentLanguage==='en-us' && monthNames.indexOf(val)<today.getMonth()){
				pastMonth = true;
			}
			if(currentLanguage!=='en-us' && spanishMonths.indexOf(val)<today.getMonth()){
				pastMonth = true;
			}
			for(var i=2016;i<=2030;i++){
				var year=null;
				if(i<today.getFullYear()){
					year = {"name":i,"disabled":true};
				}else if(i===today.getFullYear() && pastMonth){
					year = {"name":i,"disabled":true};
				}else{
					year = {"name":i,"disabled":false};
				}
				$scope.yearList.push(year);
			}
		};
		$scope.getMonthInfo=function(ind,type){
			var month = null;
			var currentLanguage=$scope.currentLang;
			if(currentLanguage==='en-us'){
				month = {"name":monthNames[ind],"disabled":type};
			}else{
				month = {"name":spanishMonths[ind],"disabled":type};
			}
			return month;
		};
		$scope.yearSelection = function(){
			var val = $scope.estimated.year;
			if(val!==null){
				val = parseInt(val);
			}
			$scope.monthList = [];
			var currentYear = false;
			var pastYear = false;
			var today = new Date();
			if(today.getFullYear()===val){
				currentYear = true;
			}
			if(today.getFullYear()>val){
				pastYear = true;
			}
			for(var i=0;i<=11;i++){
				var month = null;
				if(pastYear){
					month=$scope.getMonthInfo(i,true);
				}else if(today.getMonth()>i && currentYear){
					month=$scope.getMonthInfo(i,true);
				}else{
					month=$scope.getMonthInfo(i,false);
				}
				$scope.monthList.push(month);
			}
		};
		for(var i=2016;i<=2030;i++){
			var year = {"name":i,"disabled":false};
			$scope.yearList.push(year);
		}
		for(var j=0;j<12;j++){
			var month = null;
			if(currentLanguage==='en-us'){
				month = {"name":monthNames[j],"disabled":false};
			}else{
				month = {"name":spanishMonths[j],"disabled":false};
			}
			$scope.monthList.push(month);
		}
	    if(localStorageService.get("estimatedMonthdate") !== undefined){
		    $scope.estimated.month=localStorageService.get("estimatedMonthdate");
	    }
	    if(localStorageService.get("estimatedYeardate") !== undefined){
	    	$scope.estimated.year=localStorageService.get("estimatedYeardate");
	    }
	    if(localStorageService.get("expedMonth")!==undefined){
	         $scope.exped.month=localStorageService.get("expedMonth");
	    }
	    if(localStorageService.get("expedYear")!==undefined){
	    	$scope.exped.year=localStorageService.get("expedYear");
	    }
	    if(localStorageService.get("expirMonth")!==undefined){
		    $scope.expir.month=localStorageService.get("expirMonth");
	    }
	    if(localStorageService.get("expirYear")!==undefined){
	    	$scope.expir.year=localStorageService.get("expirYear");
	    }
	    var custInfo = orderRequest.vdscRequestBean.customerInfo;
	    if(custInfo !== ""){
	       $scope.customerInfo = orderRequest.vdscRequestBean.customerInfo;
	    }
	    var delivInfo = orderRequest.vdscRequestBean.products.equipment[0].deliveryInformation;
	    if(delivInfo !== undefined){
	       $scope.DetailInformation.deliveryInformation= orderRequest.vdscRequestBean.products.equipment[0].deliveryInformation;
	    }
	    $scope.DetailInformation.paymentInfo = orderRequest.vdscRequestBean.paymentInfo;
		$rootScope.orderRequest1 = { };
	      $scope.setDate = function(year, month, day) {
	    	  $scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate = new Date(year, month, day);
	      };
	      $scope.today = function() {
		        $scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate = new Date();
		      };
		      $scope.clear = function() {
		    	  $scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate = null;
		      };
		      $scope.validateLocalStorage=function(name){
		    	  var valid=false;
		    	  if(localStorageService.get(name)!== undefined && localStorageService.get(name)!==null){
			    	  valid=true;
			      }
		    	  return valid;
		      };
		      $scope.populateDeliveryDate = function(val){
			      $scope.temp=val;
			      var validYear=$scope.validateLocalStorage("delYear");
			      var validMonth=$scope.validateLocalStorage("delMonth");
			      var validDate=$scope.validateLocalStorage("delDate");
			      if(validYear && validMonth && validDate){
			    	  $scope.setDate(localStorageService.get("delYear"),localStorageService.get("delMonth"),localStorageService.get("delDate"));
			    	  return;
			      }
			      if($scope.temp === undefined || $scope.temp===null){
			    	  $scope.today();
			      }else{
			    	  $scope.clear();
			      }
		      };
		      $scope.populateDeliveryDate(localStorageService.get("estimatedMonthdate"));
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
		      $scope.events = [
		      	{date: tomorrow,status: 'full'},
		      	{date: afterTomorrow,status: 'partially'}
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
        $scope.changeToDeliveryAddressState = function(){
			var check = $scope.check;
			if(check){
                 $("#deliveryStateDiv .selectWrap span").text("");
                 $("#deliveryStateDiv .selectWrap span").removeClass("placeholdercolor");
                 $("#deliveryStateDiv .selectWrap span").text($scope.DetailInformation.deliveryInformation.deliveryAddress.state);
                 $("#deliveryStateDiv .selectWrap span").append("<i class=cssIcon-chevron-d-w></i>");
                 }
			};
	    $scope.subscriberInfo = function() {
	    	$translate.use(localStorageService.get("langKey"));
		    $rootScope.orderRequest1 = $scope.subscriber;
		    var businessCheckBox = $scope.addressTypeInit.businessCheck;
			var mailCheckBox = $scope.addressTypeInit.mailCheck;
		    var orderRequest1 = $rootScope.orderRequest1;
		    localStorageService.set("orderRequest1", orderRequest1);
		    if(!businessCheckBox && !mailCheckBox){
		    	$scope.selectAtleastOneAddressType = true;
	  	    	return;
	  	    }
		    if($scope.subscriberInfoForm.$invalid){
		    	return;
		    }
		    $scope.subscriber.vdscRequestBean.products.ratePlan[0].estimatedRenewalDate=$scope.estimated.month+"-"+$scope.estimated.year;
            if(currentLanguage==='es-mx'){
                   $scope.subscriber.vdscRequestBean.products.ratePlan[0].estimatedRenewalDate=monthNames[spanishMonths.indexOf($scope.estimated.month)]+"-"+$scope.estimated.year;
            }
		    var estimatedMonthdate = $scope.estimated.month;
		    var estimatedYeardate = $scope.estimated.year;
		    var todayDate = new Date();
		    if(todayDate.getFullYear()>=estimatedYeardate){
		    	if(todayDate.getFullYear()>estimatedYeardate){
		    		$scope.subscriberInfoForm.estimatedMonth.$invalid=true;
			    	return;
		    	}
		    	if(monthNames.indexOf(estimatedMonthdate)<todayDate.getMonth()){
		    		$scope.subscriberInfoForm.estimatedMonth.$invalid=true;
			    	return;
		    	}
		    }
		    localStorageService.set("estimatedMonthdate", estimatedMonthdate);
		    localStorageService.set("estimatedYeardate", estimatedYeardate);
		    orderRequest.vdscRequestBean.customerInfo = $scope.customerInfo;
		    orderRequest.vdscRequestBean.products.equipment[0].deliveryInformation = $scope.DetailInformation.deliveryInformation;
		    orderRequest.vdscRequestBean.paymentInfo = $scope.DetailInformation.paymentInfo;
		    orderRequest.vdscRequestBean.customerInfo.customer.addressType=$scope.addressList;
		    $scope.subscriber.vdscRequestBean.paymentInfo = $scope.DetailInformation.paymentInfo;
			$scope.subscriber.vdscRequestBean.products.equipment[0].deliveryInformation = $scope.DetailInformation.deliveryInformation;
			StartTime = $scope.delivery.StartTime;
			EndTime = $scope.delivery.EndTime;
			if((StartTime !== '' && StartTime !== undefined) && (EndTime !== '' && EndTime !== undefined) ){
			    $scope.subscriber.vdscRequestBean.products.equipment[0].deliveryInformation.deliveryInfo.deliveryTime=$scope.delivery.StartTime+" EST - "+$scope.delivery.EndTime+" EST";
			}else{
				$scope.subscriber.vdscRequestBean.products.equipment[0].deliveryInformation.deliveryInfo.deliveryTime='';
			}
			localStorageService.set("StartTime",StartTime);
	        localStorageService.set("EndTime",EndTime);
			if(($scope.exped.year !== "" || $scope.expir.year !=="") && ($scope.DetailInformation.paymentInfo.payment.paymentType==='Credit Card' || $scope.DetailInformation.paymentInfo.payment.paymentType==='Debit Card')){
				if ($scope.exped.year> $scope.expir.year|| (($scope.exped.year === $scope.expir.year) && ($scope.exped.month >= $scope.expir.month))){
					 $scope.validCardDate=true;
				     return;
				 }
	        }
			expMonth = $scope.exped.month;
			expYear = $scope.exped.year;
			localStorageService.set("expedMonth", $scope.exped.month);
		    localStorageService.set("expedYear", $scope.exped.year);
		    var validExpMonth=false;
		    if(expMonth!==null && expMonth!=='' && expMonth!==undefined){
		    	validExpMonth=true;
		    }
		    var validExpYear=false;
		    if(expYear!==null && expYear!=='' && expYear!==undefined){
		    	validExpYear=true;
		    }
			if(validExpYear	&& validExpMonth){
				$scope.subscriber.vdscRequestBean.paymentInfo.creditCard.expeditionDate=expYear +"-"+expMonth;
				var displayexpeditionDate = expMonth+"/"+expYear.substr(expYear.length-2);
				localStorageService.set("displayexpeditionDate", displayexpeditionDate);
			}
			expMonth = $scope.expir.month;
			expYear = $scope.expir.year;
			localStorageService.set("expirMonth", $scope.expir.month);
		    localStorageService.set("expirYear", $scope.expir.year);
		    var validEprMonth=false;
		    if(expMonth!==null && expMonth !== '' && expMonth !== undefined){
		    	validEprMonth=true;
		    }
		    var validEprYear=false;
		    if(expYear!==null && expYear !== '' && expYear !== undefined){
		    	validEprYear=true;
		    }
			if(validEprMonth && validEprYear){
				$scope.subscriber.vdscRequestBean.paymentInfo.creditCard.expirationDate=expYear +"-"+expMonth;
				var displayexpirationDate = expMonth+"/"+expYear.substr(expYear.length-2);
				localStorageService.set("displayexpirationDate", displayexpirationDate);
			}
			var delDate = $scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate;
			if(delDate!==null){
				localStorageService.set("delDate", delDate.getDate());
				localStorageService.set("delMonth", delDate.getMonth());
				localStorageService.set("delYear", delDate.getFullYear());
			}else{
				localStorageService.remove("delYear");
	    		localStorageService.remove("delMonth");
	    		localStorageService.remove("delDate");
			}
			if($scope.DetailInformation.paymentInfo.creditCard !== null ) {
				var creditCard = $scope.DetailInformation.paymentInfo.creditCard.cardNumber;
				if(creditCard !== null && creditCard !== undefined) {
					var maskCreditCardVal = "************" + creditCard.substr(creditCard.length-4);
					localStorageService.set("maskCreditCardVal", maskCreditCardVal);
				}
			}
			window.scrollTo(0,0);
			localStorageService.set("orderRequest", orderRequest);
		    $location.path('/step3');
	    };
	    $scope.addressTypeInit = localStorageService.get("addressTypeInit");
	    var displayAddressType=0;
	    $scope.addressSelection = function(type) {
	    	var check = $scope.check;
			var delDateVal = $scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate;
	        var idx = $scope.selection.indexOf(type);
	        if (idx > -1) {
	          $scope.selection.splice(idx, 1);
	          if(type==="Business"){
	        	  $scope.addressTypeInit.businessCheck = false;
	          	$scope.DetailInformation.paymentInfo.billingInformation={};
	          	displayAddressType=displayAddressType-3;
	          }else if(type==="Delivery"){
	        	  $scope.addressTypeInit.deliveryCheck = false;
	          	$scope.DetailInformation.deliveryInformation.deliveryAddress={};
				$scope.DetailInformation.deliveryInformation.deliveryInfo={};
				$scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate = delDateVal;
	            if(check){
		            $('#deliveryState option:eq(0)').attr('selected','selected');
		            $("#deliveryStateDiv .selectWrap span").text($('#delStateHidden').val());
		            $("#deliveryStateDiv .selectWrap span").addClass("placeholdercolor");
		            $("#deliveryStateDiv .selectWrap span").append("<i class=cssIcon-chevron-d-w></i>");
	            }
                displayAddressType=displayAddressType-4;
	            $scope.sameAsAbove=false;
	          }else if(type==="Mail"){
	        	  $scope.addressTypeInit.mailCheck = false;
	        	  displayAddressType=displayAddressType-2;
	          }
	        }else {
	          $scope.selection.push(type);
	          if(type==="Business"){
	        	  $scope.addressTypeInit.businessCheck = true;
	          	$scope.DetailInformation.paymentInfo.billingInformation={
	          			"billingAddress":{},
	          			"billingInfo":{}
	          	};
	          	$scope.DetailInformation.paymentInfo.billingInformation.billingAddress=$scope.customerInfo.address;
	          	$scope.DetailInformation.paymentInfo.billingInformation.billingInfo.phoneNumber=$scope.customerInfo.customer.phoneNumber;
	          	$scope.DetailInformation.paymentInfo.billingInformation.billingInfo.businessName=$scope.customerInfo.customer.businessName;
	          	$scope.DetailInformation.paymentInfo.billingInformation.billingInfo.firstName=$scope.customerInfo.customer.firstName;
	          	displayAddressType=displayAddressType+3;
	          }else if(type==="Delivery"){
	        	  $scope.addressTypeInit.deliveryCheck = true;
	          	$scope.DetailInformation.deliveryInformation.deliveryAddress=$scope.customerInfo.address;
				$scope.DetailInformation.deliveryInformation.deliveryInfo=$scope.customerInfo.customer;
				$scope.DetailInformation.deliveryInformation.deliveryInfo.deliveryDate = delDateVal;
	            if(check){
		            $("#deliveryStateDiv .selectWrap span").text("");
		            $("#deliveryStateDiv .selectWrap span").removeClass("placeholdercolor");
		            $("#deliveryStateDiv .selectWrap span").text($scope.DetailInformation.deliveryInformation.deliveryAddress.state);
		            $("#deliveryStateDiv .selectWrap span").append("<i class=cssIcon-chevron-d-w></i>");
	            }
                displayAddressType=displayAddressType+4;
	            $scope.sameAsAbove=true;
	          }else if(type==="Mail"){
	        	  $scope.addressTypeInit.mailCheck = true;
	        	  displayAddressType=displayAddressType+2;
	          }
	        }
	        $scope.addressList=$scope.selection.toString();
	        localStorageService.set("addressTypeInit",$scope.addressTypeInit);
	        localStorageService.set("displayAddressType",displayAddressType);
	        var businessCheckBox = $scope.addressTypeInit.businessCheck;
			var mailCheckBox = $scope.addressTypeInit.mailCheck;
			if(businessCheckBox || mailCheckBox){
		    	$scope.selectAtleastOneAddressType = false;
	  	    }
			if(!businessCheckBox && !mailCheckBox){
		    	$scope.selectAtleastOneAddressType = true;
	  	    }
		};
	     $scope.autoCheckedAddressType = function(){
	    	  if($scope.addressTypeInit.businessCheck){
	    		  $scope.addressSelection("Business");
	    	  }
	    	  if($scope.addressTypeInit.deliveryCheck){
	    		  $scope.addressSelection("Delivery");
	    	  }
	    	  if($scope.addressTypeInit.mailCheck){
	    		  $scope.addressSelection("Mail");
	    	  }
	      };
	     $scope.autoCheckedAddressType();
	     $scope.returnStep = function(){
	    	 $location.path('/step1');
	     };
	     $scope.changeDates = function(){
	    	 $scope.validCardDate=false;
	     };
	    $scope.Initial = localStorageService.get("Initial");
		$scope.Sample= $scope.addressTypeInit;
		$scope.$on('$viewContentLoaded', function(){
			setTimeout(function () {
				$.fn.wrapSelect();
			}, 500);
	    });
	}
})();