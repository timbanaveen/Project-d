angular.module('projectDApp')
	.controller('connectController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
		var valuesLoaded = false,
			statusTextEl,
			getPorts;

		$scope.currentView = "home";
		$scope.ports = [];

		getPorts = function() {
			//change icon to loading....
			statusTextEl = $('.selectport-text')[0];
			if(statusTextEl)
				statusTextEl.textContent = "Loading....";

			if(!valuesLoaded)
			{
				$http.get('/Project-d/PortNames').
				success(function(data, status, header, config) {
					//load select element with values.
					var names = data.split(","),
						namesLength = names.length,	
						i;

					for(i = 0; i  < namesLength-1; i++)
						$scope.ports.push({
							name: names[i]
						});

					valuesLoaded = true;

					if(statusTextEl)
						statusTextEl.textContent = "Select a port and connect.";
				}).
				error(function(data, status, header, config) {
					if(statusTextEl)
						statusTextEl.textContent = "Error";
				});
			}
		};

		$scope.connect = function() {
			var comport = $scope.comPort.name;
			
			if(comport)
			{
				$http.post('/Project-d/Connect', {port: comport}).
					success(function(data, status, header, config) {
						if(data.trim() === "true")
						{
							$scope.currentView = "dataMapView";
							$rootScope.comPort = comport;
							window.location.href = window.location.href.replace(window.location.hash, '#/socketDataView');
						}
						else
						{	if(statusTextEl)
								statusTextEl.textContent = data;
						}
					}).
					error(function(data, staus, headers, config) {
						console && console.log(data);
					});
			}
			
		};

		$rootScope.$on('dataReceivedUp', function(eOpts, data) {
			$rootScope.$broadcast('dataReceivedDown', data);
		});

		$scope.$on('$viewContentLoaded', getPorts);
	}]);