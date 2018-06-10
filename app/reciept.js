const {shell} = require('electron')
const {dialog} = require('electron').remote

let reciept = angular.module('reciept', ['ngRoute', 'ngMaterial', 'ngMessages']);
reciept.controller('recieptCtrl', function($rootScope,$scope,TAB) {
   $scope.tabs = TAB;
   
  
  $rootScope.template = $scope.tabs[0];
   $scope.goto = function(page){
  console.log("page:"+page);
  $rootScope.template = $scope.tabs[page];
 };
})
 .constant('TAB',[
    {title:'Add Student', content:'student/student.html'},
    {title:'View Student', content:'student/viewStudent.html'},
    {title:'Add Receipt', content:'receipt/receipt.html'},
    {title:'View Receipt', content:'receipt/receiptView.html'}
  ])
.constant('RECEIPT_TABLE', 'receipt')
.constant('STUDENT_TABLE', 'student');

reciept.config(function($routeProvider, $locationProvider,$mdThemingProvider) {
   $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');
    $routeProvider
    .when("/student/edit/", {
        templateUrl : 'file://' + __dirname + '/student/editStudent.html'
    });
    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode({enabled: false, requireBase: false});
});


