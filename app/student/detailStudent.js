reciept.controller('detailStudentCtrl',function($rootScope,$timeout,$scope,$routeParams,STUDENT_TABLE){
console.log("dctrl");
$scope.studentId = $routeParams.id;
console.log($scope.studentId );

$scope.getStudent = (id)=> {
    q.selectAllById(STUDENT_TABLE,'id',$scope.studentId)
    .then((rows)=>
      $timeout(()=>{
        $scope.student = rows[0];
        $scope.student.dob = $scope.student.dob ? new Date($scope.student.dob) : undefined;
        console.log("stu:",$scope.student);
      },0)
      )};
$scope.getStudent($scope.studentId);


});