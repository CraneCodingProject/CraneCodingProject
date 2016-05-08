// 'use strict';

// angular.module('AdminPage')

// .factory('AuthenticationAdminApi',
//     ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout',
//     function (Base64, $http, $cookieStore, $rootScope, $timeout) {
//         var service = {};
//         service.Login = function (username, password, callback) 
//         {
//             $http.post('/api/exercise/authenticationAdmin', { username: username, password: password })
//                 .success(function (response) {
//                     console.log('success');
//                     callback(response);
//                 })
//                 .error(function(response){
//                 	console.log('fali');
//                 });
//         };
//     }])
// ;