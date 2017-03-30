var app = angular.module("App");
app.controller("registrationCtrl", function ($scope,$timeout) {
  $scope.allMessage = {};
  $scope.userRegistration = function(add){
    $scope.isButtonBusy = true;
    firebase.auth().createUserWithEmailAndPassword(add.email, add.password)
    .then(function(res){
      $timeout(function(){
        $scope.isButtonBusy = false;
        $scope.allMessage = {
          error_code:'SUCCESS',
          error_message:'Registration successfully, please login.'
        };
      },0);
    })
    .catch(function(error) {
      $scope.isButtonBusy = false;
      $scope.allMessage = {
        error_code:'FAIL',
        error_message:'Some problem in registration please try agin later.'
      };
    });
  };

  $scope.closeAllMessageDiv = function(){
    $scope.allMessage={};
  };
});
