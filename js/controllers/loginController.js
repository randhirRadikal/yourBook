var app = angular.module("App");
app.controller("loginCtrl", function ($scope,$timeout) {
    $scope.msg = "Login";
    $scope.userLogin = function(login){
      $scope.isButtonBusy = true;
      firebase.auth().signInWithEmailAndPassword(login.email, login.password)
      .then(function(res){
        $timeout(function () {
          $scope.isButtonBusy = false;
          $scope.userId = res.uid;
        },0);
      })
      .catch(function(err) {
        console.log(err);
      });
    };
});
