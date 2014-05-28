var app = angular
    .module('angularYTS', [
        'ngRoute'
    ]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MoviesController',
    })
    .otherwise({
        templateUrl: 'views/home.html',
        controller: 'MoviesController',
    });

    $locationProvider.html5Mode(true);
}]);

app.directive('customSelect', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $timeout(function(){
                angular.element(element).customSelect();
            }, 0);
        }
    };
}]);