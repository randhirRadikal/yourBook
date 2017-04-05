var app = angular.module("App");
app.controller("chatPopupCtrl", function ($scope,$timeout,user,authService) {
    $scope.msg = "Login";
    console.log(user);
    $scope.otherUser = user;
    var userId = null;
    authService.getCurrentUserId(function(res){
      userId = res.userId;
    });



});
