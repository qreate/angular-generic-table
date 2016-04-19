/**
 * @ngdoc directive
 * @name generic.table.directive:prism
 * @requires // 'provide any dependencies ex. $scope, you can have multiple @requires lines'
 *
 * @restrict E
 *
 * @description
 * Description of prism directive, lorem ipsum dolar sit amet
 *
 * @param {string=} data-attribute // 'attributes used by directive, you can have multiple @param lines'
 *
 *  @example <pre>
 *
 * <prism data-attribute="my-value"></prism>
 *
 * </pre>
 */
angular.module('generic.table').directive('prism', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, fn) {
            element.ready(function() {
                Prism.highlightElement(element[0]);
            });

		}
	};
});
