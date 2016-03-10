var app = angular.module('projectFactor');

app.controller("DashboardViewController",["$scope","$uibModal",function($scope,$uibModal){

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

	$scope.posts = [
		{
			"profile" : {
				"picture" : "profile-picture.png",
				"name" : "Typo"
			},
			"date" : "2/29/2016",
			"content": "Lorem ipsum keme keme keme 48 years pamenthol shonget wasok ganda lang kasi katagalugan ang ang warla na ang kasi intonses dites shonget jowa nang antibiotic wasok tetetet bella at at nang katol pinkalou sudems na ang wasok cheapangga ano tungril dites thunder majonders at nang pamenthol fayatollah kumenis pamenthol buya buya nang jowabella at nang na ang kasi ano shonget oblation at at jowa na ang kasi borta jowabella matod na ang doonek",
			"branch" : ["Bonifacio High Street","Greenbelt 5"],
			"postpicture" : "posting-image.png"
		},
		{
			"profile" : {
				"picture" : "profile-picture.png",
				"name" : "Typo"
			},
			"date" : "2/26/2016",
			"content": "Lorem ipsum keme keme keme 48 years pamenthol shonget wasok ganda lang kasi katagalugan ang ang warla na ang kasi intonses dites shonget jowa nang antibiotic wasok tetetet bella at at nang katol pinkalou sudems na ang wasok cheapangga ano tungril dites thunder majonders at nang pamenthol fayatollah kumenis pamenthol buya buya nang jowabella at nang na ang kasi ano shonget oblation at at jowa na ang kasi borta jowabella matod na ang doonek",
			"branch" : ["Bonifacio High Street"],
			"postpicture" : "posting-image2.png"
		},
		{
			"profile" : {
				"picture" : "profile-picture.png",
				"name" : "Typo"
			},
			"date" : "2/20/2016",
			"content": "Lorem ipsum keme keme keme 48 years pamenthol shonget wasok ganda lang kasi katagalugan ang ang warla na ang kasi intonses dites shonget jowa nang antibiotic wasok tetetet bella at at nang katol pinkalou sudems na ang wasok cheapangga ano tungril dites thunder majonders at nang pamenthol fayatollah kumenis pamenthol buya buya nang jowabella at nang na ang kasi ano shonget oblation at at jowa na ang kasi borta jowabella matod na ang doonek",
			"branch" : ["All"],
			"postpicture" : "posting-image3.png"
		}
	];

	var dayArray = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
	var monthArray = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");

	angular.forEach($scope.posts,function(post,index){
		var d = new Date(post.date);
		var day = d.getDay();
		var month = d.getMonth();
		var date = d.getDate();
		var year = d.getFullYear();

		post.displayDate = dayArray[day] + ", " + monthArray[month] + ". " + date + ", "+year;

	});
	$scope.selected = { value: $scope.places[0] };

	/*
	 *	MODAL
	 */
	$scope.animationsEnabled = true;
	$scope.placesCopy = angular.copy($scope.places);

	$scope.open = function (template,controller,size) {
		console.log(controller);
	    var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: template,
	      controller: controller,
	      size: size,
	      resolve: {
	        placesCopy: function () {
	          return $scope.placesCopy;
	        }
	      }
	    });

	    modalInstance.result.then(function (returndata) {
	      if(returndata.type=="addpost"){

	      	var d = new Date();
			var day = d.getDay();
			var month = d.getMonth();
			var date = d.getDate();
			var year = d.getFullYear();

			returndata.displayDate = dayArray[day] + ", " + monthArray[month] + ". " + date + ", "+year;

	      	$scope.posts.push(returndata);
	      	console.log($scope.posts);
	      }
	    });
	};

}]);

app.controller('AddPostController', ["$scope", "$uibModalInstance","$rootScope","placesCopy",function ($scope, $uibModalInstance,$rootScope, placesCopy) {

	$scope.places = placesCopy;
	$scope.newPost = {
		"profile" : {
			"picture" : "profile-picture.png",
			"name" : "Typo"
		},
		"branch" : []
	};

	$scope.ok = function () {
		angular.forEach($scope.poolArray,function(pool,index){
			if(pool.isSelected == true){
				$scope.newPost.branch.push(pool.name);
			}
		});
		$scope.newPost.postpicture = $scope.fileName;
		$scope.return = $scope.newPost;
		$scope.return.type="addpost";

		$uibModalInstance.close($scope.return);
	};

	$scope.cancel = function () {
		$scope.poolArray = [];
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
