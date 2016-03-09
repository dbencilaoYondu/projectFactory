var app = angular.module('projectFactor',
	[	
		'ngSanitize',
		'ui.select',
		'ui.router',
		'ui.bootstrap'
	]
);

app.config(function($stateProvider,$urlRouterProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('/',{
			url: '/',
			controller:'LoginSubmitController',
			templateUrl: 'js/components/login/loginView.html'
		})
		.state('signup',{
			url: '/signup',
			templateUrl: 'js/components/signup/signupView.html'
		})
		.state('dashboard',{
			url: '/dashboard',
			controller: "DashboardViewController",
			templateUrl: 'js/components/dashboard/dashboardView.html'
		})
		.state('branchmanagement',{
			url: '/branchmanagement',
			controller: "BranchManagementViewController",
			templateUrl: 'js/components/branch_management/branchmanagementView.html'
		})

});

app.run(function($rootScope){

    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        $rootScope.state = toState.name;
    });

});