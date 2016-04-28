/// <reference path="../../text.js" />
'use strict';

angular.module('MainPage')

.controller('MainPageController',
    ['$rootScope', '$scope', '$routeParams', '$route', '$window', '$location', '$interval', '$cookieStore', '$http', 'lstExercisesApi', 'testCodeApi', 'getTestCaseApi', 'lstCommandsApi', 'submitRecordApi', 'userHistoryApi', 'exerciseApi', 'transferData',
    function ($rootScope, $scope, $routeParams, $route, $window, $location, $interval, $cookieStore, $http, lstExercisesApi, testCodeApi, getTestCaseApi, lstCommandsApi, submitRecordApi, userHistoryApi, exerciseApi, transferData) {
        console.log('chay lai controller');
        // set username
        

        /*lstExercisesApi.getAllexerciseByUserName($rootScope.globals.currentUser.username)
        .success(
            function (data) {
                $scope.lstExercises = data;
            }
        );*/
        /**
        *   Get userName then get getAllexerciseByUserName(userName)
        
        lstExercisesApi.getAllexerciseByUserName(userName)
        .success(
            function (data) {
                $scope.lstExercises = data;
            }
        );
        
        */
        /**
        *   Load list user's exercise 
        */
       // lstExercisesApi.success(function (data) { $scope.lstExercises = data });

        var trung_gian = 0;
        var trung_gian_tam = 0;
        $scope.chosenExerciseNumber = -1; // so quan trong--> xac dinh nguoi choi dang choi o bai may : session

        /**
            to set ditry : $scope.demoForm.$setDirty();
            to set Pristine :$scope.demoForm.$setPristine();
            to check dirty : $scope.demoForm.$dirty return true/false
            to check Pristine : $scope.demoForm.$Pristine return true/false
        */

        /**
        *   setup time run
        */
        var homePagecontroller = this;
        homePagecontroller.clock = { time: "", interval: 1000 };
        homePagecontroller.timer = { time: (new Date()).setHours(0, 0, 0, 0), startTime: "", interval: 10 };
        homePagecontroller.timerProcess;
        /*----------------------------------------------------------*/


        $scope.gotoHomePage = function () {
            //$window.location.href = 'Homepage.html';
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
            console.log('check dirtyL:' + $scope.demoForm.$dirty);
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
        $scope.testCodeBeforeSubmit = function (inputParameterToTest,exerciseId) {
            // print adtually result
            $scope.actuallyResult = getCODE(inputParameterToTest);
            // transfer data <inputParameterToTest> to server to get expect result then print expert result 
            // get expect result form server and set $scope.expectResult = expect result;
            testCodeApi.getExpectResult(inputParameterToTest,exerciseId)
                .then(function (response) {
                	
                    $scope.expectResult = response.data;
                },function(response){
                	$scope.expectResult = 'NaN';
                }
                );
        }
        /*----------------------------------------------------------*/

        /**
        *   Get code
        */
        function getCODE(inputParameterToTest) {
            //inputParameterToTest = abc.inp;
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
            console.log('CODE:' + CODE);
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
                    console.log('____________________________Exerciseid: ' + Exerciseid);
                    getTestCaseApi.getTestCaseSubmit(Exerciseid)
                        .then(
                            //success
                            function (response) {
                                var dataNumberToNumber = response.data;
                                //dataNumberToNumber = "[{"inp":"1", "outp":"1"},{"inp":"4", "outp":"2"},{"inp":"3", "outp":"3"}]";
                                //var a="[{'inp":"1", "outp":"1"},{"inp":"4", "outp":"2"},{"inp":"3", "outp":"3"}]";
                                $('#testCaseSubmit').empty();
                                $('#submitModal .modal-footer').find('#userRecord').remove();

                                var test = true;
                                var sumTestCases = 0;
                                var falseTestCase = 0;
                                var timePerformance = 0;
                                $.each(dataNumberToNumber, function (index, abc) {
                                    sumTestCases++;
                                    var getCodeJsToTest = getCODE(abc.inp);
                                    var start = new Date().getMilliseconds();
                                    var getCodeJsToTest = getCODE(abc.inp);

                                    timePerformance = timePerformance + (new Date().getMilliseconds() - start);

                                    var statusCase = "<i style='color:#2BC430;font-size: xx-large;' class='fa fa-check'></i>";

                                    if (getCodeJsToTest != abc.outp) {
                                        test = false;
                                        falseTestCase++;
                                        statusCase = "<i style='color:#C42B2B;font-size: xx-large;' class='fa fa-times'></i>";
                                    }

                                    setTimeout(function () {
                                        $('#testCaseSubmit').append('<tr><td>' + abc.inp + '</td><td>' + getCodeJsToTest + '</td><td>' + abc.outp + '</td><td>' + statusCase + '</td></tr>');//<td>' + timePerformance + '</td>
                                    }, 200 * sumTestCases);

                                });
                                setTimeout(function () {
                                    // $('#submitModal .modal-footer').append('<h3 style="float: left;"> Time :{{' + time + '|date:\'mm:ss:sss\'}}" <i class="fa fa-cog fa-spin" style="padding: 4px;"></i>' + (sumTestCases - falseTestCase) + '/' + sumTestCases + ' with <i class="fa fa-clock-o fa-spin" style="padding: 4px;"></i>' + new Number(0.1 * (timePerformance / sumTestCases)).toPrecision(4) + ' seconds.</h3>');
                                    $('#submitModal .modal-footer').append('<h3 id="userRecord"><i class="fa fa-cog fa-spin" style="padding: 4px;"></i>' + (sumTestCases - falseTestCase) + '/' + sumTestCases + ' with <i class="fa fa-clock-o fa-spin" style="padding: 4px;"></i>' + new Number(0.1 * (timePerformance / sumTestCases)).toPrecision(4) + ' seconds.</h3>');
                                }, 200 * (sumTestCases + 1));

                                // submit to server
                                submitRecordApi.submitRecord(Exerciseid, 1, (sumTestCases - falseTestCase), 1, $scope.time)
                                .then(
                                    function (response) {
                                        console.log('phat_submitRecordApi: '+response.data.isPass);
                                        $scope.submitResult = response.data;
                                        if (response.data.isPass == true) {
                                            $('#btnPassExerciseSubmitModal').html('Do next.');

                                        }
                                        else {
                                            $('#btnPassExerciseSubmitModal').html('Retry.');
                                        }
                                    }
                                )
                            },
                            //error
                            function (response) {
                            }
                        );
                }
                else {

                }
            }
            catch (exception) {
            }

        }
        /*----------------------------------------------------------*/

        /**
        *   User's record history
        *   username --> server --> get  exerciseName, stars, time of username
        */
        $scope.showUserHistory = function (username) {
            userHistoryApi.getUserHistory(username)
            .then(function (response) {
                $scope.userRecordsHistory = response.data;
            });
        }
        /*----------------------------------------------------------*/

        /**
        *   After submit
        *   if user pass the exercise --> modal 'next exercise' --> request next exercise
        *   else --> modal 'Retry' --> do again. not request.
        */
        $scope.doNextorReTryExercise = function () {
            $scope.demoForm.$setPristine();
            if ($scope.submitResult.isPass) {
                console.log("pass: " + $scope.submitResult.isPass + ' ' + $scope.submitResult.exerciseId);
                //load list allexercise...

                //directive to next exercise
                $location.url("/exercise/" + $scope.submitResult.exerciseId + "/" + (++trung_gian));
            }
            else {
                $route.reload();
                console.log($scope.submitResult.isPass + ' ' + $scope.submitResult.exerciseId);
            }
        }
        /*----------------------------------------------------------*/

        /**
        *   Route Change
        *   When route changed...do some stuff
        *   Get route's path : $location.path()
        */
       // $scope.$on('$routeChangeSuccess', function () {
            //$('#dropArea').empty();
            //if ($location.path() == '/') {
            //    homePagecontroller.transferData = '';
            //    homePagecontroller.timerReset();
            //    $interval.cancel(homePagecontroller.timerProcess);
            //    //out code : set dirty form = false 
            //    //$timeout(function () {
            //    //    $scope.demoForm.testFormRequire.$dirty = true;
            //    //}, 0);
            //}
            //else {
            //    console.log($location.path());
            //    var res = $location.path().split("/");
            //    $scope.chosenExerciseNumber = res[3];
            //    trung_gian = res[3];
            //    $('.chosenExercise').find('i').remove();
            //    /*-------- 
            //        set timOut boi vi append chay truoc  "$scope.chosenExerciseNumber = trung_gian;"
            //        Luong chay :
            //        append --> $scope.chosenExerciseNumber ----> setTimeOut cho append
            //    --------*/
            //    setTimeout(function () { $('.chosenExercise').append('<i style="float:right" class="fa fa-arrow-right"></i>') }, 100);


            //    homePagecontroller.transferData = transferData;
            //    //show start after change route
            //    $('#startModal').modal('show');
            //}
            ////newer: set dirty form = false
            //setTimeout(function () { $scope.demoForm.$setPristine(); }, 0);
      //  });
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















        /*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        //get cookie. 
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
        	$scope.userName = $rootScope.globals.currentUser.username;
        	$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
        $scope.$on('$routeChangeStart', function (event, next, current) {
            console.log('hidelldgdgdgllllll');
            $('body').find('.modal-backdrop').each(function () {
                //$(this).hide();
                $(this).remove();
                console.log('hide');
            })
        });
        $scope.$on('$routeChangeSuccess', function (event, next, current) {
            console.log('hidelllldgdgdgdgxxxxllll');
            $('body').find('.modal-backdrop').each(function () {
                $(this).remove();
                console.log('hide');
            })
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
                console.log('phat depo : ' + $rootScope.globals.currentUser.username);
                $('#dropArea').empty();
                if ($location.path() == '/' ){
                    homePagecontroller.transferData = '';
                    homePagecontroller.timerReset();
                    $interval.cancel(homePagecontroller.timerProcess);
                }
                else {
                    var res = $location.path().split("/");
                    exerciseApi.getAExerciseById(res[2])
                    .then(
                        function (response) {
                            if (response.data =='null') {
                                console.log('null data : ' + response.data);
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
                                console.log('response data success data1 : ' + response.data.exerciseId);
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
        });
        /**
        *    Click 'Yes' event to start do exercise --> open 'Start' modal
        *    If user click 'Yes'    -->  Stop time if time is running
        *                           -->  go to exercise/exerciseId
        */
        $scope.directToAnotherExercise = function (dataExerciseIdDirect) {
            //$("#validateChangeExerciseModel").modal({ backdrop: "false" });
            $scope.demoForm.$setPristine();
            /* Stop time */
            console.log('directToAnotherExercise');
            if (homePagecontroller.timerProcess) {
                $interval.cancel(homePagecontroller.timerProcess);
            }
            //$("#validateChangeExerciseModel").hide();
            //$("#validateChangeExerciseModel").modal('hide');
           // $stateProvide.transitionTo("/exercise/" + dataExerciseIdDirect + "/" + trung_gian);
            $location.url("/exercise/" + dataExerciseIdDirect + "/" + trung_gian);
            // $('#startModal').modal('show');
            //$location.url("/exercise/" + dataExerciseIdDirect + "/" + trung_gian);
        }
    }])


