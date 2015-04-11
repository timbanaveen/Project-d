var myApp = angular.module('projectDApp');

myApp.controller('GoogleMapController', ['$scope', function($scope) {
	var nameToDisplayMap = {
			'Bot_no': 'Bot_no',
			'Time': 'Time',
			'Waypt': 'Waypt',
			'DistToWaypt': 'DistToWaypt',
			'Lat': 'Latitude',
			'Lon': 'Longitude',
			'Pitch': 'Pitch',
			'Roll': 'Roll',
			'Act_heading': 'Act_heading',
			'Des_bearing': 'Des_bearing',
			'Error': 'Error',
			'ControlMode': 'ControlMode',
			'Steer_L_volt': 'SteerLeft_Volt',
			'Steer_R_volt': 'SteerRight_Volt',
			'Motion_flag': 'Motion_flag'
		};

	$scope.map = { 
					center: { 
						latitude: 45, 
						longitude: -73 
					}, 
					zoom: 8,
					options: {
						scrollwheel: false
					}
				};

	$scope.map.path = [];

	$scope.$on('dataReceivedDown', function(eOpts, data) {
		var prev = $scope.map.path[$scope.map.path.length - 1] || {};

		if($scope.map.center.latitude === 45)
			$scope.map.center.latitude = data['Lat'];

		if($scope.map.center.longitude === -73)
			$scope.map.center.longitude = data['Lon'];

		if( prev.latitude !== data['Lat']
			|| prev.longitude !== data['Lon'] )
		{
			$scope.map.path.push({
				latitude: data['Lat'],
				longitude: data['Lon']
			});
		}
	});
}]);