reciept.controller('viewReceiptCtrl', function($rootScope ,$scope,RECEIPT_TABLE,$timeout){

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };

  $scope.getReceipt = (tableName)=>{
    q.selectAll(tableName)
    .then((rows)=>{
      if(rows)
        for(let row of rows){
          row.dob = row.dob ? new Date(row.dob) : null;
        }
        $timeout(()=>{
          $scope.hideNoDataFound = true;
          $scope.receipt = rows;
          console.log("receipt... ",$scope.receipt);
          if(rows && rows.length == 0)
            $scope.hideNoDataFound = false;
        },0);
      })
    .catch((error)=>{
      console.log('get receipt:',error); 
    });

  }  
  $scope.getReceipt(RECEIPT_TABLE);
});