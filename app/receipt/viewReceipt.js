reciept.controller('viewReceiptCtrl', function($rootScope ,$scope,RECEIPT_TABLE,$timeout,STUDENT_TABLE,$routeParams){
  const {shell} = require('electron');
  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };

  $scope.getReceipt = (tableName1,tableName2)=>{
    q.selectAllByTable(tableName1,tableName2)
    .then((rows)=>{
      if(rows)
        for(let row of rows){
          row.date = row.date ? new Date(row.date) : null;
          row.studentName = row.name;
        }
        $timeout(()=>{
          $scope.hideNoDataFound = true;
          $scope.receipt = rows;
          if(rows && rows.length == 0)
            $scope.hideNoDataFound = false;
        },0);
      })
    .catch((error)=>{
      console.log('get receipt error:',error); 
    });
  }  

  $scope.deleteReceipt = (eve,receipt)=>{
      shell.beep()
    $scope.confirmReceipt(receipt);
  }

  $scope.confirmReceipt = (receipt)=>{
    $scope.receipt = receipt;
    let keys = ['deleted'];
    let values = [1];
    q.update(RECEIPT_TABLE, keys, values, 'id', $scope.receipt.id)
    .then((data)=>{
      $timeout (()=>{
      },0)
    })
    .catch((err)=>{
      console.error('err occured while insertion',err);
    });
    $scope.getReceipt(RECEIPT_TABLE,STUDENT_TABLE);
  }

  $scope.getReceipt(RECEIPT_TABLE,STUDENT_TABLE);
});