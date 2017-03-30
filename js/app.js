var app = angular.module("App", [
  "ngRoute",
  "firebase",
  "ngImgCrop",
  "ngFileUpload"
]);
app.config(function($routeProvider) {

    $routeProvider
    .when("/", {
        templateUrl : "./views/home.html",
        controller : "homeCtrl"
    })
    .when("/registration", {
        templateUrl : "./views/registration.html",
        controller : "registrationCtrl"
    })
    .when("/login", {
        templateUrl : "./views/login.html",
        controller : "loginCtrl"
    });
});
app.run(function($rootScope,authService){
    var config = {
      apiKey: "AIzaSyCrOCzXNjxi_8RoazLkYG5-J5snCcxVF68",
      authDomain: "yourbook-58f8f.firebaseapp.com",
      databaseURL: "https://yourbook-58f8f.firebaseio.com",
      storageBucket: "yourbook-58f8f.appspot.com",
      messagingSenderId: "592378253377"
    };

    firebase.initializeApp(config);

    $rootScope.$on("$locationChangeStart", function(event, next, current) {
      authService.onAuthStateChanged(function(res){
        console.log(res);
      });
    });
});
