reciept.controller('studentCtrl',  function($rootScope,$timeout,$scope,GENDER,STUDENT_TABLE){
	$scope.student = {'name': '', 'fatherName': '', 'motherName': '', 'dob': '', 'className': '','address': '','phone': '','email': '','className':'', 'gender': ''};
	$scope.gender = GENDER;

	$scope.resetStudent = ()=> {
		$scope.student= {};
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
	};

}).constant('GENDER', ['Female','Male']);