'use strict';

angular.module('HomePage')

.controller('HomePageController',
    ['$scope', '$rootScope', '$location', '$cookieStore', 'AuthenticationService', 'registerAccApi',
    function ($scope, $rootScope, $location, $cookieStore, AuthenticationService, registerAccApi) {
        // reset login status
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $scope.logout = true;
        }
        $scope.logoutAct = function () {
            AuthenticationService.ClearCredentials();
            $scope.dataLoading = false;
            $scope.logout = false;
        }
        $scope.login = function () {
            $scope.dataLoading = true;
            
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
            	if (response) {
                    // sự kiện ở đây
                	console.log('sự kiện ở đây '+response);
                    AuthenticationService.SetCredentials($scope.username, $scope.password); // gọi service để lưu cookie
                   // $location.path('/');
                    $scope.dataLoading = true;
                    $('#loginForm').modal('hide');
                    $scope.logout = true;
                } else {
                    console.log('fail');
                    console.log('sự kiện ở sasas fgaliđây  '+response);
                    $scope.error = 'Account is not exist';
                    $scope.dataLoading = false;
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
                $('#loginForm').modal('show');
            }
        }
        $scope.register = function () {
            $scope.dataLoading = true;

            registerAccApi.registerNewAcc($scope.username,$scope.firstname,$scope.lastname,$scope.usermail, $scope.password)
            .then(
                function (response) {
                	console.log('__AA___'+response.data.success);
                	console.log('__AA___'+response.data.message);
                    if (response.data.success==true) {
                        $scope.dataLoading = false;
                        console.log(response.data+'___dang ky thanh cong');
                        //console.log('success : '  + response.data.message);
                        //$scope.registerSuccess = response.data.message;
                    }
                    else{
                    	console.log(' callback true_dang ky fail con me no');
                    }
                },
                function(response){
                	console.log('callback fail _ dang ky fail con me no');
                }
            );
        };
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

;