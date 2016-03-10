var app = angular.module("projectFactor");

var app = angular.module('projectFactor');

app.controller("BranchManagementViewController",["$scope","$uibModal",function($scope,$uibModal){

	$scope.places = [
		{	
			"id": "1",
			"name": "Typo, Bonifacio High Street",
			"address": "B6 Bonifacio High Street, 11th Avenue, Bonifacio Global City, Taguig City",
			"storehours": {
				"open": "09:00",
				"close": "23:00"
			},
			"businesstype": "Products/Services",
			"filename": "",
			"contact" : "91112345"
		},
		{	
			"id": "2",
			"name": "Typo, Greenbelt 5",
			"address": "2nd Floor, Greenbelt 5, Makati City",
			"storehours": {
				"open": "10:00",
				"close": "21:00"
			},
			"businesstype": "Products/Services",
			"filename": "",
			"contact" : "91112345"
		},
		{
			"id": "3",
			"name": "Typo, Trinoma",
			"address": "Ground Floor, Trinoma, Quezon City",
			"storehours": {
				"open": "10:00",
				"close": "21:00"
			},
			"businesstype": "Products/Services",
			"filename": "",
			"contact" : "91112345"
		}
	];

	$scope.check_all = false;
	$scope.checkAll = function(all){
		if(all == true){
			angular.forEach($scope.places,function(place,index){
				place.isSelected = true;
			});
			//$scope.check_all = false;
		}else{
			angular.forEach($scope.places,function(place,index){
				place.isSelected = false;
			});
			//$scope.check_all = true;
		}
	};

	function formatDate(date) {
		date = "February 04, 2011"+" "+date+":00";
	    var d = new Date(date);
	    var hh = d.getHours();
	    var m = d.getMinutes();
	    var s = d.getSeconds();
	    var dd = "AM";
	    var h = hh;
	    if (h >= 12) {
	        h = hh-12;
	        dd = "PM";
	    }
	    if (h == 0) {
	        h = 12;
	    }
	    m = m<10?"0"+m:m;

	    s = s<10?"0"+s:s;

	    /* if you want 2 digit hours:*/
	    h = h<10?"0"+h:h; 

	    var pattern = new RegExp("0?"+h+":"+m+":"+s);

	    var replacement = h+":"+m;
	    /* if you want to add seconds
	    replacement += ":"+s;  
	    replacement += " "+dd;   */ 

	    return h+":"+m+""+dd;
	}

	angular.forEach($scope.places,function(place,index){
		var open = formatDate(place.storehours.open);
		var close = formatDate(place.storehours.close);
		var x =  open+" - "+close;
		place.storehours.displayTime = x;

		if(!place.isSelected){
			place.isSelected = false;
		}
	});

	$scope.selected = { value: $scope.places[0] };



	/*
	 *	DELETE FUNCTION
	 */

	$scope.toDeletePool = [];
	$scope.addToDelete = function(place){
		$scope.toDeletePool.push(place);
	};

	/*
	 *	MODAL
	 */
	$scope.animationsEnabled = true;
	$scope.placesCopy = angular.copy($scope.places);

	$scope.open = function (template,controller,size) {

	    var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: template,
	      controller: controller,
	      size: size,
	      resolve: {
	        placesCopy: function () {
	          return $scope.placesCopy;
	        },
	        toDeletePool: function () {
	          return $scope.toDeletePool;
	        }
	      }
	    });

	    modalInstance.result.then(function (returndata) {
	      if(returndata.type==="addbranch" && returndata.storehours){
	      		var open = formatDate(returndata.storehours.open);
				var close = formatDate(returndata.storehours.close);
				var x =  open+" - "+close;
				returndata.storehours.displayTime = x;
	      		$scope.places.push(returndata);
	      }else if(returndata.type==="deletebranch"){
	      	$scope.places = returndata;
	      	$scope.toDeletePool = [];
	      }
	    });
	};



}]);


app.controller('AddBranchController', ["$scope", "$uibModalInstance","$rootScope",function ($scope, $uibModalInstance,$rootScope) {
	$scope.newBranch = {};
	$scope.ok = function () {
		$scope.newBranch.filename = $scope.filename;
		$scope.return = $scope.newBranch;
		$scope.return.type = "addbranch";
		$uibModalInstance.close($scope.return);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};


}]);

app.controller('DeleteBranchController', ["$scope", "$uibModalInstance","$rootScope","places","toDeletePool",function ($scope, $uibModalInstance,$rootScope,places,toDeletePool) {
	$scope.places = places;
	$scope.toDeletePool = toDeletePool;

	$scope.ok = function () {

		angular.forEach($scope.toDeletePool,function(place,index){
			var index = $scope.places.indexOf(place);
	  		$scope.places.splice(index, 1);  
		});
		$scope.return = $scope.places;
		$scope.return.type = "addbranch";

		$uibModalInstance.close($scope.return);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};


}]);

