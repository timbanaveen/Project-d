var myApp = angular.module('projectDApp', ['uiGmapgoogle-maps', 'ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/index', {
			templateUrl: 'apps/view/ConnectView.html',
			controller: 'connectController'
		}).
		when('/socketDataView', {
			templateUrl: 'apps/view/SocketDataView.html',
			controller: 'controlPanelController'
		}).
		when('/connectionError', {
			templateUrl: 'apps/view/ConnectionError.html'
		}).
		otherwise({
			redirectTo: '/index'
		});

}])
.run(function($rootScope, $location) {
	$rootScope.$on("$locationChangeStart", function(event, next, current) {
		if(next.templateUrl !== '/index')
		{
			if($rootScope.comPort === undefined)
			{
				$location.path('/index');
			}
		}
	});
});