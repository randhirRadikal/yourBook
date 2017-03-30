var app = angular.module("App");
app.controller("mainCtrl", function ($scope,$timeout,authService) {
  console.log('main');

  $scope.logoutUser = function(){
    firebase.auth().signOut().then(function() {
      $timeout(function(){
        console.log('logout');
      },0);
    }).catch(function(error) {
      console.log(error);
    });
  };
  /*
  authService.onAuthStateChanged(function (res) {
    if(res.error){
      $scope.logoutUser();
    }else{

    }
  }); */


});
