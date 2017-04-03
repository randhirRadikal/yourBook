var app = angular.module("App");
app.controller("homeCtrl", function ($scope,$timeout,$firebaseObject,Upload) {

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

      /*


      //this variable represents the total number of popups can be displayed according to the viewport width
      $scope.total_popups = 0;

      //arrays of popups ids
      $scope.popups = [];

      //this is used to close a popup
      $scope.close_popup = function(id)
      {
          for(var iii = 0; iii < $scope.popups.length; iii++)
          {
              if(id == $scope.popups[iii])
              {
                  Array.remove($scope.popups, iii);

                  document.getElementById(id).style.display = "none";

                  $scope.calculate_popups();

                  return;
              }
          }
      };

      //displays the popups. Displays based on the maximum number of popups that can be displayed on the current viewport width
      $scope.display_popups = function()
      {
          var right = 220;

          var iii = 0;
          for(iii; iii < $scope.total_popups; iii++)
          {
              if($scope.popups[iii] != undefined)
              {
                  var element = document.getElementById($scope.popups[iii]);
                  element.style.right = right + "px";
                  right = right + 320;
                  element.style.display = "block";
              }
          }

          for(var jjj = iii; jjj < $scope.popups.length; jjj++)
          {
              var element = document.getElementById($scope.popups[jjj]);
              element.style.display = "none";
          }
      };

      //creates markup for a new popup. Adds the id to popups array.
      $scope.register_popup = function(id, name)
      {
        console.log(id,name);
          for(var iii = 0; iii < $scope.popups.length; iii++)
          {
              //already registered. Bring it to front.
              if(id == $scope.popups[iii])
              {
                  Array.remove($scope.popups, iii);

                  $scope.popups.unshift(id);

                  $scope.calculate_popups();


                  return;
              }
          }

          var element = '<div class="popup-box chat-popup" id="'+ id +'">';
          element = element + '<div class="popup-head">';
          element = element + '<div class="popup-head-left">'+ name +'</div>';
          element = element + '<div class="popup-head-right"><a href="javascript:void(0);" ng-click="close_popup(\''+ id +'\');">&#10005;</a></div>';
          element = element + '<div style="clear: both"></div></div><div class="popup-messages"></div></div>';

          document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML + element;

          $scope.popups.unshift(id);

          $scope.calculate_popups();

      };

      //calculate the total number of popups suitable and then populate the toatal_popups variable.
      $scope.calculate_popups = function()
      {
          var width = window.innerWidth;
          if(width < 540)
          {
              $scope.total_popups = 0;
          }
          else
          {
              width = width - 200;
              //320 is width of a single popup box
              $scope.total_popups = parseInt(width/320);
          }

          $scope.display_popups();

      };

      //recalculate when window is loaded and also when window is resized.
      //window.addEventListener("resize", $scope.calculate_popups);
      //window.addEventListener("load", $scope.calculate_popups);*/

});
