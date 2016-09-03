(function () {

    angular.module('myApp.step1')
        .controller('SalesRepCtrl',  SalesRepController);

    SalesRepController.$inject = ['$scope','$translate','$location','localStorageService'];

    function SalesRepController($scope,$translate,$location,localStorageService) {
    	if(localStorageService.get("userName")===""){
    		$location.path('/');
    	}
    	$scope.selection=[];
        $scope.salesList='';
        $scope.checkBoxCount = 0;
		$scope.checkBoxSelected = true;
		$scope.alphaNumeric = /^[a-zA-Z0-9\s]*$/;
		$scope.alphaNumericWithOutSpace = /^[a-zA-Z0-9]*$/;
		$scope.numeric = /^([0-9]*)$/;
		$scope.alphabetic = /^[a-zA-Z\s]*$/;
        var orderRequest = localStorageService.get("orderRequest");
        $scope.salesRepInformation = orderRequest.vdscRequestBean.salesRepInformation;
        $scope.setDate = function(year, month, day) {
        	  $scope.salesRepInformation.appointmentDate = new Date(year, month, day);
        };
        $scope.today = function() {
            $scope.salesRepInformation.appointmentDate = new Date();
        };
        if($scope.salesRepInformation.appointmentDate===null || $scope.salesRepInformation.appointmentDate===undefined){
        	  $scope.today();
        }else{
        	  $scope.setDate(localStorageService.get("appointmentYear"),localStorageService.get("appointmentMonth"),localStorageService.get("appointmentDay"));
        }
          $scope.clear = function() {
        	  $scope.salesRepInformation.appointmentDate = null;
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
        $scope.salesRepInfo = function() {
        	$translate.use(localStorageService.get("langKey"));
			if($scope.salesForm.$invalid){
				return;
				}
    	    orderRequest.vdscRequestBean.salesRepInformation = $scope.salesRepInformation;
    	    var date = $scope.salesRepInformation.appointmentDate;
    	    localStorageService.set("appointmentDay", date.getDate());
    	    localStorageService.set("appointmentMonth", date.getMonth());
    	    localStorageService.set("appointmentYear", date.getFullYear());
    	    localStorageService.set("orderRequest", orderRequest);
    	    $location.path('/step2');
        };
    };
})();
