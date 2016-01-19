angular.module('typing').controller('ModalInstanceCtrl', ['$scope', '$modalInstance','search', function ($scope, $modalInstance,search) {

	$scope.search = search;
	

	$scope.ok = function () {
		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	
}]);