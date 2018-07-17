reciept.controller('receiptCtrl',  function($rootScope,$scope,$timeout,TYPES,SECTION,RECEIPT_TABLE,CLASS){
	$scope.types = TYPES;
	$scope.section = SECTION;
	$scope.class = CLASS;
	$scope.receipt = {studentName: '', date : '', class: '', section: '', feeType: '', amount: '',deleted: 0};

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

})
.constant('TYPES', ['Admission Fee' , 'Tution Fee', 'Exam Fee', 'Other Fee'])
.constant('SECTION', ['A','B','C'])
.constant('CLASS', ['Nursery','LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12']);