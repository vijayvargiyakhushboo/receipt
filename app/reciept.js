const {shell} = require('electron')
const {dialog} = require('electron').remote

let reciept = angular.module('reciept', ['ngRoute', 'ngMaterial', 'ngMessages']);

reciept.controller('recieptCtrl', function($rootScope,$scope,$mdDialog,$location, $timeout, TAB,$window) {
   $scope.tabs = TAB;
  
  $rootScope.template = $scope.tabs[0];
   $scope.goto = function(page){
    console.log("page:"+page);
    $rootScope.template = $scope.tabs[page];
    $timeout(function(){
      $location.path($rootScope.template.route);
    }, 0);
   };
   $scope.back = ()=>{
    $window.history.back();
}
})
 .constant('TAB',[
    {title:'Add Student', route:'/'},
    {title:'Student', route:'/student'},
    {title:'Add Receipt', route:'/receipt/add'},
    {title:'Receipt', route:'/receipt'}
  ])
.constant('RECEIPT_TABLE', 'receipt')
.constant('STUDENT_TABLE', 'student');

reciept.config(function($routeProvider, $locationProvider,$mdThemingProvider) {
   $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');
    $routeProvider
    .when("/", {
        templateUrl : 'file://' + __dirname + '/student/student.html'
    })
    .when("/student", {
        templateUrl : 'file://' + __dirname + '/student/viewStudent.html'
    })
    .when("/student/edit/:id", {
        templateUrl : 'file://' + __dirname + '/student/editStudent.html'
    })
    .when("/receipt/add", {
        templateUrl : 'file://' + __dirname + '/receipt/receipt.html'
    })
    .when("/receipt", {
        templateUrl : 'file://' + __dirname + '/receipt/receiptView.html'
    })
    .when("/receipt/edit/:id", {
        templateUrl : 'file://' + __dirname + '/receipt/editReceipt.html'
    })
     .when("/student/detail/:id", {
        templateUrl : 'file://' + __dirname + '/student/detailStudent.html'
    });
    
    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode({enabled: false, requireBase: false});
});


