'use strict';

// Declare app level module which depends on views, and components
angular.module('firebaseContactsApp', [
  'ngRoute',
  'firebase',
  'firebaseContactsApp.contacts'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
