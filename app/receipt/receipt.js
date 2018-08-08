reciept.controller('receiptCtrl',  function($rootScope,$scope,$timeout,TYPES,RECEIPT_TABLE,CLASS,STUDENT_TABLE){
	$scope.types = TYPES;
	$scope.class = CLASS;
	$scope.receipt = {studentName: '', date : '', class: '', admissionFee: '',tutionFee:'',examFee:'',otherFee:'',deleted: 0};
  $scope.student={};
  $scope.resetReceipt = ()=>{
    $scope.receipt ={};
    $scope.receiptForm.$setPristine();
    $scope.receiptForm.$setUntouched();
  };

  $scope.submitReceipt =(receipt)=> {
    let keys = Object.keys($scope.receipt);
    let values = Object.values($scope.receipt);
    q.insert(RECEIPT_TABLE, keys, values)
    .then((data)=>{
     $timeout(()=>{
      $scope.resetReceipt();
    },0);
   })
    .catch((err)=>{
     console.error('err, receipt insertion', err);
   });
  };

  $scope.searchStudent = (keyword)=>{
    let result = [];
    let student = [];
    for(let st of $scope.student){
      st.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ? result.push(st) : student.push(st);
    }
    $scope.receipt.studentName = result[0].id;
    return result.length > 0 ? result :student;
  };

  $scope.updateSelectedStud = (student)=>{
    if(student && student.id){
      $scope.student = student;
    }else{
      $scope.student = null;
      $scope.receipt = [];
    }
  };

  $scope.getDataByTable = (tableName, modelName)=>{
   q.selectAll(tableName)
   .then((rows)=>{
    if(rows)
     for(let row of rows){
      row.dob = row.date ? new Date(row.dob) : null;
    }
    $scope[modelName] = rows;

  })
   .catch((err)=>{
    console.error(err);
  });
 };
 $scope.getDataByTable(STUDENT_TABLE, STUDENT_TABLE);

})
//.constant('TYPES', ['Admission Fee' , 'Tution Fee', 'Exam Fee', 'Other Fee'])
.constant('TYPES', ['admissionFee' , 'tutionFee', 'examFee', 'otherFee'])
.constant('CLASS', ['Nursery','LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12']);