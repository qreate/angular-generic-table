/**
 * @ngdoc directive
 * @name generic.table.directive:genericTable
 * @requires // 'provide any dependencies ex. $scope, you can have multiple @requires lines'
 *
 * @restrict E
 *
 * @description
 * Description of genericTable directive, lorem ipsum dolar sit amet
 *
 * @param {string=} data-attribute // 'attributes used by directive, you can have multiple @param lines'
 *
 *  @example <pre>
 *
 * <generic-table data-attribute="my-value"></generic-table>
 *
 * </pre>
 */
angular.module('generic.table').directive('genericTable', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
            gtSettings:'=gtSettings',
            gtFields:'=gtFields',
            gtTotals:'=gtTotals',
            //gtIndex:'=gtIndex',
            gtData:'=gtData',
            gtRows:'@gtRows',
            gtRowTransition:'@gtRowTransition',
            gtPagination:'@gtPagination'
		},
		templateUrl: 'directive/generic-table/generic-table.html',
		link: function(scope, element, attrs, fn) {
		},
        controller:"genericTableController"
	};
}).controller('genericTableController',function($scope,$filter,$timeout){
    var originalData; // original untouched data
    var mappedData; // mapped data, array containing mapped keys used by table
    var sortedData; // sorted mapped data
    var sorting = []; // array containing sorting criterias
    $scope.gtPagination = typeof $scope.gtPagination === 'undefined' ? true:$scope.gtPagination !== 'false';
    $scope.gtRows = typeof $scope.gtRows === 'undefined' ? 20:$scope.gtRows;
    /*$scope.table = {
     index:$scope.gtIndex,
     settings: $scope.gtSettings,
     totals: $scope.gtTotals,
     fields:$scope.gtFields
     };*/

    // order columns
    $filter('map')($scope.gtSettings,function(setting){
        try{$filter('filter')($scope.gtFields,{objectKey:setting.objectKey},true)[0].columnOrder = setting.columnOrder;} catch(error) {
            console.log('field definition object for property: "'+ setting.objectKey +'" not found.',error);
        }

    });

    var initTable = function(initData){
        $scope.gtHasData = false;
        originalData = initData;
        $scope.$emit('gt-started-data-processing');
        applyFilter(initData);
    };

    // change data, this we update or data set
    var changeData = function(newData){
        $scope.gtHasData = false;
        originalData = newData;
        $scope.$emit('gt-started-data-processing');
        applyFilter(newData);
    };

    // internal filter, this is where we apply filters
    var applyFilter = function (data){
        var filteredData = data;
        mapKeys(filteredData);
        filteredData.length = 0;
    };

    // mapping, this is where we map which keys should be part of the table array row object
    var mapKeys = function (data){

        // get key names from table fields
        var properties = $filter('map')($scope.gtFields,function(field){
            try {
                var enabled = $filter('filter')($scope.gtSettings,{'objectKey':field.objectKey}, true)[0].enabled; // check if field is enabled
                if(enabled) return field.objectKey; // only return fields that are enabled
            } catch(error){
                console.log('settings object for property: "'+ field.objectKey +'" not found.',error);
            }
        });

        mappedData = $filter('map')(data, function(row){
            var obj = {}; // create new row object

            // retrieve object values from row and add them to the corresponding key defined by the table fields
            $filter('map')(properties,function(property){
                obj[property]=row[property];
            });
            return obj;
        });

        // apply sort to our mapped array
        applySort();
    };

    // sort, this is where we sort the filtered results
    var applySort = function (){
        sortedData = $filter('sortTable')(mappedData, sorting);
        $scope.$broadcast('$$rebind::gtRefresh');
        applyPagination();
    };

    // pagination, this is where we decide which subset of the data to show
    var applyPagination = function (){
        $scope.pages = $filter('chunkBy')(sortedData, parseInt($scope.gtRows));
        $scope.currentPage = 0;

        $scope.loading = true;
        $scope.$emit('gt-started-rendering');
        $scope.gtDisplayData = $scope.pages[$scope.currentPage];
        pagination($scope.pages.length,$scope.currentPage);

        $timeout(function(){
            $scope.$emit('gt-finished-data-processing');
            $scope.gtHasData = true;
        },200);
        //$scope.$emit('gt-finished-rendering');
        /*if($scope.loading){
         console.log('still looading');
         $scope.$emit('gt-finished-rendering');
         $scope.loading = false;
         }*/
    };

    // listen for update table events
    $scope.$on('gt-update-table',function(event,arg){
        changeData(arg);
    });

    // listen for update table events
    $scope.$on('gt-update-structure',function(event,arg){
        $scope.gtFields = arg.fields;
        $scope.gtSettings = arg.settings;
    });


    // listen for pagination length change
    $scope.$on('gt-paginate-table',function(event,arg){
        $scope.gtRows = parseInt(arg);
        applyPagination();
    });

    $scope.renderingComplete = function(){

    };

    // create pagination
    var pagination = function(totalPages, currentPage){
        $scope.pagination = [];

        // if less than two pages
        if(totalPages < 2){
            $scope.pagination = [0];
        }
        // if less than three pages
        else if(totalPages < 3){
            $scope.pagination = [0,1];
        }
        // if less than four pages
        else if(totalPages < 4){
            $scope.pagination = [0,1,2];
        }
        // if less than five pages
        else if(totalPages < 5){
            $scope.pagination = [0,1,2,3];
        }
        // if current page is one of the four first pages
        else if(currentPage < 4){
            $scope.pagination = [0,1,2,3,4];
        }
        // if next to last page
        else if(totalPages > currentPage+1){
            $scope.pagination = [currentPage-1,currentPage,currentPage+1];
        }
        // if last page
        else if(totalPages === currentPage+1){
            $scope.pagination = [currentPage-2,currentPage-1,currentPage];
        }
        // if current page is not one of the four first pages
        else if(totalPages-4 > currentPage){
            $scope.pagination = [currentPage-1,currentPage,currentPage+1, currentPage+2];
        }
    };

    $scope.nextPage = function(){
        try {
            $scope.currentPage ++;
            pagination($scope.pages.length,$scope.currentPage);
            $scope.$emit('gt-started-rendering');
            $scope.gtDisplayData = $scope.pages[$scope.currentPage];
        } catch(error) {
            console.log(error);
        }

    };

    $scope.previousPage = function(){
        $scope.currentPage --;
        pagination($scope.pages.length,$scope.currentPage);
        $scope.$emit('gt-started-rendering');
        $scope.gtDisplayData = $scope.pages[$scope.currentPage];
    };
    $scope.setPage = function(page){
        $scope.currentPage = page;
        pagination($scope.pages.length,$scope.currentPage);
        $scope.$emit('gt-started-rendering');
        $scope.gtDisplayData = $scope.pages[$scope.currentPage];
    };

    // sort function
    $scope.sort = function(property){
        if (property){
            for (var i = 0; $scope.gtSettings.length > i; i++){
                var setting = $scope.gtSettings[i];
                if(setting.objectKey === property){
                    var sort = setting.sort;
                    switch (sort){
                        case 'disable':
                            // do nothing
                            break;
                        case 'enable':
                            $scope.gtSettings[i].sort = 'asc';
                            break;
                        case 'asc':
                            $scope.gtSettings[i].sort = 'desc';
                            break;
                        case 'desc':
                            $scope.gtSettings[i].sort = 'enable';
                            break;
                    }

                }
            }

        }
        sorting = $filter('map')($filter('filter')($scope.gtSettings,{sort:"asc desc"},function(expected, actual){
            return actual.indexOf(expected) > -1;
        }),function(sort){
            return (sort.sort === 'desc' ? '-':'') + sort.objectKey
        });

        applySort();
    };

    // if table has data upon initialization...
    if($scope.gtData){
        initTable($scope.gtData); // initialize table with data passed to directive
    }

}).directive('gsEvent', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, fn) {
            if (scope.$last){
                scope.$emit('gt-finished-rendering');
                //scope.$parent.$parent.loading = false;
            }
        }
    };
}).filter('getProperty',function($filter){
    return function(settings, key,property){
        //console.log(key);
        try {
            var output = $filter('filter')(settings,{objectKey:key},true)[0][property];
        } catch (error) {
            console.log('cannot read property: "' + property + '" on missing key: "' + key + '" in settings.', error);
        }
        return output;
    }
}).filter('gtRender',function($filter){
    return function(settings, row, key){
        //console.log('render');
        var output;
        //var output = angular.isArray(settings) ? $filter('filter')(settings,{objectKey:key},true)[0][key]: row[key];
        if (angular.isArray(settings)) {
            var renderMethod = $filter('filter')(settings,{objectKey:key},true)[0].render;
            if(renderMethod && angular.isFunction(renderMethod)){
                output = renderMethod(row, key);
            } else {
                output = row[key];
            }
        } else {
            output = row[key];
        }

        return output;
    }
}).filter('camelToDash',function(){
    return function(string){
        return string.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
    }
}).filter('amountColor',function(){
    return function(amount){
        return parseInt(amount) < 0 ? 'text-sell':'text-buy';
    }
}).filter('coloredAmount',function($sce, $filter){
    return function(amount){
        return $sce.trustAsHtml('<span class="' + $filter('amountColor')(amount) + '">'+ $filter('currency')(parseFloat(amount),'') + '<span/>');
    }
}).filter('sortTable',function(){
    return function(array, propertyArray){
        function dynamicSort(property) {
            var sortOrder = 1;
            if(property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a,b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        };
        function dynamicSortMultiple(propertyArray) {
            /*
             * save the arguments object as it will be overwritten
             * note that arguments object is an array-like object
             * consisting of the names of the properties to sort by
             */
            var props = propertyArray; //arguments;
            return function (obj1, obj2) {
                var i = 0, result = 0, numberOfProperties = props.length;
                /* try getting a different result from 0 (equal)
                 * as long as we have extra properties to compare
                 */
                while(result === 0 && i < numberOfProperties) {
                    result = dynamicSort(props[i])(obj1, obj2);
                    i++;
                }
                return result;
            }
        }
        return array.sort(dynamicSortMultiple(propertyArray));
    }
});

