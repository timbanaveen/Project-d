angular.module('projectDApp')
	.controller('dialogController', ['$scope', '$element', '$timeout', function($scope, $element, $timeout) { //delegations of events [save cancel]
	
		$scope.win = angular.copy($scope.wayPntMarkers);

		//$scope.cancel = cancelHandler;
		$scope.cancel = function() {
			$element[0].remove();
		};

		$scope.save = function() {
			var i,
				wpLength = $scope.win.wayPoints.length;

			for(i = 0; i < wpLength; i++)
			{
				(function(currValue, index) {
					setTimeout(function() {
						$scope.wayPntMarkers.wayPoints[index].latitude = currValue.latitude;
						$scope.wayPntMarkers.wayPoints[index].longitude = currValue.longitude;

						if(index === wpLength-1)
						{

							$timeout(function() {
								$scope.$apply();
							});
						}
					}, 200);
				})($scope.win.wayPoints[i], i, $scope.win.wayPoints);
			}


			$element[0].remove();
		};
	}])
	.directive('genWindow', function() {
		return {
			restrict: 'E',
			scope: false,
			controller: 'dialogController',
			templateUrl: 'apps/widgets/generalWindow.html'
		};
	});