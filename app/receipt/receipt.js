reciept.controller('receiptCtrl',  function($rootScope,$scope,$timeout,TYPES,RECEIPT_TABLE,CLASS,STUDENT_TABLE){
	$scope.types = TYPES;
	$scope.class = CLASS;
	$scope.receipt = {studentName: '', date : '', class: '', admissionFee: '',tutionFee:'',examFee:'',otherFee:'',deleted: 0};
    $scope.student={};
	$scope.resetReceipt = ()=>{
		$scope.receipt ={};
	};

	$scope.submitReceipt =(receipt)=> {
		console.log("receipt :",receipt);
		let keys = Object.keys($scope.receipt);
		let values = Object.values($scope.receipt);
		console.log("submitReceipt");
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
		console.log("searchStudent ",$scope.student);
      let result = [];
      let student = [];
      console.log(".. ",$scope.student);
      for(let stud of $scope.student){
        stud.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ? result.push(stud) : student.push(stud);
      }
      return result.length > 0 ? result :student;
    };

    $scope.getDataByTable = (tableName, modelName)=>{
    	q.selectAll(tableName)
    	.then((rows)=>{
    		if(rows)
    			for(let row of rows){
    				row.dob = row.date ? new Date(row.dob) : null;
    			}
    			$scope[modelName] = rows;
    			console.log("KV ",$scope.student);
    			
    		})
    	.catch((err)=>{
    		console.error(err);
    	});
    };
     $scope.getDataByTable(STUDENT_TABLE, STUDENT_TABLE);

})
.constant('TYPES', ['Admission Fee' , 'Tution Fee', 'Exam Fee', 'Other Fee'])
.constant('CLASS', ['Nursery','LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12']);