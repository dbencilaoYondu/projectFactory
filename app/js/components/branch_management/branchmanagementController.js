var app = angular.module("projectFactor");

var app = angular.module('projectFactor');

app.controller("BranchManagementViewController",["$scope","$uibModal",function($scope,$uibModal){

	$scope.places = [
		{	
			"id": "1",
			"location": "Typo, Bonifacio High Street",
			"address": "B6 Bonifacio High Street, 11th Avenue, Bonifacio Global City, Taguig City",
			"storehours": {
				"open": "09:00",
				"close": "23:00"
			},
			"businesstype": "Products/Services"
		},
		{	
			"id": "2",
			"location": "Typo, Greenbelt 5",
			"address": "2nd Floor, Greenbelt 5, Makati City",
			"storehours": {
				"open": "10:00",
				"close": "21:00"
			},
			"businesstype": "Products/Services"
		},
		{
			"id": "3",
			"location": "Typo, Trinoma",
			"address": "Ground Floor, Trinoma, Quezon City",
			"storehours": {
				"open": "10:00",
				"close": "21:00"
			},
			"businesstype": "Products/Services"
		}
	];

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
	});

	$scope.selected = { value: $scope.places[0] };

	/*
	 *	MODAL
	 */
	$scope.animationsEnabled = true;

	$scope.open = function (size) {

	    var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'addPostView.html',
	      controller: 'AddPostController',
	      size: size,
	      resolve: {
	        places: function () {
	          return $scope.places;
	        }
	      }
	    });

	    modalInstance.result.then(function (selectedItem) {
	      $scope.places = selectedItem;
	      console.log(selectedItem);
	    });
	};

}]);

app.controller('AddPostController', ["$scope", "$uibModalInstance","$rootScope","places",function ($scope, $uibModalInstance,$rootScope, places) {

	$scope.places = places;

	$scope.ok = function () {
		$uibModalInstance.close($scope.places);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	// LIST OF BRANCHES SELECTED
	$scope.poolArray = [];
	$scope.isShow = false;
	$scope.showDrop = function(){
		if($scope.isShow){
			$scope.isShow = false;
		}else{
			$scope.isShow = true;
		}
	};
	
	angular.forEach($scope.places,function(place,index){
		if(place.isSelected){
			if(place.isSelected === true)
				$scope.poolArray.push(place);
		}else{
			place.isSelected = false;
		}
		
	});

	$scope.addtoPool = function(place){
		if(!containsObject(place,$scope.poolArray)){
			$scope.poolArray.push(place);

			angular.forEach($scope.places,function(place2,index){
				if(place2.id == place.id)
					place2.isSelected = true;
			});
		}else{
			var index = $scope.poolArray.indexOf(place);
  			$scope.poolArray.splice(index, 1);  

  			angular.forEach($scope.places,function(place2,index){
				if(place2.id == place.id)
					place2.isSelected = false;
			});
		}
	};

	function containsObject(obj, list) {
	    var i;
	    for (i = 0; i < list.length; i++) {
	        if (list[i] === obj) {
	            return true;
	        }
	    }
	    return false;
	}


	//UPLOAD IMAGE
	$scope.fileName='';


}]);
