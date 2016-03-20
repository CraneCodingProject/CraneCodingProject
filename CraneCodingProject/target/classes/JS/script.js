/// <reference path="JS/directives/exerciseInfo.html" />
/// <reference path="JS/directives/exerciseInfo.html" />
var app = angular.module('craneCodding', ['unsavedChanges', 'ngRoute'])

    .config(['$routeProvider','unsavedWarningsConfigProvider',
        function ($routeProvider, unsavedWarningsConfigProvider) {
            $routeProvider
                .when('/exercise/:exerciseid', {
                    templateUrl: 'pages/mainPage.html',
                    controller: 'mainPageController'
                })
                .when('home/', {
                    templateUrl: 'index.html',
                    controller: 'homePageController'
                })
                .otherwise({
                    redirectTo: '/'
                });
            unsavedWarningsConfigProvider.useTranslateService = false;
        }
    ])
    .controller('homePageController', ['$scope', '$route', '$window', '$location', '$interval', 'lstExercisesApi', 'testCodeApi', 'submitCodeApi', 'transferData',
        function ($scope, $route, $window, $location, $interval, lstExercisesApi, testCodeApi, submitCodeApi, transferData) {
            lstExercisesApi.success(function (data) { $scope.lstExercises = data });
            var trung_gian = 0;
            var trung_gian_tam = 0;
            $scope.chosenExerciseNumber = -1; // so quan trong--> xac dinh nguoi choi dang choi o bai may : session
            /*-----------setup time run--------------*/
            var homePagecontroller = this;
            homePagecontroller.clock = { time: "", interval: 1000 };
            homePagecontroller.timer = { time: (new Date()).setHours(0, 0, 0, 0), startTime: "", interval: 10 };
            homePagecontroller.timerProcess;
            $scope.gotoHomePage = function () {
                $window.location.href = 'Homepage.html';
            }
            /*-----------End setup time run-----------*/

            /*----validate directive --> 'Yes/No' ----*/
            /*------Stop time if time is running------*/
            $scope.openValidateDirective = function (userId, index) {
                $scope.exerciseIdDirect = userId;
                trung_gian = index;

                //if (homePagecontroller.timerProcess) {
                //    $interval.cancel(homePagecontroller.timerProcess);
                //    console.log("running");
                //}
                //else {
                //    console.log('no run');
                //}

            }

            /*-------------Start do exercise --> 'Start' -----------*/
            /*----set class to make chosen item diferent another----*/
            $scope.directToAnotherExercise = function (dataExerciseIdDirect) {
                
                /* go to another exercise --> time start */
                $location.url("/exercise/" + dataExerciseIdDirect);
                $scope.chosenExerciseNumber = trung_gian;
                $('.chosenExercise').find('i').remove();
                /*-------- 
                    set timOut boi vi append chay truoc  "$scope.chosenExerciseNumber = trung_gian;"
                    Luong chay :
                    append --> $scope.chosenExerciseNumber ----> setTimeOut cho append
                --------*/
                setTimeout(function () { $('.chosenExercise').append('<i style="float:right" class="fa fa-arrow-right"></i>') }, 100);
                if (homePagecontroller.timerProcess) {
                    $interval.cancel(homePagecontroller.timerProcess);
                }
                else {
                }
            }

            /*----------Start do exercise and start run time------------*/
            $scope.startRunTime = function () {
                //var input = $('#testFormRequire');
                //input.val('a');
                //input.trigger('input');
                // Register the interval and hold on to the interval promise
                homePagecontroller.timerProcess = RegisterInterval(TimerTick, homePagecontroller.timer.interval);
                // Reset the time to 0
                homePagecontroller.timerReset();
            }
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

            /*---------test code before submit--------------*/
            $scope.testCodeBeforeSubmit = function (inputParameterToTest) {
                // print adtually result
                $scope.actuallyResult = getCODE(inputParameterToTest);
                // transfer data <inputParameterToTest> to server to get expect result then print expert result 
                // get expect result form server and set $scope.expectResult = expect result;
                testCodeApi.getExpectResult(inputParameterToTest)
                    .then(function (response) {
                        $scope.expectResult = response.data;
                    });
            }
            /*----------------------------------------------*/

            /*--------------Get code to 'test and submit'--------------------*/
            function getCODE(inputParameterToTest) {
                //inputParameterToTest = abc.inp;
                $('#result').removeAttr('src');
                var CODE = "<script>function MATH (n) { try{ var S; ";
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
                CODE = CODE + "S=" + inputParameterToTest + "; return S;}catch(err){return null;} } document.write(MATH(" + inputParameterToTest + "));</script>";
                var ifr = document.getElementById("result");
                var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
                ifrw.document.open();
                ifrw.document.write(CODE);
                var getVal = $("#result").contents().find("body").html();
                ifrw.close();
                return getVal;
            }
            //$scope.getFinalCODE=getCODE
            /*---------------------------------------------------------------*/
            
            /*----------Submit CODE-----------*/
            $scope.submitCODE = function (Exerciseid) {
                try
                {
                    if (homePagecontroller.timerProcess) {
                        //exerciseID :transferData.NameExercise_dataTransfer. '..ID';
                        //time : homePagecontroller.timer.time
                        var time = homePagecontroller.timer.time;
                        console.log("exersdfasdasdID_:" + Exerciseid);
                        $interval.cancel(homePagecontroller.timerProcess);
                        submitCodeApi.getTestCaseSubmit(Exerciseid)
                            .then(
                                function (response) {
                                    var dataNumberToNumber = response.data;
                                    //dataNumberToNumber = "[{"inp":"1", "outp":"1"},{"inp":"4", "outp":"2"},{"inp":"3", "outp":"3"}]";
                                    //var a="[{'inp":"1", "outp":"1"},{"inp":"4", "outp":"2"},{"inp":"3", "outp":"3"}]";
                                    console.log('dataNumberToNumber_: ' + dataNumberToNumber);
                                    $('#testCaseSubmit').empty();
                                    $('#submitModal .modal-footer').find('h3').remove();
                                    //var json = JSON.stringify(x);
                                    //var jsonx = $.parseJson(x);
                                    //eval("(" + str + ")")
                                    var test = true;
                                    var sumTestCases = 0;
                                    var falseTestCase = 0;
                                    var timePerformance=0;
                                    $.each(dataNumberToNumber, function (index, abc) {
                                        sumTestCases++;
                                        //var getCodeJsToTest = getCODE(abc.inp);

                                        console.time("concatenation");

                                        var getCodeJsToTest = getCODE(abc.inp);

                                        // ... and stop.
                                        //console.log("time:"+console.timeEnd("concatenation"));



                                        var start = new Date().getMilliseconds();
                                        var getCodeJsToTest = getCODE(abc.inp);
                                        timePerformance = timePerformance + (new Date().getMilliseconds() - start);
                                        console.log(timePerformance);
                                        //var timePerformance = end - start;
                                        //console.log('getCodeJsToTest' + getCodeJsToTest);
                                        //console.log('ss:' + abc.outp);
                                        //console.log(getCodeJsToTest == abc.outp);
                                        var statusCase = "<i style='color:#2BC430;font-size: xx-large;' class='fa fa-check'></i>";
                                        if (getCodeJsToTest != abc.outp) {
                                            test = false;
                                            falseTestCase++;
                                            statusCase = "<i style='color:#C42B2B;font-size: xx-large;' class='fa fa-times'></i>";
                                        }
                                        setTimeout(function () {
                                            $('#testCaseSubmit').append('<tr><td>' + abc.inp + '</td><td>' + getCodeJsToTest + '</td><td>' + abc.outp + '</td><td>' + statusCase + '</td></tr>');//<td>' + timePerformance + '</td>
                                        }, 400 * sumTestCases);
                                    });
                                    //console.log(getCODEExecuteTime)
                                    setTimeout(function () {
                                        $('#submitModal .modal-footer').append('<h3 style="float: left;"><i class="fa fa-cog fa-spin" style="padding: 4px;"></i>' + (sumTestCases - falseTestCase) + '/' + sumTestCases + ' with <i class="fa fa-clock-o fa-spin" style="padding: 4px;"></i>' + new Number(0.1 * (timePerformance / sumTestCases)).toPrecision(4) + ' seconds.</h3>');
                                    }, 400 * (sumTestCases + 1));
                                    console.log('time ' + new Number(0.1 * (timePerformance / sumTestCases)).toPrecision(4));
                                    // Form dirty --> Pristine
                                    if ($scope.demoForm.$dirty) {
                                        setTimeout(function () { $scope.demoForm.$setPristine(); }, 0);
                                    }
                                },
                                function (response) {
                                    //error
                                }
                            );
                        //dataNumberToNumber = '[{"inp":"1", "outp":"1"},{"inp":"4", "outp":"2"},{"inp":"3", "outp":"3"}]';
                        //dataArrayToNumber = '[{"inp":"[3,9,6,8]","outp":"9"},{"inp":"[3,10,6,8]","outp":"10"}]';
                        //dataArrayToArray = '[{"inp":"[987,657,333,666,555,444,33,3322,888,9999]","outp":"9999,888,3322,33,444,555,666,333,657,987"},{"inp":"[1,2,3]","outp":"3,2,1"},{"inp":"[3,2,1]","outp":"1,2,3"},{"inp":"[9,8,7]","outp":"7,8,9"}]';
                    }
                    else {
                        
                    }
                }
                catch (exception)
                {
                }
                
            }
            /*----------Route Change-----------*/
            $scope.$on('$routeChangeSuccess', function () {
                $('#dropArea').empty();
                //$('#startModal').show();
                //console.log($location.path());
                if ($location.path() == '/') {
                    homePagecontroller.transferData = '';
                    homePagecontroller.timerReset();
                    $interval.cancel(homePagecontroller.timerProcess);
                    //out code : set dirty form = false 
                    //$timeout(function () {
                    //    $scope.demoForm.testFormRequire.$dirty = true;
                    //}, 0);
                    //console.log('index');
                }
                else {
                    //to check dirty : $scope.demoForm.$dirty return true/false
                    homePagecontroller.transferData = transferData;
                    //show start after change route
                    $('#startModal').modal('show');
                }
                //newer: set dirty form = false
                setTimeout(function () { $scope.demoForm.$setPristine(); }, 0);
            });
        }
    ])
    .controller('mainPageController', ['$scope', '$routeParams', 'exerciseApi','transferData',
        function ($scope, $routeParams, exerciseApi,transferData) {
            //exerciseApi.success(function (data) { $scope.contentExercise = data });
            exerciseApi.getAExerciseById($routeParams.exerciseid).success(function (data) {
                $scope.exerciseContend = data;
                transferData.NameExercise_dataTransfer=data;
                $scope.transferData = transferData;
            });
        }
    ])
    .factory('lstExercisesApi', ['$http',
        function ($http) {
            return $http.get('/api/exercise/getallexercises')
                .success(function (data) { return data; })
                .error(function (err) { return err; });
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
            $http.getExpectResult = function (inputParameter) {
                var parameter = { parameter: inputParameter };
                var config = { params: parameter };
                return $http.get('/api/exercise/testcode', config)
                    //.then(function (response) { console.log("chay qua day ne!!!" + response.data); response.data; });
            }
            return $http;
        }
    ])
    .factory('submitCodeApi', ['$http',
        function ($http) {
            $http.getTestCaseSubmit = function (exerciseId) {
                var parameter = { exerciseId: exerciseId };
                var config = { params: parameter };
                return $http.get('/api/exercise/gettestcases',config)
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
    .service('transferData', function () {
        var transferData = this;
        transferData.NameExercise_dataTransfer = 'Default';
        //transferData.Code_dataTransfer = 'Default';
    })
    .directive('rulesModal', function () {
        return {
            restrict: 'E',
            scope: {

            },
            templateUrl: 'directives/ruleModal.html',
            link:
                function (scope, element, attrs) {
                    scope.rule = "Rules";
                }
        }
    })
   // .directive('validateChangeExerciseModal', function () {
   //     return {
   //         restrict: 'E',
   //         replace: true,
   //         scope: {
   //             ngModel: '=',
   //             exerciseiddirect: '@'
   //         },
   //         templateUrl: 'directives/validateChangeExerciseModal.html',
   //         link:
   //             function (scope, element, attrs) {
   //                 scope.directToAnotherExercise = function (exerciseiddirect) {
   //                    /* go to another exercise --> time start */
   //                     $location.url("/exercise/" + exerciseiddirect);
   //                     $scope.chosenExerciseNumber = trung_gian;
   //                     $('.chosenExercise').find('i').remove();
   //                     /*-------- 
   //                         set timOut boi vi append chay truoc  "$scope.chosenExerciseNumber = trung_gian;"
   //                         Luong chay :
   //                         append --> $scope.chosenExerciseNumber ----> setTimeOut cho append
   //                     --------*/
   //                     setTimeout(function () { $('.chosenExercise').append('<i style="float:right" class="fa fa-arrow-right"></i>') }, 100);
   //                     if (homePagecontroller.timerProcess) {
   //                         $interval.cancel(homePagecontroller.timerProcess);
   //                     }
   //                     else {
   //                     }
   //                 }
   //             }
   //     }
   //})
;


