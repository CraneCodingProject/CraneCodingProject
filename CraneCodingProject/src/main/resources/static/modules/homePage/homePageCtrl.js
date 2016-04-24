'use strict';

angular.module('HomePage')

.controller('HomePageController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService', 'registerAccApi',
    function ($scope, $rootScope, $location, AuthenticationService, registerAccApi) {
        // reset login status
       
        $scope.logout = function () {
            AuthenticationService.ClearCredentials();
        }
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
            	
            	if (response) {
            		console.log('sdfsdfsdfsd');
                    AuthenticationService.SetCredentials($scope.username, $scope.password); // gọi service để lưu cookie
                    $location.path('/');
                } else {
                    console.log('fail');
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
        $scope.register = function () {
            $scope.dataLoading = true;

            registerAccApi.registerNewAcc($scope.username, $scope.password,$scope.rePassword)
            .then(
                function (response) {
                    if (response.data.success) {
                        $scope.dataLoading = false;
                        console.log('success : '  + response.data.message);
                        $scope.registerSuccess = response.data.message;
                    }
                },
                function(response){
                }
            );
        };
    }])
.factory('registerAccApi', ['$http',
    function ($http) {
        $http.registerNewAcc = function (username, password, repassword) {
            console.log(password + ' username : ' + username);
            var userAcc = {
                username: username,
                password: password,
                repassword: repassword
            };
            var config = { params: userAcc };
            return $http.post('/api/exercise/register', userAcc);
        }
        return $http;
    }
])

;