reciept.controller('editReceiptCtrl', function($rootScope,$scope,$routeParams,RECEIPT_TABLE,$timeout,CLASS,TYPES,SECTION){
	$scope.receiptId = $routeParams.id;
	$scope.class = CLASS;
	$scope.types = TYPES;
	$scope.section = SECTION;
	console.log("route id :"+($scope.receiptId));

	$scope.getReceipt = (id)=> {
    q.selectAllById(RECEIPT_TABLE,'id',$scope.receiptId)
    .then((rows)=>
      $timeout(()=>{
        $scope.receipt = rows[0];
        $scope.receipt.date = $scope.receipt.date ? new Date($scope.receipt.date) : undefined;
      },0)
      )};

    $scope.getReceipt($scope.receiptId);
	
})
.constant('TYPES', ['Admission Fee' , 'Tution Fee', 'Exam Fee', 'Other Fee'])
.constant('SECTION', ['A','B','C'])
.constant('CLASS', ['Nursery','LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12']);