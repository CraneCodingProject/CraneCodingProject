'use strict';

angular.module('AdminPage')

    .controller('AdminPageController',
    ['$scope', '$rootScope', '$location', '$timeout', '$window', 'createUpdateExercise', 'getAllExercises', 'deleteExercise',
        function ($scope, $rootScope, $location, $timeout, $window, createUpdateExercise, getAllExercises, deleteExercise) {
            $scope.loginSuccess = false;
            $scope.checkAdmin = false;
            $scope.idExercise = null;
            
            $scope.adminLogin = function (acc, pass) {
                if (acc = "admin" && pass == "admin") {
                    $scope.loginSuccess = true;
                }
                else {
                    $scope.checkAdmin = true;
                }
                // $http.post('/api/admin/authentication', { username: acc, password: pass })
                //     .success(function (response) {
                //         $scope.loginSuccess = true;
                // })
                // .error(function(response){
                // 	console.log('fali');
                //     $scope.checkAdmin = true;
                //     $scope.loginSuccess = false;
                // });
            }
            getAllExercises.getAllExercises().then(
                function (response) {
                    $scope.lstExercises = response.data;
                },
                function (response) {
                    console.log('fail');
                });
            $scope.exerciseDetails = function (idExercise, exerciseName, exerciseContent, exerciseAnswer, exercisePseudocode) {
                $scope.idExercise = idExercise || '';
                $('#Exercise-name').empty().val(exerciseName);
                $('#Exercise-content').empty().val(exerciseContent);
                $('#Exercise-answer').empty().val(exerciseAnswer);
                $('#Exercise-pseducode').empty().val(exercisePseudocode);
            }
            $scope.createExercise = function () {
                createUpdateExercise.createOrUpdateExercise($scope.idExercise, $scope.exerciseName, $scope.exerciseContent, $scope.exerciseAnswer, $scope.exercisePseducode)
                    .then(
                    function (response) {
                        //success --> reload lst
                        // getAllExercises.getAllExercises().then(
                        //     function (response) {
                        //         $scope.lstExercises = response.data;
                        //     },
                        //     function (response) {
                        //         console.log('fail');
                        //     });
                    },
                    function (response) {
                        console.log($scope.idExercise);
                        console.log($scope.exerciseName);
                        console.log($scope.exerciseContent);
                        console.log($scope.exerciseAnswer);
                        console.log($scope.exercisePseducode);
                        console.log('fail :(');
                    }
                    );
            }
            $scope.addNewExercise = function () {
                $scope.idExercise = null;
                $('#Exercise-name').val('');
                $('#Exercise-content').val('');
                $('#Exercise-answer').val('');
                $('#Exercise-pseducode').val('');
            }
            $scope.deleteExercise = function (exerciseId) {
                var answer = confirm("Are you sure delete this exercise ?")
                if (answer) {
                    deleteExercise.deleteExercise(exerciseId)
                        .then(
                        function (response) { },
                        function (response) { }
                        );
                }
            }
            $scope.cancel = function () {
                var answer = confirm("Are you sure cancel this process ?")
                if (answer) {
                    $scope.idExercise = null;
                    $('#Exercise-name').val('');
                    $('#Exercise-content').val('');
                    $('#Exercise-answer').val('');
                    $('#Exercise-pseducode').val('');
                    // $window.location.reload();
                }
            }
        }]
    )
    /*.factory('createExercise',
        ['$http',
        function($http){
            $http.createNewExercise = function(exerciseName, exerciseContent, exerciseCode) {
                var exerciseInfo = {
                    exercisename : exerciseName,
                    exercisecontent : exerciseContent,
                    exercisecode : exerciseCode
                };
                return $http.post('/api/admin/create',exerciseInfo);
            }
            return $http;
        }]
    )*/
    .factory('createUpdateExercise',
    ['$http',
        function ($http) {
            $http.createOrUpdateExercise = function (exerciseId, exerciseName, exerciseContent, exerciseAnswer, exercisePseudocode) {
                var exerciseInfo = {
                    exerciseid: exerciseId,
                    exercisename: exerciseName,
                    exercisecontent: exerciseContent,
                    exerciseanswer: exerciseAnswer,
                    exercisepseudocode: exercisePseudocode
                };
                return $http.post('/api/admin/createupdate', exerciseInfo);
            }
            return $http;
        }]
    )
    .factory('deleteExercise',
    ['$http',
        function ($http) {
            $http.deleteExercise = function (exerciseId) {
                return $http.get('/api/admin/create', exerciseId);
            }
            return $http;
        }]
    )
    /*.factory('getAllExercises',
        ['$http',
        function($http){
            $http.getAllExercises = function() {
                return $http.get('/api/admin/getallexercises');
            }
            return $http;
        }]
    )*/
    .factory('getAllExercises',
    ['$http',
        function ($http) {
            $http.getAllExercises = function () {
                return $http.get('/api/exercise/getallexercises?username=thanhphat');
            }
            return $http;
        }]
    )
    ;