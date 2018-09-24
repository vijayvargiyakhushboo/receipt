reciept.controller('editStudentCtrl',  function($rootScope,$scope,$timeout,STUDENT_TABLE,$routeParams,GENDER,CLASS,$mdToast,$window){
  $scope.studentId = $routeParams.id;
  $scope.student = {name:'',fatherName:'', motherName:'',dob:'',address:'',gender:'',phone:'',email:'',className:'',deleted:0};
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

  $scope.getStudent = (id)=> {
    q.selectAllById(STUDENT_TABLE,'id',$scope.studentId)
    .then((rows)=>
      $timeout(()=>{
        $scope.student = rows[0];
        $scope.student.dob = $scope.student.dob ? new Date($scope.student.dob) : undefined;
      },0)
      )};

    $scope.submitStudent =(student)=> {
      let keys = Object.keys($scope.student);
      let values = Object.values($scope.student);
      $scope.getStudent($scope.studentId);
      $scope.$watch('student', function(newVal, oldVal){
        console.log("newValue : ",newVal);
        console.log("oldVal : ",oldVal);
 if(newVal === oldVal){
    console.log('no changed student!');
 }
 else{
  console.log('changed student!');
 }
}, true);
       //$scope.$watch("student", function (newValue, oldValue) {
        /*$scope.$watchCollection('student', function(newValue, oldValue) {
    console.log('$watchCollection');
    console.log(newValue.name+" && "+oldValue.name); 

  
        if( (oldValue.name != newValue.name) || (oldValue.fatherName != newValue.fatherName) || (oldValue.motherName != newValue.motherName) || (oldValue.dob != newValue.dob) || (oldValue.address != newValue.address) || (oldValue.gender != newValue.gender) || (oldValue.phone != newValue.phone) )
        {
          console.log("Changed...");
          q.update(STUDENT_TABLE, keys, values,'id',$scope.studentId)
          .then((data)=>{
          $timeout(()=>{
          $scope.resetStudent();
          },0);

          })
          .catch((err)=>{
          console.error('err, student updation', err);
          });
          $scope.showToast();
          $window.history.back();
        }else{
          console.log("no change");
          
        }
    },true);*/
     
    };
    $scope.showToast = function() {
    var pinTo = $scope.getToastPosition();

    $mdToast.show(
      $mdToast.simple()
        .textContent('Student Updated ...!')
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

    $scope.getStudent($scope.studentId);
   
  }).constant('GENDER', ['Female','Male'])
.constant('CLASS', ['Nursery','LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12']);