'use strict';

angular.module('HomePage')

.controller('HomePageController',
    ['$scope', '$rootScope', '$location', '$cookieStore', 'AuthenticationService', 'registerAccApi','$timeout','lstCommandsApi',
    function ($scope, $rootScope, $location, $cookieStore, AuthenticationService, registerAccApi, $timeout,lstCommandsApi) {
       /**
        * Get userAcc from cookie
        */
        $rootScope.globals = $cookieStore.get('globals') || {};
        /*------------------------------------------------------------------*/
        
        /**
         * Set initial condition when page load or sign-in actions
         */
        function initialCondition(){
            $scope.username = null;
            $scope.password = null;
            $scope.lastname = null;
            $scope.usermail = null;
            $scope.password = null;
            $scope.rePassword = null;
        }
        /*------------------------------------------------------------------*/
        
        /**
         * Sign-in
         * When User click to Sign-in button
         *      Set initialCondition 
         *      Show log-in Form (pop-up) 
         *      
         */
        $scope.openSignInModel = function(){
            initialCondition();
            $('#loginForm').show();
            $scope.showForm = false;
        }
        /*------------------------------------------------------------------*/
        
        /**
         * If user was log-in 
         *      Show log-out button --> $scope.logout = true;
         */
        
        if ($rootScope.globals.currentUser) {
            $scope.logout = true;
        }
        /*------------------------------------------------------------------*/
        
        /**
         * Log-out
         * Pop-up validate user want to log-out ?
         * If user log-out 
         *      Clear cookies by ClearCredentials with using service AuthenticationService
         *      Hide log-out button --> $scope.logout = false;
         *      Hide Pop-up
         */
        
        $scope.logoutAct = function () {
            AuthenticationService.ClearCredentials();
            $scope.logout = false;
            $('#logoutModal').hide();
        }
        /*------------------------------------------------------------------*/
        
        /**
         * Pop-up
         * Log-in
         * Service : AuthenticationService
         *      If server return true ( mean : have acc )
         *          Set UserAcc to cookie by  SetCredentials ( username, password ) using service AuthenticationService
         *          Hide Pop-up
         *          Show log-out button --> $scope.logout = true;   
         *      If server return false ( mane : dont have acc)
         *          Notification : $scope.error = 'Account is not exist'
         *          Hide log-out button --> $scope.logout = false;   
         * 
         */
        $scope.login = function () {
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
            	if (response == 'true') {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $('#loginForm').hide();
                    $scope.logout = true;
                } else {
                    $scope.error = 'Account is not exist';
                    $scope.logout = false;
                }
            });
        };
        /*------------------------------------------------------------------*/
        
        /**
         * Go to mainPage
         * Check user was loged-in or not
         *      If Loged
         *          go to mainPage
         *      else 
         *          request log-in by pop-up loginForm
         * 
         */
        $scope.goToMainPage = function () {
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $location.path('/');
            }
            else {
                $('#loginForm').show();
            }
        }
        /*------------------------------------------------------------------*/
        
        /**
         * Pop-up
         * Register
         * Service : registerAccApi
         *      If server return true ( mean acc was created successfully )
         *          Notification : $scope.registerSuccess = response.data.message;
         *          Hide 'loginForm' by $timeout() 2s
         *      If server return false ( mean acc've already exist )
         *          Notification : $scope.registerFalse = response.data.message;
         */
        $scope.register = function () {
            registerAccApi.registerNewAcc($scope.username,$scope.firstname,$scope.lastname,$scope.usermail, $scope.password)
            .then(
                function (response) {
                    if (response.data.success==true) {
                        $scope.registerFalse=false;
                        $scope.registerSuccess = response.data.message;
                        $timeout(function(){
                            $scope.showForm= true;
                            $('#loginForm').hide();
                        },2000);
                    }
                    else{
                        $scope.registerFalse = response.data.message;
                        $scope.registerSuccess=false;
                        $scope.dataLoading = false;
                    }
                },
                function(response){
                	alert('OOP.! Some errors happent....!');
                }
            );
        }
        /*------------------------------------------------------------------*/
        /**
         * Get detail commands
         * Pop-up
         * Get all detail commands from text.js
         * 
         */
        $scope.getDetailCommand = function(element){
        	$('#commandContentId_Homepage').empty();
        	// console.log(element);
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
        /*------------------------------------------------------------------*/
        
    }])
    
    .factory('registerAccApi', ['$http',
        function ($http) {
            $http.registerNewAcc = function (username,firstname,lastname,usermail, password) {
                // console.log(password + ' username : ' + username);
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
