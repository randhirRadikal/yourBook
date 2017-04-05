var app = angular.module("App");
app.controller("homeCtrl", function ($scope,$timeout,Upload) {

    $scope.myImage='';
    $scope.myCroppedImage='';
    var rootRef = firebase.database().ref();
    var storageRef = firebase.storage().ref();
    var userRef = rootRef.child('users');

    $scope.users = [];
    userRef.on('value', function(snapshot) {
       $timeout(function () {
         $scope.users = snapshot.val();
       },0);
    });

    $scope.uploadProfilePic = function(file){
      $scope.allMessage = {
        error_code : 'WAIT',
        error_message : "Loading..."
      };
      var metadata = {
        contentType: 'image/jpeg'
      };
      var fileName = new Date().getTime()+'_'+file.name;
      if(storageRef.child('profilePic/' + fileName).put(file, metadata)){
        var data = {
          name : "Randhir Jha",
          username : 'randhir',
          password : '123456',
          imageUrl : storageRef.child('profilePic/') +'/'+fileName
        };
        userRef.push(data);
        console.log(data);
        $scope.allMessage = {
          error_code : 'SUCCESS',
          error_message : "Profile image uploaded successfully."
        };
      }else{
        $scope.allMessage = {
          error_code : 'Fail',
          error_message : "Some problem"
        };
      }
    };

    var handleFileSelect=function(evt) {
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
          $scope.$apply(function($scope){
            $scope.myImage=evt.target.result;
          });
        };
        reader.readAsDataURL(file);
      };
      angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);


});
