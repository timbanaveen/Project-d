angular.module('projectDApp').controller('numericDataController', ['$scope', function($scope) {
	var binders = {},
		keysCollection,
		keysLength,
		nameToDisplayMap = {},
		botsMap = {},
		i;

	keysCollection = [
			{name: 'Bot_no', displayName: 'Bot Number'},
			{name: 'Time', displayName: 'Time'},
			{name: 'Waypt', displayName: 'Next Point'},
			{name: 'DistToWaypt', displayName: 'Distance to next point'},
			{name: 'Latitude', displayName: 'Latitude'},
			{name: 'Longitude', displayName: 'Longitude'},
			{name: 'Pitch', displayName: 'Pitch'},
			{name: 'Roll', displayName: 'Roll'},
			{name: 'Act_heading', displayName: 'Heading Direction'},
			{name: 'Des_bearing', displayName: 'Desired angle'},
			{name: 'Error', displayName: 'Error'},
			{name: 'ControlMode', displayName: 'Control Mode'},
			{name: 'SteerLeft_Volt', displayName: 'Steer Left Voltage'},
			{name: 'SteerRight_Volt', displayName: 'Steer Right Voltage'},
			{name: 'Motion_flag', displayName: 'Power Supply'}
		];

	nameToDisplayMap = {
		'Bot': 'Bot_no',
		'Time': 'Time',
		'Waypt': 'Waypt',
		'Dist2Waypt': 'DistToWaypt',
		'Lat': 'Latitude',
		'Lon': 'Longitude',
		'Pitch': 'Pitch',
		'Roll': 'Roll',
		'Act_heading': 'Act_heading',
		'Des_bearing': 'Des_bearing',
		'Err': 'Error',
		'CtrlMode': 'ControlMode',
		'Steer_L_volt': 'SteerLeft_Volt',
		'Steer_R_volt': 'SteerRight_Volt',
		'Motion_flag': 'Motion_flag'
	};

	$scope.bots = [];
	$scope.keysCollection = keysCollection;
	keysLength = keysCollection.length;

	//initilaize binders
	for(i = 0; i < keysLength; i++)
	{
		binders[keysCollection[i].name] = keysCollection[i].name + '_binder';
	}

	//parsing and displaying.
	$scope.$on("dataReceivedDown", function(eOpts, data) {
		var key;

		for(key in data)
		{	
			if(data.hasOwnProperty(key))
			{
				$scope[nameToDisplayMap[key]+'_binder'] = data[key];

				if( key === 'Bot'
					&& botsMap[data[key]] === undefined )
				{
					$scope.bots.push({
						'bot': data[key],
						'Latitude': data['Lat'],
						'Longitude': data['Lon']
					});

					botsMap[data[key]] = $scope.bots.length - 1;
				}


			}
		}

		if(botsMap[data['Bot']] !== undefined)
		{
			//update values.
			$scope.bots[botsMap[data['Bot']]]['Latitude'] = data['Lat'];
			$scope.bots[botsMap[data['Bot']]]['Longitude'] = data['Lon'];
		}

		$scope.$apply();
	});

}]);