reciept.controller('receiptCtrl',  function($rootScope,$scope,$timeout,TYPES,SECTION,RECEIPT_TABLE){
	$scope.types = TYPES;
	$scope.section = SECTION;
	$scope.receipt = {studentName: '', date : '', class: '', section: '', feeType: '', amount: ''};

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
			/*$mdToast.show(
				$mdToast.simple()
				.textContent('Transaction Added.')
				.position('bottom right')
				.hideDelay(3000)
				);*/
		})
		.catch((err)=>{
			console.error('err, receipt insertion', err);
		});
	};

})
.constant('TYPES', ['Admission Fee' , 'Tution Fee', 'Exam Fee', 'Other Fee'])
.constant('SECTION', ['A','B','C']);