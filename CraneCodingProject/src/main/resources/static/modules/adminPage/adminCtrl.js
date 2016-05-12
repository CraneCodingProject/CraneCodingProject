'use strict';

angular.module('AdminPage')
    //demo VSC
    .controller('AdminPageController',
    ['$scope', '$rootScope', '$location', '$timeout', '$window', 'createUpdateExercise', 'getAllExercises', 'deleteExercise',
        function ($scope, $rootScope, $location, $timeout, $window, createUpdateExercise, getAllExercises, deleteExercise) {
            $scope.loginSuccess = false;
            $scope.checkAdmin = false;
            initialCondition();
            //$scope.idExercise = null;
            function initialCondition() {
                $scope.idExercise = null;
                $scope.exerciseName = null;
                $scope.exerciseContent = null;
                $scope.exerciseAnswer = null;
                $scope.exercisePseducode = null;
            }
            $scope.adminLogin = function (acc, pass) {
                if (acc = "admin" && pass == "admin") {
                    $scope.loginSuccess = true;
                    initialCondition();
                }
                else {
                    $scope.checkAdmin = true;
                }
                /*
                // $http.post('/api/admin/authentication', { username: acc, password: pass })
                //     .success(function (response) {
                //         $scope.loginSuccess = true;
                // })
                // .error(function(response){
                // 	console.log('fali');
                //     $scope.checkAdmin = true;
                //     $scope.loginSuccess = false;
                // });
                */
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
                $scope.exerciseName = exerciseName || '';
                $scope.exerciseContent = exerciseContent || '';
                $scope.exerciseAnswer = exerciseAnswer || '';
                $scope.exercisePseducode = exercisePseudocode || '';
                $scope.exerciseForm.$setPristine();
            }
            $scope.createOrUpdateExercise = function () {
                createUpdateExercise.createOrUpdateExercise($scope.idExercise, $scope.exerciseName, $scope.exerciseContent, $scope.exerciseAnswer, $scope.exercisePseducode)
                    .then(
                    function (response) {
                        //success --> reload lst
                        if (response.data) {
                            getAllExercises.getAllExercises().then(
                                function (response) {
                                    $scope.lstExercises = response.data;

                                },
                                function (response) {
                                    console.log('fail');
                                });
                            initialCondition();
                        }
                        else {
                            console.log("OOP..! Response: " + response.data);
                        }
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
            // $scope.createExercise = function(){

            // }
            $scope.addNewExercise = function () {
                $scope.idExercise = null;
                //$scope.exerciseForm.$dirty = false;
                $scope.exerciseName = null;
                $scope.exerciseContent = null;
                $scope.exerciseAnswer = null;
                $scope.exercisePseducode = null;
            }
            $scope.deleteExercise = function (exerciseId) {
                var answer = confirm("Are you sure delete this exercise ?")
                if (answer) {
                    deleteExercise.deleteExercise(exerciseId)
                        .then(
                        function (response) {
                            if (response.data) {
                                getAllExercises.getAllExercises().then(
                                    function (response) {
                                        $scope.lstExercises = response.data;
                                    },
                                    function (response) {
                                        console.log('fail');
                                    });
                                initialCondition();
                            }
                            else {
                                console.log("OOP..! Response: " + response.data);
                            }
                        },
                        function (response) {
                            console.log("OOP..! Response: " + response.data);
                        }
                        );
                }
            }
            $scope.cancel = function () {
                var answer = confirm("Are you sure cancel this process ?")
                if (answer) {
                    $scope.exerciseForm.$invalid = true;
                    initialCondition();
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
                    idExercise: exerciseId,
                    exerciseName: exerciseName,
                    exerciseContent: exerciseContent,
                    exerciseAnswer: exerciseAnswer,
                    pseudoCode: exercisePseudocode
                };
                console.log(exerciseInfo);
                return $http.post('/api/admin/createOrUpdate', exerciseInfo);
            }
            return $http;
        }]
    )
    .factory('deleteExercise',
    ['$http',
        function ($http) {
            $http.deleteExercise = function (exerciseId) {
                console.log(typeof exerciseId);
                var parameter = { exerciseid: exerciseId };
                var config = { params: parameter };
                return $http.get('/api/admin/delete', config);
            }
            return $http;
        }]
    )
    .factory('getAllExercises',
    ['$http',
        function ($http) {
            $http.getAllExercises = function () {
                return $http.get('/api/admin/getAllExercise');
            }
            return $http;
        }]
    )
    // .factory('getAllExercises',
    // ['$http',
    //     function ($http) {
    //         $http.getAllExercises = function () {
    //             return $http.get('/api/exercise/getallexercises?username=thanhphat');
    //         }
    //         return $http;
    //     }]
    // )
    ;