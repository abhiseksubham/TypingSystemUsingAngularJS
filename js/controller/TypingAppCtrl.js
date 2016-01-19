angular.module('typing')
	.controller('TypingAppCtrl', ['$scope', '$timeout','$interval', 'TypingTestDataFactory','$modal', 
		function ($scope, $timeout,interval, typingTestDataFactory, modal) {

		var self = this;
		self.totalTime = 5;
		self.isTestRestarted = false;

		var str = typingTestDataFactory.getTypingTestData();
		//console.log(str);

		$scope.targetWords = str.split(" ");
		$scope.search = {text: "",typeWords: [], incorrectWords: [], wpm : 0,totalTime:self.totalTime}
		
		//var typeWords = $scope.typeWords;

        //TODO: as soon as you click on the button, i have to call this function:
		self.init = function () {
	        self.wpm = 0;
			self.errors =0;
			self.accuracy = 0;
			self.remainingTime = self.totalTime;
			self.progressValue = 0;
			self.countTo = self.totalTime;
            self.countFrom = 0;
            self.defaultButtonText = 'Start Test';
            
			//self.timer = 0;

		}

		self.updatetime = function ()
		{
			++self.progressValue;
			--self.remainingTime;

		}

		self.startTest = function () {
			self.init();
			angular.element(".content textarea").removeAttr("disabled");
			angular.element('.content textarea').empty();
			self.isTestRestarted = !self.isTestRestarted;
			self.defaultButtonText = self.isTestRestarted ? 'Reset Test' : 'Start Test';
			if(!self.isTestRestarted ){
				self.stopTest();
			}
			else
			{
				self.testTimeIntervarl = interval (self.updatetime,1000);
				$timeout(self.stopTest, self.totalTime*1000);
			}
		}


		self.stopTest = function () {
			self.clearTimer();
			angular.element(".content textarea").attr("disabled","disabled");
			if ($scope.search && $scope.search.targetWords && $scope.search.targetWords.length && $scope.search.typeWords.length) {
				self.calcStatics();	
			};
		    self.openDialogueModal();
		}
        self.clearTimer = function () {
			interval.cancel(self.testTimeIntervarl);
			self.testTimeIntervarl  = undefined;
			
		}

		self.calcStatics = function () {

			var typeWords = $scope.search.typeWords;
			//Logic to calculate Accuracy
			self.accuracy = Math.round(100- (($scope.targetWords.length- typeWords.length)/$scope.targetWords.length *100)) + "%";
			//Logic to calculate errors
			self.errors = $scope.targetWords.length - typeWords.length;
			
			self.search.accuracy =self.accuracy;
			self.search.errors = self.errors;
		}



		self.openDialogueModal = function (){
			var modalInstance = modal.open({
 		keyboard: true,
        templateUrl : 'templates/modalContent.html',
        controller : 'ModalInstanceCtrl',
        resolve : {search :function(){
        	return $scope.search;
        }}



        
		});


		modalInstance.result.then(function(){
            //on ok button press 
          },function(){
            //on cancel button press
            console.log("Modal Closed");
          });
		}
		self.init();
	}]);
