var app = angular.module("App");
app.controller("registrationCtrl", function ($scope,$timeout) {
  $scope.allMessage = {};
  

  $scope.closeAllMessageDiv = function(){
    $scope.allMessage={};
  };
});
