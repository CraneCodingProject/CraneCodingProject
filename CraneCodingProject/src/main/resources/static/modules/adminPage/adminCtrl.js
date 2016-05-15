'use strict';

angular.module('AdminPage')
    // demo VSC
    .controller('AdminPageController',
    ['$scope', '$rootScope', '$location', '$timeout', '$window', 'createUpdateExercise', 'getAllExercises', 'deleteExercise','getAllTestCaseApi',
        function ($scope, $rootScope, $location, $timeout, $window, createUpdateExercise, getAllExercises, deleteExercise, getAllTestCaseApi) {
            $scope.loginSuccess = false;
            $scope.checkAdmin = false;
            initialCondition();
            var tesCases = [];
            // $scope.idExercise = null;
            function initialCondition() {
                $scope.idExercise =null;
                $scope.exerciseName = null;
                $scope.exerciseContent = null;
                $scope.exerciseAnswer = null;
                $scope.exercisePseducode = null;
                $scope.testCases =[];
                tesCases = [];
                $scope.inp1 = null;
                $scope.inp2 = null;
                $scope.inp3 = null;
                $scope.inp4 = null;
                $scope.inp5 = null;
                $scope.inp6 = null;
                $scope.inp7 = null;
                $scope.inp8 = null;
                $scope.inp9 = null;
                $scope.inp10 = null;
                $scope.out1 = null;
                $scope.out2 = null;
                $scope.out3 = null;
                $scope.out4 = null;
                $scope.out5 = null;
                $scope.out6 = null;
                $scope.out7 = null;
                $scope.out8 = null;
                $scope.out9 = null;
                $scope.out10 = null;
            }
            function setCase(input,output){
                var oneCase = { input , output };
                return oneCase;
            }
            function setTestCase(){
            	tesCases = [];
                tesCases.push(setCase($scope.inp1,$scope.out1));
                tesCases.push(setCase($scope.inp2,$scope.out2));
                tesCases.push(setCase($scope.inp3,$scope.out3));
                tesCases.push(setCase($scope.inp4,$scope.out4));
                tesCases.push(setCase($scope.inp5,$scope.out5));
                tesCases.push(setCase($scope.inp6,$scope.out6));
                tesCases.push(setCase($scope.inp7,$scope.out7));
                tesCases.push(setCase($scope.inp8,$scope.out8));
                tesCases.push(setCase($scope.inp9,$scope.out9));
                tesCases.push(setCase($scope.inp10,$scope.out10));
                return tesCases;
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
				 * // $http.post('/api/admin/authentication', { username: acc,
				 * password: pass }) // .success(function (response) { //
				 * $scope.loginSuccess = true; // }) //
				 * .error(function(response){ // console.log('fali'); //
				 * $scope.checkAdmin = true; // $scope.loginSuccess = false; //
				 * });
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
                console.log(idExercise);
                
                getAllTestCaseApi.getAllTestCase(idExercise)
                .then(
                	function(response){
                		console.log("phat"+response.data[0].input);
                		console.log("phat"+response.data[0].output);
                		console.log("phat"+response.data[0].exerciseId);
                        
                	},
                	function(response){
                		console.log('fail');
                	}
                );
            }
            $scope.createOrUpdateExercise = function () {
                $scope.testCases = setTestCase();
                console.log(setTestCase());
                console.log($scope.testCases);
                createUpdateExercise.createOrUpdateExercise($scope.idExercise, $scope.exerciseName, $scope.exerciseContent, $scope.exerciseAnswer, $scope.exercisePseducode,$scope.testCases)
                    .then(
                    function (response) {
                        // success --> reload lst
                        if (response.data) {
                            getAllExercises.getAllExercises().then(
                                function (response) {
                                    $scope.lstExercises = response.data;

                                },
                                function (response) {
                                    console.log('fail');
                                });
                                alert("Success...!");
                            initialCondition();
                        }
                        else {
                            alert("OOP..! Some things happent: Error~response : Create or update " + response.data);
                        }
                    },
                    function (response) {
                        console.log($scope.idExercise);
                        console.log($scope.exerciseName);
                        console.log($scope.exerciseContent);
                        console.log($scope.exerciseAnswer);
                        console.log($scope.exercisePseducode);
                        alert("OOP..! Some things happent: Error~response 404");
                    }
                    );
            }
            $scope.addNewExercise = function () {
                $scope.idExercise = null;
                // $scope.exerciseForm.$dirty = false;
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
                                    alert("Success...!");
                                initialCondition();
                            }
                            else {
                                alert("OOP..! Some things happent: Error~response : Create or update " + response.data);
                            }
                        },
                        function (response) {
                           alert("OOP..! Some things happent: Error~response 404");
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
    /*
	 * .factory('createExercise', ['$http', function($http){
	 * $http.createNewExercise = function(exerciseName, exerciseContent,
	 * exerciseCode) { var exerciseInfo = { exercisename : exerciseName,
	 * exercisecontent : exerciseContent, exercisecode : exerciseCode }; return
	 * $http.post('/api/admin/create',exerciseInfo); } return $http; }] )
	 */
    .factory('createUpdateExercise',
    ['$http',
        function ($http) {
            $http.createOrUpdateExercise = function (exerciseId, exerciseName, exerciseContent, exerciseAnswer, exercisePseudocode,exerciseTestCases) {
                var exerciseInfo = {
                    idExercise: exerciseId,
                    exerciseName: exerciseName,
                    exerciseContent: exerciseContent,
                    exerciseAnswer: exerciseAnswer,
                    pseudoCode: exercisePseudocode,
                    exerciseTestCases : exerciseTestCases
// input1:$scope.inp1,
// output1:$scope.out1
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
    .factory('getAllTestCaseApi',
    ['$http',
        function ($http){
    	$http.getAllTestCase = function(exerciseId){
            console.log("fac"+exerciseId);
    		var parameter = { exerciseid: exerciseId };
            var config = { params: parameter };
            return $http.get('/api/exercise/gettestcases', config);
    	}
    	return $http;
    	}
    ])
;