/**
 * @ngdoc interface
 * @name generic.table.dev
 * @module generic.table.dev
 * @description
 *
 * # generic-table-dev (core module)
 * The generic-table module is loaded by default.
 */
angular.module('generic.table.dev', ['mgcrea.ngStrap','ui.router','ngAnimate','ngResource','angular.filter','angular.bind.notifier','ngSanitize', 'ngCsv','angular.generic.table']);

angular.module('generic.table.dev').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('examples', {
        url: '/examples',
        templateUrl: 'partial/examples/examples.html'
    });
    $stateProvider.state('dev', {
        url: '/dev',
        templateUrl: 'partial/dev/dev.html'
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/examples');

});

angular.module('generic.table.dev').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
