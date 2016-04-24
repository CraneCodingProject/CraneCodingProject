/// <reference path="../modules/mainPage/views/mainPage.html" />
/// <reference path="../modules/homePage/views/homePage.html" />
'use strict';
// declare modules
angular.module('HomePage', []);
angular.module('MainPage', []);

angular.module('CrainCoding', [
    'HomePage',
    'MainPage',
    'unsavedChanges',
    'ngRoute',
    'ngCookies'
])

.config(['$routeProvider', 'unsavedWarningsConfigProvider', function ($routeProvider, unsavedWarningsConfigProvider) {
    $routeProvider
        .when('/home', {
            controller: 'HomePageController',
            templateUrl: 'modules/homePage/views/homePage.html'
        })
        .when('/', {
            controller: 'MainPageController as homePagecontroller',
            templateUrl: 'modules/mainPage/views/mainPage.html'
        })
        .when('/exercise/:exerciseid/:index', {
            controller: 'MainPageController as homePagecontroller',
            templateUrl: 'modules/mainPage/views/mainPage.html',
            reloadOnSearch: false
        })
        .otherwise({ redirectTo: '/' });
    unsavedWarningsConfigProvider.useTranslateService = false;
}])

//.run(['$rootScope', '$location', '$cookieStore', '$http',
//    function ($rootScope, $location, $cookieStore, $http) {
//        // keep user logged in after page refresh
//        $rootScope.globals = $cookieStore.get('globals') || {};
//        if ($rootScope.globals.currentUser) {
//            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//        }
//        $rootScope.$on('$locationChangeStart', function (event, next, current) {
//            // redirect to login page if not logged in
//            console.log($rootScope.globals.currentUser);
//            //if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
//            //    $location.path('/login');
//            //}
//            if (!$rootScope.globals.currentUser) {
//                $location.path('/login');
//            }
//        });
//    }])

;
