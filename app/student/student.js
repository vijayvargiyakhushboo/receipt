reciept.controller('studentCtrl',  function($rootScope,$timeout,$scope,GENDER,STUDENT_TABLE,CLASS){
	$scope.student = {'name': '', 'fatherName': '', 'motherName': '', 'dob': '', 'className': '','address': '','phone': '','email': '','className':'', 'gender': ''};
	$scope.gender = GENDER;
	$scope.className = CLASS;

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

}).constant('GENDER', ['Female','Male'])
.constant('CLASS', ['Nursery','LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12']);