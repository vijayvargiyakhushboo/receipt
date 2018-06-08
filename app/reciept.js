const {shell} = require('electron')
const {dialog} = require('electron').remote

let reciept = angular.module('reciept', ['ngRoute', 'ngMaterial', 'ngMessages']);
reciept.config(function($routeProvider, $locationProvider,$mdThemingProvider) {
   $mdThemingProvider.theme('default')
    /*.primaryPalette('pink')
    .accentPalette('orange');*/
    $routeProvider
    .when("/", {
        templateUrl : "index2.html"
    });
});
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
    {title:'Add Receipt', content:'book/book.html'},
    {title:'View Receipt', content:'book/book.html'}
  ])
.constant('RECEIPT_TABLE', 'receipt')
.constant('STUDENT_TABLE', 'student');

/*angular.module('myApp', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');
});*/