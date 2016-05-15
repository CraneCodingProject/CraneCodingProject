'use strict';
angular.module('MainPage')
    .controller('MainPageController',
    ['$rootScope', '$scope', '$routeParams', '$route', '$window', '$location', '$interval', '$cookieStore', '$http', 'lstExercisesApi', 'testCodeApi', 'getTestCaseApi', 'lstCommandsApi', 'submitRecordApi', 'userHistoryApi', 'exerciseApi', 'transferData',
        function ($rootScope, $scope, $routeParams, $route, $window, $location, $interval, $cookieStore, $http, lstExercisesApi, testCodeApi, getTestCaseApi, lstCommandsApi, submitRecordApi, userHistoryApi, exerciseApi, transferData) {
            /**
                to set ditry : $scope.demoForm.$setDirty();
                to set Pristine :$scope.demoForm.$setPristine();
                to check dirty : $scope.demoForm.$dirty return true/false
                to check Pristine : $scope.demoForm.$Pristine return true/false
            */
            var trung_gian = 0;
            var trung_gian_tam = 0;
            $scope.chosenExerciseNumber = -1; // so quan trong--> xac dinh nguoi choi dang choi o bai may : session
           
            /**
            *   setup time run
            */
            var homePagecontroller = this;
            homePagecontroller.clock = { time: "", interval: 1000 };
            homePagecontroller.timer = { time: (new Date()).setHours(0, 0, 0, 0), startTime: "", interval: 10 };
            homePagecontroller.timerProcess;
            /*----------------------------------------------------------*/
            $scope.gotoHomePage = function () {
                $location.path('/home');
            }
            /*----------------------------------------------------------*/

            /**
            *   Open validate directive --> 'Yes/No' Modal 
            */
            $scope.openValidateDirective = function (userId, index) {
                $scope.exerciseIdDirect = userId;
                trung_gian = index;
                angular.element(document.querySelector('#divID'));
                //$('#validateChangeExerciseModel').modal('show');
            }
            /*----------------------------------------------------------*/

            /**
            *   Start do exercise and start run time
            *   Reset time
            *   Set form dirty
            */
            $scope.startRunTime = function () {
                // Register the interval and hold on to the interval promise
                homePagecontroller.timerProcess = RegisterInterval(TimerTick, homePagecontroller.timer.interval);
                // Reset the time to 0
                homePagecontroller.timerReset();
                // set form dirty
                $scope.demoForm.$setDirty();
                $('#startModal').modal('hide');
            }
            /*----------------------------------------------------------*/

            /**
            *   RegisterInterval
            *   Time functions : Start , Reset, Stop.
            */
            homePagecontroller.timerStart = function () {
                // Register the interval and hold on to the interval promise
                homePagecontroller.timerProcess = RegisterInterval(TimerTick, homePagecontroller.timer.interval);
                // Reset the time to 0
                homePagecontroller.timerReset();
            }
            homePagecontroller.timerReset = function () {
                homePagecontroller.timer.startTime = Date.now();
                homePagecontroller.timer.time = (new Date()).setHours(0, 0, 0, 0);
            }
            homePagecontroller.timerStop = function () {
                // If there is an interval process then stop it
                if (homePagecontroller.timerProcess) {
                    $interval.cancel(homePagecontroller.timerProcess);
                }
            }
            function ClockTick() {
                homePagecontroller.clock.time = Date.now();
            }
            function TimerTick() {
                // Increment the time by the time difference now and the timer start time
                homePagecontroller.timer.time += Date.now() - homePagecontroller.timer.startTime;
                // Reset the start time
                homePagecontroller.timer.startTime = Date.now();
            }
            function RegisterInterval(regFunction, regInterval) {
                return $interval(regFunction, regInterval);
            }
            RegisterInterval(ClockTick, homePagecontroller.clock.interval);
            /*----------------------------------------------------------*/
            
            /**
            *   Test code 
            *   GetCode(parameter) --> run code and get user's code result ---> request to server (exerciseId,parameter)
            *   --> get expect result --> display result to compare
            */
            $scope.testCodeBeforeSubmit = function (inputParameterToTest, exerciseId) {
                // print adtually result
                $scope.actuallyResult = getCODE(inputParameterToTest);
                // transfer data <inputParameterToTest> to server to get expect result then print expert result 
                // get expect result form server and set $scope.expectResult = expect result;
                testCodeApi.getExpectResult(inputParameterToTest, exerciseId)
                    .then(function (response) {

                        $scope.expectResult = response.data;
                    }, function (response) {
                        $scope.expectResult = 'NaN';
                    }
                    );
            }
            /*----------------------------------------------------------*/

            /**
            *   Get code to SUBMIT and TEST
            */
            function getCODE(inputParameterToTest) {
                //inputParameterToTest = jsonResult.inp;
                $('#result').removeAttr('src');
                var CODE = "<script>function MATH (input) { try{ ";
                demRunFor = 0;
                $('#dropArea .topdown').map(function () {
                    switch ($(this).attr('name')) {
                        case 'for': CODE = CODE + forExecute($(this)); break;
                        case 'while': CODE = CODE + whileExecute($(this)); break;
                        case 'gan': CODE = CODE + ganExecute($(this)); break;
                        case 'var': CODE = CODE + varExecute($(this)); break;
                        case 'if': CODE = CODE + ifExecute($(this)); break;
                        case 'else': CODE = CODE + elseExecute($(this)); break;
                        case 'switchcase': CODE = CODE + switchcaseExecute($(this)); break;
                        case 'return': CODE = CODE + returnExecute($(this)); break;
                        case 'int': CODE = CODE + dataTypeNumberExecute($(this)); break;
                        case 'double': CODE = CODE + dataTypeNumberExecute($(this)); break;
                        case 'string': CODE = CODE + stringExecute($(this)); break;
                        case 'array': CODE = CODE + arrayExecute($(this)); break;
                    }
                });
                $('li').map(function () {
                    $(this).data('pass', false);
                });
                $('input').map(function () {
                    $(this).data('pass', false);
                });//"S=" + inputParameterToTest + ";
                //CODE = CODE + "S=" + inputParameterToTest + ";return S; }catch(err){return null;} } document.write(MATH(" + inputParameterToTest + "));</script>";
                CODE = CODE + "}catch(err){return null;} } document.write(MATH(" + inputParameterToTest + "));</script>";
                // console.log('CODE:' + CODE);
                var ifr = document.getElementById("result");
                var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
                ifrw.document.open();
                ifrw.document.write(CODE);
                var getVal = $("#result").contents().find("body").html();
                ifrw.close();
                return getVal;
            }
            /*----------------------------------------------------------*/

            /**
            *   Submit CODE
            *   get time  : homePagecontroller.timer.time
            *   getcode (parameter) --> get testCase from server --> compare 2 result 
            *   if true --> 'V' else --> 'X'
            *   get timePerformance
            *   request to server record of user
            *   set form from dirty to pristine
            */
            $scope.submitCODE = function (Exerciseid) {
                try {
                    if (homePagecontroller.timerProcess) {
                        //exerciseID :transferData.NameExercise_dataTransfer. '..ID';
                        //time : homePagecontroller.timer.time
                        $scope.time = homePagecontroller.timer.time;
                        $interval.cancel(homePagecontroller.timerProcess);
                        getTestCaseApi.getTestCaseSubmit(Exerciseid)
                            .then(
                            //success
                            function (response) {
                                var dataNumberToNumber = response.data;
                                $('#testCaseSubmit').empty();
                                $('#submitModal .modal-footer').find('#userRecord').remove();
                                console.log('jsonResult '+ dataNumberToNumber[0].input);
                                console.log('jsonResult '+ dataNumberToNumber[0].output);
                                var test = true;
                                var sumTestCases = 0;
                                var falseTestCase = 0;
                                var timePerformance = 0;
                                
                                
                                
                                
                                
                                $.each(dataNumberToNumber, function (index, jsonResult) {
                                    sumTestCases++;
                                    console.log('jsonResult '+jsonResult.input);
                                    var getCodeJsToTest = getCODE(jsonResult.input);
                                    var start = new Date().getMilliseconds();
                                    var getCodeJsToTest = getCODE(jsonResult.input);

                                    timePerformance = timePerformance + (new Date().getMilliseconds() - start);

                                    var statusCase = "<i style='color:#2BC430;font-size: xx-large;' class='fa fa-check'></i>";

                                    if (getCodeJsToTest != jsonResult.output) {
                                        test = false;
                                        falseTestCase++;
                                        statusCase = "<i style='color:#C42B2B;font-size: xx-large;' class='fa fa-times'></i>";
                                    }

                                    setTimeout(function () {
                                        $('#testCaseSubmit').append('<tr><td>' + jsonResult.input + '</td><td>' + getCodeJsToTest + '</td><td>' + jsonResult.output + '</td><td>' + statusCase + '</td></tr>');//<td>' + timePerformance + '</td>
                                    }, 200 * sumTestCases);

                                });
                                setTimeout(function () {
                                    $('#submitModal .modal-footer').append('<h3 id="userRecord"><i class="fa fa-cog fa-spin" style="padding: 4px;"></i>' + (sumTestCases - falseTestCase) + '/' + sumTestCases + ' with <i class="fa fa-clock-o fa-spin" style="padding: 4px;"></i>' + new Number(0.1 * (timePerformance / sumTestCases)).toPrecision(4) + ' seconds.</h3>');
                                }, 200 * (sumTestCases + 1));
                                // submit to server : 
                                submitRecordApi.submitRecord(Exerciseid, $rootScope.globals.currentUser.username, (sumTestCases - falseTestCase), $scope.time)
                                    .then(
                                    function (response) {
                                        $scope.submitResult = response.data;
                                        if (response.data.result == true) {
                                            $('#btnPassExerciseSubmitModal').html('Do next');
                                        }
                                        else {
                                            $('#btnPassExerciseSubmitModal').html('Retry');
                                        }
                                    }
                                    )
                            },
                            //error
                            function (response) {
                                alert("OOP...! Some errors happent...!");
                            }
                            );
                    }
                    else {
                        alert("OOP...! Some errors happent...!");              
                    }
                }
                catch (exception) {
                    alert("OOP...! Some errors happent...!");
                }
            }
            /*----------------------------------------------------------*/
            
            /**
            *   User's record history
            *   username --> server --> get  exerciseName, stars, time of username
            */
            $scope.showUserHistory = function (username) {
                console.log(username);
                userHistoryApi.getUserHistory(username)
                    .then(function (response) {
                        $scope.userRecordsHistory = response.data.record;
                    });
            }
            /*----------------------------------------------------------*/

            /**
            *   After submit
            *   if user pass the exercise 
            *   	--> modal 'next exercise' 
            *   	--> request next exercise and reload list exercise
            *		--> at back-end : insert new exercise to user's lstExercise
            *   else 
            *   	--> modal 'Retry' --> do again. not request.
            */
            $scope.doNextorReTryExercise = function () {
                $scope.demoForm.$setPristine();
                if ($scope.submitResult.result) {
                    //load list allexercise...

                    //directive to next exercise
                    $location.url("/exercise/" + $scope.submitResult.exerciseId + "/" + (++trung_gian));
                }
                else {
                    $route.reload();
                }
            }
            /*----------------------------------------------------------*/
            
            /**
            *   Open Rule and guider modal.   
            */
            $scope.openGuideRuleModal = function () {
                lstCommandsApi.getLstCommands()
                    .then(function (response) {
                        homePagecontroller.lstCommands = response.data;
                    });
            }
            /*----------------------------------------------------------*/
            
            /**
            *   get cookie (user Account).  
            */
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $scope.userName = $rootScope.globals.currentUser.username;
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            }
            $scope.$on('$routeChangeStart', function (event, next, current) {
                $('body').find('.modal-backdrop').each(function () {
                    $(this).remove();
                })
            });
            /*----------------------------------------------------------*/
            
            /**
            *   Route Change
            *   When route changed...do some stuff
            *   Get route's path : $location.path()
            */
            $scope.$on('$routeChangeSuccess', function (event, next, current) {
                $('body').find('.modal-backdrop').each(function () {
                    $(this).remove();
                })
                if ($location.path() == '/admin/developer/cranecodingteam') {
                    $location.path('/admin/developer/cranecodingteam');
                }
                else {
                    if (!$rootScope.globals.currentUser) {
                        $location.path('/home');
                    }
                    else {
                        lstExercisesApi.getAllexerciseByUserName($rootScope.globals.currentUser.username)
                            .success(
                            function (data) {
                                $scope.lstExercises = data;
                            }
                            );
                        $('#dropArea').empty();
                        if ($location.path() == '/') {
                            homePagecontroller.transferData = '';
                            homePagecontroller.timerReset();
                            $interval.cancel(homePagecontroller.timerProcess);
                        }
                        else {
                            var res = $location.path().split("/");
                            exerciseApi.getAExerciseById(res[2])
                                .then(
                                function (response) {
                                    if (response.data == 'null') {
                                        $location.path('/');
                                    }
                                    else {
                                        $('#startModal').modal('show');
                                        $scope.chosenExerciseNumber = res[3];
                                        trung_gian = res[3];
                                        $('.chosenExercise').find('i').remove();
                                        /*-------- 
                                            set timOut boi vi append chay truoc  "$scope.chosenExerciseNumber = trung_gian;"
                                            Luong chay :
                                            append --> $scope.chosenExerciseNumber ----> setTimeOut cho append
                                        --------*/
                                        setTimeout(function () { $('.chosenExercise').append('<i style="float:right" class="fa fa-arrow-right"></i>') }, 50);
                                        // console.log('response data success data1 : ' + response.data.exerciseId);
                                        homePagecontroller.exerciseData = response.data;
                                        //homePagecontroller.transferData = transferData;
                                    }
                                }
                                );

                            //$('.chosenExercise').append('<i style="float:right" class="fa fa-arrow-right"></i>');
                            //homePagecontroller.transferData = transferData;
                            //show start after change route
                            //$("#validateChangeExerciseModel").modal('hide');
                            // $('#startModal').show();
                        }
                        //newer: set dirty form = false
                        setTimeout(function () { $scope.demoForm.$setPristine(); }, 0);
                    }
                }
            });
            /*----------------------------------------------------------*/
            
            /**
            *    Click 'Yes' event to start do exercise --> open 'Start' modal
            *    If user click 'Yes'    -->  Stop time if time is running
            *                           -->  go to exercise/exerciseId
            */
            $scope.directToAnotherExercise = function (dataExerciseIdDirect) {
                $scope.demoForm.$setPristine();
                /* Stop time */
                if (homePagecontroller.timerProcess) {
                    $interval.cancel(homePagecontroller.timerProcess);
                }
                $location.url("/exercise/" + dataExerciseIdDirect + "/" + trung_gian);
            }
        }])
            /*----------------------------------------------------------*/
    .factory('lstExercisesApi', ['$http',
        function ($http) {
            $http.getAllexerciseByUserName = function (userName) {
                return $http({
                    url: '/api/exercise/getallexercises?username=' + userName
                })
            }
            return $http;
        }
    ])
    .factory('exerciseApi', ['$http',
        function ($http) {
            //var _exerciseApi = {};
            $http.getAExerciseById = function (id) {
                return $http({
                    url: '/api/exercise/getexercisesById?exerciseId=' + id
                });
            }
            return $http;
        }
    ])
    .factory('testCodeApi', ['$http',
        function ($http) {
            $http.getExpectResult = function (inputParameter, exerciseId) {
                var parameter = { param: inputParameter, exerciseid: exerciseId };
                var config = { params: parameter };
                return $http.get('/api/exercise/testcode', config);
            }
            return $http;
        }
    ])
    .factory('getTestCaseApi', ['$http',
        function ($http) {
            $http.getTestCaseSubmit = function (exerciseId) {
                var parameter = { exerciseid: exerciseId };
                var config = { params: parameter };
                return $http.get('/api/exercise/gettestcases', config)
            }
            return $http;
        }
    ])
    .factory('lstCommandsApi', ['$http',
        function ($http) {
            $http.getLstCommands = function () {
                return $http.get('/modules/mainPage/text.js')//api/command/getallcommands //api/exercise/getallexercises
            }
            return $http;
        }
    ])
    .factory('submitRecordApi', ['$http',
        function ($http) {
            $http.submitRecord = function (exerciseId, userName, passCase, time) {
                var parameter = {
                    exerciseid: exerciseId,
                    username: userName,
                    star: passCase,
                    time: time
                }
                var config = { params: parameter };
                return $http.get('/api/exercise/submit', config)
            }
            return $http;
        }
    ])
    .factory('userHistoryApi', ['$http',
        function ($http) {
            $http.getUserHistory = function (username) {
                var parameter = { username: username };
                var config = { params: parameter };
                return $http.get('api/exercise/record', config);
            }
            return $http;
        }
    ])
    /*   .directive('exerciseInfo', function () {
           return {
               restrict: 'E',
               scope: {
                   info: '='
               },
               templateUrl: 'directives/exerciseInfo.html',
               link:
               function (info, element, attrs) {
               }
           }
       })*/


    .factory('exerciseHintImgApi', ['$http',
        function ($http) {
            $http.getExerciseHintImg = function (exerciseId) {
                var parameter = { exerciseid: exerciseId };
                var config = { params: parameter };
                return $http.get('/api/exercise/hint', config);
            }
            return $http;
        }
    ])
    .directive('exerciseInfo', ['exerciseHintImgApi', function (exerciseHintImgApi) {
        return {
            restrict: 'AECM',
            scope: {
                info: '='
            },
            templateUrl: 'directives/exerciseInfo.html',
            link:
            function (info, element, attrs) {
                info.getHint = function (params) {
                    exerciseHintImgApi.getExerciseHintImg(params)
                        .then(
                        function (response) {
                            info.hintCodeImg = response.data.result;
                        },
                        function (response) {
                            alert("Can't connect to server. Check your connection.");
                        }
                        );
                }

            }
        }
    }])
    .directive('rulesModal', function () {
        return {
            restrict: 'E',
            scope: {
                info: '=',
                isolatedAttributeLstCommands: '@attributeLstCommands'
            },
            templateUrl: 'directives/ruleModal.html',
            link:
            function (scope, element, attrs) {
                scope.commandName = 'Command';
                scope.rule = "Rules";
                scope.openDetailCommand = function (commandName, commandContent) {
                    //scope.chosenExerciseNumber = trung_gian;
                    //$('.chosenExercise').find('i').remove();
                    scope.commandName = commandName;
                    $('#commandContentId').html(commandContent);
                }
            }
        }
    })
    .service('transferData', function () {
        var transferData = this;
        transferData.NameExercise_dataTransfer = 'Default';
        //transferData.Code_dataTransfer = 'Default';
    })
;