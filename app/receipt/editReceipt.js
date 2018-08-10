reciept.controller('editReceiptCtrl', function($rootScope,$scope,$routeParams,RECEIPT_TABLE,$timeout,CLASS,TYPES,SECTION,STUDENT_TABLE){
	$scope.receiptId = $routeParams.id;
	$scope.class = CLASS;
	$scope.types = TYPES;
	$scope.section = SECTION;
	$scope.receipt = {studentName: '', date : '', class: '', section: '', feeType: '', amount: '',deleted: 0};

	/*$scope.getReceipt = (id)=> {
		q.selectAllById(RECEIPT_TABLE,'id',$scope.receiptId)
		.then((rows)=>
			$timeout(()=>{
				$scope.receipt = rows[0];
				$scope.receipt.date = $scope.receipt.date ? new Date($scope.receipt.date) : undefined;
			},0)
			)};*/

		$scope.getReceipt = (id)=> {
		q.selectAllFrmTablsById(RECEIPT_TABLE,STUDENT_TABLE,'id',$scope.receiptId)
		.then((rows)=>
			$timeout(()=>{
				console.log("getReceipt frm:",rows);

				$scope.receipt = rows[0];
				$scope.receipt.studentName = rows[0].name;
				$scope.receipt.date = $scope.receipt.date ? new Date($scope.receipt.date) : undefined;
			},0)
			)};

		$scope.submitReceipt = (receipt)=>{
			let keys = Object.keys($scope.receipt);
			let values = Object.values($scope.receipt);
			q.update(RECEIPT_TABLE,keys,values,'id',$scope.receiptId)
			.then((data)=>{
				$timeout(()=>{
					$scope.resetReceipt();
				},0);
			})
			.catch((err)=>{
				console.error('err , receipt updation', err);
			});
		};

		$scope.resetReceipt =()=>{
			$scope.receipt= {};
		};
		$scope.getReceipt($scope.receiptId);
	})
.constant('TYPES', ['Admission Fee' , 'Tution Fee', 'Exam Fee', 'Other Fee'])
.constant('SECTION', ['A','B','C'])
.constant('CLASS', ['Nursery','LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12']);