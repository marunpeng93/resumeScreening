var app = angular.module("app",['ngRoute']);
app.config(['$routeProvider',"$locationProvider",function($routeProvider,$locationProvider){
			$locationProvider.html5Mode(false).hashPrefix('');//解决1.6的路由地址冲突问题
			$routeProvider.when('/',{
				templateUrl:'html/home.html'
			})
			.when('/addResume',{
				templateUrl:'html/addResume.html'
			})
			.when("/screening",{
				templateUrl:'html/screening.html'
			})
	}])