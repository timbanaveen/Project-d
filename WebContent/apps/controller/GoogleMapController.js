var myApp = angular.module('projectDApp');

myApp.controller('GoogleMapController', ['$scope', '$compile', function($scope, $compile) {
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
		},
		wayPoints = [
			{ 
				latitude: '42.423502', 
				longitude: '-83.464704',
				id: 'wp_1'
			},
			{
				latitude: '42.423229', 
				longitude: '-83.464731',
				id: 'wp_2'
			},
			{
				latitude: '42.423246', 
				longitude: '-83.465118',
				id: 'wp_3'
			},
			{
				latitude: '42.423525', 
				longitude: '-83.465111',
				id: 'wp_4'
			}
		];

	$scope.map = { 
					center: { 
						latitude: 42.423502, 
						longitude: -83.464704 
					}, 
					zoom: 10,
					options: {
						scrollwheel: false
					}
				};

	$scope.wayPntMarkers = {}
	$scope.wayPntMarkers.wayPoints = wayPoints;
	$scope.wayPntMarkers.title = 'Way Points';

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

	$scope.wayPoints = function() {
		//initialize coordinates in view from model.
		var genWin = $compile('<gen-window></gen-window>')($scope);
		document.body.insertBefore(genWin[0], document.body.querySelector('body *:first-child'));
	};
}]);