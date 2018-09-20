reciept.controller('viewStudentCtrl', function($rootScope,$scope,STUDENT_TABLE,$timeout){
	
	$scope.sortBy = function(propertyName) {
		$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
		$scope.propertyName = propertyName;
	};
	
	$scope.getStudent = (tableName)=>{
		q.selectAll(tableName)
		.then((rows)=>{
			if(rows)
				for(let row of rows){
					row.dob = row.dob ? new Date(row.dob) : null;
				}
				$timeout(()=>{
					$scope.hideNoDataFound = true;
					$scope.students = rows;
					if(rows && rows.length == 0)
						$scope.hideNoDataFound = false;
				},0);
			})
		.catch((error)=>{
			console.log('get student:',error); 
		});
	}

	$scope.deleteStudent = (eve,student)=>{
		shell.beep()
		$scope.confirmStudent(student);
	}

	$scope.confirmStudent = (student)=>{
		$scope.student = student;
		let keys = ['deleted'];
		let values = [1];
		console.log("confirmstudent");
		q.update(STUDENT_TABLE, keys, values, 'id', $scope.student.id)
		.then((data)=>{
			$timeout (()=>{
			},0)
		})
		.catch((err)=>{
			console.error('err occured while insertion',err);
		});
		$scope.getStudent(STUDENT_TABLE);
	}

	$scope.getStudent(STUDENT_TABLE);
	
});