.factory('lstExercisesApi', ['$http',
        function ($http) {
			$http.getAllexerciseByUserName = function (userName) {
                return $http({
                   url: '/api/exercise/getallexercises?username=' + userName
               })
           }
           return $http;
        }

        //sercive get all exercise by username

        //function ($http) {
        //    $http.getAllexerciseByUserName = function (userName) {
        //        return $http({
        //            url: '/api/exercise/getallexercise?username=' + userName
        //        })
        //    }
        //    return $http;
        //}
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
            $http.getExpectResult = function (inputParameter,exerciseId) {
                var parameter = { parameter: inputParameter,exerciseid: exerciseId};
                var config = { params: parameter };
                return $http.get('/api/exercise/testcode', config);
                //.then(function (response) { console.log("chay qua day ne!!!" + response.data); response.data; });
            }
            return $http;
        }
    ])
    .factory('getTestCaseApi', ['$http',
        function ($http) {      
            $http.getTestCaseSubmit = function (exerciseId) {
                console.log('phat heo ' + exerciseId);
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
            $http.submitRecord = function (exerciseId, userName, passCase, Exercisestatus, time) {
                var parameter = {
                    exerciseid: exerciseId,
                    username: userName,
                    star: passCase,
                    status: Exercisestatus,
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
                return $http.get('/api/exercise/history', config);
            }
            return $http;
        }
    ])
    .directive('exerciseInfo', function () {
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
    })

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