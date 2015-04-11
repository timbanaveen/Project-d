var appModule = angular.module('projectDApp');

appModule.controller('controlPanelController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
		$scope.cp = {
			'start_hide': 'unhide',
			'stop_hide': 'hide',
			'statusText': 'connect via web socket.',
			'comport_text': $rootScope.comPort
		};

		$scope.cpStatusEl = angular.element('.cp-status')[0];

		$scope.rawdataOutput = "";
		
		//start websocket
		$scope.startComm = function() {
			var wSocket;

			wSocket = new WebSocket("ws://localhost:9090/Project-d/websocket");

			wSocket.onopen = function() {
				$scope.cpStatusEl.innerHTML = 'connected'
				$scope.cp.btnText = 'Stop';
			};

			wSocket.onmessage = function(evt) {
				if(evt.data !== 'EOF')
				{	
					onMessageReceived(evt.data);
				}
				else if(evt.data === 'EOF')
				{
					sendDataFn('stop');
					wSocket.close();
				}					
			};

			$scope.wSocket = wSocket;

			$scope.cp.start_hide = "hide";
			$scope.cp.stop_hide = "unhide";
		};

		//stop socket
		$scope.stopComm = function() {
			var ws = $scope.wSocket;

			if(ws && ws.OPEN)
			{
				ws.onclose = function() {
					angular.element('.cp-status')[0].innerHTML = 'connect via websocket';
					$scope.cp.start_hide = "unhide";
					$scope.cp.stop_hide = "hide";

					$scope.$apply();
				};

				ws.close();
			}
		}

		//on message received, delgate it
		onMessageReceived = function(data) {
			//create object and then emit.
			var parsedData = {},
				stringComps = [],
				stringCompsLength,
				trimedData,
				keyVal,
				i;

			$scope.rawdataOutput += '<br>' + data.trim();
			$scope.$apply();

			try{
				trimedData = data.substring(1, data.length - 1);

				stringComps = trimedData.split(" ");
				stringCompsLength = stringComps.length;

				for(i = 0; i < stringCompsLength; i++)
				{
					keyVal = stringComps[i].split("=");

					parsedData[keyVal[0]] = keyVal[1];
				}

				$scope.$emit("dataReceivedUp", parsedData);
			}
			catch(e){
				$scope.rawdataOutput += data + '<br>cannot be parsed because:<br>' + e.message;
			}
		};

		//disconnect it from serial port.
		$scope.disconnectPort = function() {
			$http.get('/Project-d/disconnectport').
				success(function(data, status, header, config) {
					//reload index after.
					window.location.href = window.location.href.replace(window.location.hash, '#/index');
				}).
				error(function(data, status, header, config) {
					console && console.log('Error:', data);
				});
		};

		//send data via socket to server.
		$scope.sendData = function() {
			var msg = $scope.rawdataInput,
				ws = $scope.wSocket;

			if(event.keyCode === 13)
			{
				if( ws 
					&& ws.OPEN )
					ws.send(msg);
				else
					console && console.log("socket closed");
			}
			
		};
	}]);