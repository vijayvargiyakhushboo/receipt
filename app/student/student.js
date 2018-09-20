reciept.controller('studentCtrl',  function($rootScope,$timeout,$scope,GENDER,STUDENT_TABLE,CLASS,$mdToast){
	$scope.student = {'name': '', 'fatherName': '', 'motherName': '', 'dob': '', 'className': '','address': '','phone': '','email': '','className':'', 'gender': ''};
	$scope.gender = GENDER;
	$scope.className = CLASS;
	 var last = {
      bottom: false,
      top: true,
      left: false,
      right: false
    };
 $scope.toastPosition = angular.extend({},last);
	$scope.resetStudent = ()=> {
		$scope.student= {};
		$scope.studentForm.$setPristine();
        $scope.studentForm.$setUntouched();
	}
	
	$scope.submitStudent =(student)=> {
		console.log("student :",student);
		let keys = Object.keys($scope.student);
		let values = Object.values($scope.student);
		console.log("submitStudent");
		q.insert(STUDENT_TABLE, keys, values)
		.then((data)=>{
			$timeout(()=>{
				$scope.resetStudent();
			},0);
			
			})
		.catch((err)=>{
			console.error('err, student insertion', err);
		});
		$scope.showToast();
	};

	$scope.showToast = function() {
    var pinTo = $scope.getToastPosition();

    $mdToast.show(
      $mdToast.simple()
        .textContent('Student Added!')
        .position(pinTo )
        .hideDelay(2000)
    );
  };

  $scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  function sanitizePosition() {
    var current = $scope.toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }

}).constant('GENDER', ['Female','Male'])
.constant('CLASS', ['Nursery','LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12']);