angular.module('App')
	 .factory('authService', ['$http', function ($http) {
				return {
								onAuthStateChanged: function (callback) {
									firebase.auth().onAuthStateChanged(function(user) {
										if (user) {
											callback({error:false,message:'User Login',result:user})
										} else {
											callback({error:true,message:'Logout',result:null})
										}
									});
								},
								getCurrentUserId : function(callback){
									firebase.auth().onAuthStateChanged(function(user) {
										if (user) {
											callback({userId:user.uid})
										} else {
											callback({userId:null})
										}
									});
								}
					 };
			 }
	 ]);
