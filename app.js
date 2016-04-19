/**
 * @ngdoc interface
 * @name generic.table
 * @module generic.table
 * @description
 *
 * # generic-table (core module)
 * The generic-table module is loaded by default.
 */
angular.module('generic.table', ['mgcrea.ngStrap','ui.router','ngAnimate','ngResource','angular.filter','angular.bind.notifier','ngSanitize']);

angular.module('generic.table').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('examples', {
        url: '/examples',
        templateUrl: 'partial/examples/examples.html'
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/examples');

});

angular.module('generic.table').run(function($rootScope) {

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
