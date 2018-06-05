const {shell} = require('electron')
const {dialog} = require('electron').remote

let reciept = angular.module('reciept', ['ngRoute', 'ngMaterial', 'ngMessages']);
reciept.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "index2.html"
    });
});
reciept.controller('recieptCtrl', function($rootScope,$scope) {
    $scope.tabs = [
    {title:'Add Receipt', content:'book/book.html'},
    {title:'View Receipt', content:'book/book.html'}
    
  ];
  
  $scope.template = $scope.tabs[0];
   $scope.goto = function(page){
  console.log("page:"+page);
  $rootScope.template = $scope.tabs[page];
 };
})
.constant('RECEIPT_TABLE', 'receipt');

