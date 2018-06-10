reciept.controller('editStudentCtrl',  function($rootScope,$scope,$timeout,STUDENT_TABLE,$routeParams){
$scope.studentId = $routeParams.id;
console.log("editStudent.js");
	/*$scope.student = {name:'',fatherName:'', motherName:'',dob:'',address:'',gender:'',phone:'',email:'',className:'',};

	$scope.init = ()=> {
      q.selectAllById(STUDENT_TABLE, 'id', $scope.studentId)
      .then((rows)=>
        $timeout(()=> {
        $scope.student = rows[0];
        $scope.student.dob = $scope.student.dob ? new Date($scope.student.dob) : undefined;
      },0)
    )};

	 $scope.init(); */
});