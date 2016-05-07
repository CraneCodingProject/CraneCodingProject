'use strict';

angular.module('HomePage')

.controller('HomePageController',
    ['$scope', '$rootScope', '$location', '$cookieStore', 'AuthenticationService', 'registerAccApi','$timeout','lstCommandsApi',
    function ($scope, $rootScope, $location, $cookieStore, AuthenticationService, registerAccApi, $timeout,lstCommandsApi) {
        // reset login status
       // $scope.logout = false;
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $scope.logout = true;
        }
        $scope.logoutAct = function () {
            AuthenticationService.ClearCredentials();
            $scope.logout = false;
            $('#logoutModal').hide();
        }
        $scope.login = function () {
            
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
            	if (response == 'true') {
                    // sự kiện ở đây
                	console.log('sự kiện ở đây '+response);
                    AuthenticationService.SetCredentials($scope.username, $scope.password); // gọi service để lưu cookie
                   // $location.path('/');
                    //$('#loginForm').modal('hide');
                    $('#loginForm').hide();
                    $scope.logout = true;
                } else {
                    console.log('fail');
                    console.log('sự kiện ở sasas fgaliđây  '+response);
                    $scope.error = 'Account is not exist';
                    $scope.logout = false;
                }
            });
        };
        $scope.goToMainPage = function () {
            console.log('asasas');
            $rootScope.globals = $cookieStore.get('globals') || {};
            
            if ($rootScope.globals.currentUser) {
                $location.path('/');
            }
            else {
                $('#loginForm').show();
            }
        }
        $scope.register = function () {

            registerAccApi.registerNewAcc($scope.username,$scope.firstname,$scope.lastname,$scope.usermail, $scope.password)
            .then(
                function (response) {
                	console.log('__AA___'+response.data.success);
                	console.log('__AA___'+response.data.message);
                    if (response.data.success==true) {
                        console.log(response.data+'___dang ky thanh cong');
                        $scope.registerFalse=false;
                        //console.log('success : '  + response.data.message);
                        $scope.registerSuccess = response.data.message;
                        $timeout(function(){
                            $scope.showForm= true;
                            $('#loginForm').hide();
                        },2000);
                    }
                    else{
                    	console.log(' callback true_dang ky fail con me no');
                        $scope.registerFalse = response.data.message;
                        $scope.registerSuccess=false;
                        $scope.dataLoading = false;
                    }
                },
                function(response){
                	console.log('callback fail _ dang ky fail con me no');
                }
            );
        }
        $scope.getDetailCommand = function(element){
        	$('#commandContentId_Homepage').empty();
        	console.log(element);
        	lstCommandsApi.getLstCommands()
        	.then(
        		function(response){
        			var lst_command = response.data;
        			lst_command.forEach(
        				function(item){
        					if(item.exerciseName==element){
        						$('#commandContentId_Homepage').html(item.exerciseNumber);
        						$scope.commandName = item.exerciseName||'';
        					}
        				}
        			)
        		},
        		function(response){
        			alert('Some errors happent.');
        		}
        	);
        }
        
    }])
.factory('registerAccApi', ['$http',
    function ($http) {
        $http.registerNewAcc = function (username,firstname,lastname,usermail, password) {
            console.log(password + ' username : ' + username);
            var userAcc = {
                username: username,
                firstname:firstname,
                lastname:lastname,
                usermail:usermail,
                password: password
            };
            var config = { params: userAcc };
            return $http.post('/api/exercise/register', userAcc);
        }
        return $http;
    }
])

.factory('lstCommandsApi', ['$http',
     function($http) {
		$http.getLstCommands = function() {
			return $http.get('/modules/mainPage/text.js')//api/command/getallcommands //api/exercise/getallexercises
		}
		return $http;
	}
])

;
