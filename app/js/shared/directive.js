var app = angular.module("projectFactor");

app.directive("factorHeader",function(){
	return {
		restrict: "EA",
		templateUrl: "js/shared/header.html"
	};
});
app.directive("factorFooter",function(){
	return {
		restrict: "EA",
		templateUrl: "js/shared/footer.html"
	};
});

app.directive("fileUpload",function(){
	return {
	  restrict: "A",
      scope: {
        fileName: '='
      },
      link: function(scope, element, attrs) {
        element.on('change', function(evt) {
          var files = evt.target.files;
          scope.fileName = files[0].name;
          scope.$apply();
        });
      }
    }
})