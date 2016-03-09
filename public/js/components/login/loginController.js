var app = angular.module("projectFactor");

app.controller("LoginSubmitController",["$scope", "$state", function($scope, $state){

	$scope.login = function(){
		$state.go('dashboard');
	};

}]);