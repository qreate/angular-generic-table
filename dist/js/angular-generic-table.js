/**
 * @ngdoc interface
 * @name angular.generic.table
 *
 * @description
 * Description of generic-table module, lorem ipsum dolar sit amet
 */
angular.module('angular.generic.table', ['ngAnimate','angular.filter','angular.bind.notifier','ngCsv']);
!function(e){try{e=angular.module("angular.generic.table")}catch(t){e=angular.module("angular.generic.table",[])}e.run(["$templateCache",function(e){e.put("generic-table/directive/generic-table/generic-table.html",'<div class="generic-table"><div class="gt-wrapper"><table class="table table-sortable" ng-if="gtHasData" ng-class=":gtRefresh:gtClasses"><thead><tr ng-class="::gtRowTransition ? \'fade-in animate\':\'\'"><th ng-repeat="field in ::gtFields | orderBy:\'columnOrder\' track by field.objectKey" ng-show=":gtRefresh:gtSettings | getProperty:field.objectKey:\'visible\'" ng-class=":gtRefresh:[field.classNames, (field.objectKey | camelToDash) + \'-column\', \'sort-\'+(gtSettings | getProperty:field.objectKey:\'sort\')]"><span ng-click=":gtRefresh:(gtSettings | getProperty:field.objectKey:\'sort\') === \'enable\' ? sort(field.objectKey):(gtSettings | getProperty:field.objectKey:\'sort\') === \'asc\' ? sort(field.objectKey):(gtSettings | getProperty:field.objectKey:\'sort\') === \'desc\' ? sort(field.objectKey):\'\'">{{::field.name}}</span></th></tr><tr ng-if=":gtRefresh:gtTotals" ng-class="::gtRowTransition ? \'fade-in animate\':\'\'"><td ng-repeat="field in ::gtFields | orderBy:\'columnOrder\' track by field.objectKey" class="total-column" ng-show=":gtRefresh:gtSettings | getProperty:field.objectKey:\'visible\'" ng-class="::[(gtFields | getProperty:field.objectKey:\'classNames\'), (field.objectKey | camelToDash) + \'-column\']" field-settings="::field" gt-render="" row-data="::gtTotals" gt-compile="::field.compile"></td></tr></thead><tbody><tr gt-row="" ng-repeat="row in :gtRefresh:gtDisplayData | limitTo: displayRows" gt-event="" ng-class=":gtRefresh:[gtRowTransition ? \'fade-in animate\':\'\',row.isOpen ? \'row-open\':\'\', $index % 2 == 0 ? \'row-odd\':\'row-even\']"><td ng-repeat="field in :gtRefresh:gtFields | orderBy:\'columnOrder\' track by field.objectKey" ng-show=":gtRefresh:gtSettings | getProperty:field.objectKey:\'visible\'" ng-class="::[(gtFields | getProperty:field.objectKey:\'classNames\'), (field.objectKey | camelToDash) + \'-column\']"><span ng-class="::field.click ? \'gt-click-enabled\':\'\'" field-settings="::field" gt-render="" row-data="::row" gt-compile="::field.compile" ng-click=":gtRefresh:!field.click || field.click(row);!field.expand || toggleRow(field.expand,(gtSettings | filter:{\'visible\':true}:true).length,row,field.objectKey);"></span></td></tr></tbody><tr ng-if=":gtRefresh:pagination === false"><td class="gt-no-data" colspan="{{:gtRefresh:(gtSettings | filter:{\'visible\':true}:true).length}}">{{::gtNoDataTxt}}</td></tr></table><div class="gt-pagination text-center" ng-if=":gtRefresh:gtPagination === true && pagination !== false"><ul class="pagination"><li ng-class=":gtRefresh:{disabled: currentPage === 0}" ng-show="currentPage !== 0"><button class="btn-link link" ng-click="previousPage()" translate="ALL.GENERAL#PAGINATION_PREVIOUS#BUTTON" ng-disabled=":gtRefresh:currentPage === 0">&laquo; Prev</button></li><li ng-show=":gtRefresh:currentPage > 3"><button class="btn-link link" ng-click="setPage(0)">1</button><small>&hellip;</small></li><li style="display: inline;padding: 0 5px;" ng-repeat="page in :gtRefresh:pagination" ng-class=":gtRefresh:page === currentPage ? \'active\':\'\'"><button class="btn-link link" ng-click="setPage(page)">{{page+1}}</button></li><li ng-show=":gtRefresh:currentPage +1 < pages.length-1 && pages.length > 4"><small ng-show=":gtRefresh:currentPage + 3 < pages.length">&hellip;</small><button class="btn-link link" ng-click="setPage(pages.length-1)">{{pages.length}}</button></li><li ng-class=":gtRefresh:{disabled: currentPage == pages.length}" ng-show=":gtRefresh:currentPage+1 !== pages.length"><button class="btn-link link" ng-click="nextPage()" translate="ALL.GENERAL#PAGINATION_NEXT#BUTTON" ng-disabled=":gtRefresh:currentPage+1 === pages.length">Next &raquo;</button></li></ul></div></div></div>')}])}();
/**
 * @ngdoc directive
 * @name angular.generic.table.directive:genericTable
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
angular.module('angular.generic.table').directive('genericTable', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            gtId:'=gtId',
            gtClasses:'@gtClasses',
            gtSettings:'=gtSettings',
            gtFields:'=gtFields',
            gtTotals:'=gtTotals',
            //gtIndex:'=gtIndex',
            gtData:'=gtData',
            gtRows:'@gtRows',
            gtRowTransition:'@gtRowTransition',
            gtPagination:'@gtPagination',
            gtNoDataTxt:'@'
        },
        templateUrl: 'generic-table/directive/generic-table/generic-table.html',
        link: function(scope, element, attrs, fn) {

        },
        controller:"genericTableController"
    };
}).controller('genericTableController',function($scope,$filter,$timeout, CSV,$document){
    var originalData; // original untouched data
    var mappedData; // mapped data, array containing mapped keys used by table
    var filteredData; // filtered mapped data
    var sortedData; // sorted mapped data
    var searchColumns; // columns to search
    var tableFilters; // filters applied to the table internally
    var searchTerms; // search terms used for searching table

    var sorting = typeof $scope.gtSettings === 'undefined' ? false:$filter('map')($filter('filter')($scope.gtSettings,{sort:"asc desc"},function(expected, actual){
        return actual.indexOf(expected) > -1;
    }),function(sort){
        return (sort.sort === 'desc' ? '-':'') + sort.objectKey
    }); // returns array containing sorting criteria
    $scope.gtPagination = typeof $scope.gtPagination === 'undefined' ? true:$scope.gtPagination !== 'false';
    $scope.gtRows = typeof $scope.gtRows === 'undefined' ? 20:$scope.gtRows;
    $scope.gtNoDataTxt = typeof $scope.gtNoDataTxt === 'undefined' ? 'No table data to display':$scope.gtNoDataTxt;
    $scope.gtId = typeof $scope.gtId === 'undefined' ? $scope.$id:$scope.gtId;

    // extend field definitions
    var extendFieldDefinitions = function() {
        $filter('map')($scope.gtSettings,function(setting){
            try{
                var field = $filter('filter')($scope.gtFields,{objectKey:setting.objectKey},true)[0];
                field.columnOrder = setting.columnOrder; // add column order
                if(setting.export === false) {
                    field.exportField = false; // add export field
                }
            } catch(error) {
                console.log('field definition object for property: "'+ setting.objectKey +'" not found.',error);
            }

        });
    };
    extendFieldDefinitions();

    var initTable = function(initData){
        $scope.gtHasData = false;
        originalData = initData.slice(0);
        $scope.$emit('gt-started-data-processing',$scope.gtId);
        mapKeys(initData);
    };

    // change data, this we update or data set
    var changeData = function(newData){
        $scope.gtHasData = false;
        originalData = newData.slice(0);
        $scope.$emit('gt-started-data-processing',$scope.gtId);
        mapKeys(newData);
    };

    // mapping, this is where we map which keys should be part of the table array row object
    var mapKeys = function (data){

        // define which fields should be searchable
        searchColumns = $filter('map')($filter('removeWith')($scope.gtFields.slice(0),{search:false}),'objectKey');

        // get key names from settings
        var properties = $filter('map')($filter('filter')($scope.gtSettings, {enabled:true},true),'objectKey');

        // create new array with mapped data
        mappedData = $filter('map')(data, function(row){
            var obj = {}; // create new row object

            // retrieve object values from row and add them to the corresponding key defined by the table fields
            $filter('map')(properties,function(property){
                // if property exists in data object...
                if(typeof row[property] !== 'undefined'){
                    // get column value from data property
                    obj[property]=row[property]
                } else {
                    //console.log('property: "' + property  + '" does not exist in data object, attempting to use value function instead ');
                    // property does not exists in data, use value function to get value for column
                    var valueFunction = $filter('map')($filter('filter')($scope.gtFields, {objectKey:property},true),'value')[0];
                    if(valueFunction && angular.isFunction(valueFunction)){
                        // use custom value function to retrieve value for column
                        //console.log('using value function to get data for row column ');
                        obj[property] = valueFunction(row);
                    } else {
                        console.log('property: "' + property  + '" does not exists in data object and no value function was declared');
                    }
                }
            });
            return obj;
        });

        applyFilter(mappedData)
    };

    // internal filter, this is where we apply filters
    var applyFilter = function (data, search) {

        // apply table filters
        var filtered = $filter('filter')(data.slice(0),tableFilters,function(expected, actual){
            return actual.indexOf(expected) > -1;
        },true).slice(0);

        // return rows where columns match entered search terms
        filteredData = $filter('searchRow')(filtered,searchColumns, search);
        applySort();
    };

    // sort, this is where we sort the filtered results
    var applySort = function (){
        sortedData = sorting !== false ? $filter('gtSort')(filteredData, sorting): filteredData;
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
            $scope.$emit('gt-finished-data-processing',$scope.gtId);
            $scope.gtHasData = true;
        },200);
        //$scope.$emit('gt-finished-rendering');
        /*if($scope.loading){
         console.log('still looading');
         $scope.$emit('gt-finished-rendering');
         $scope.loading = false;
         }*/
        $scope.$broadcast('$$rebind::gtRefresh');
    };

    // listen for update table events
    $scope.$on('gt-update-table:'+$scope.gtId,function(event,arg){
        changeData(arg);
    });

    // listen for search events
    $scope.$on('gt-search-table:'+$scope.gtId,function(event,arg){
        searchTerms = arg;
        applyFilter(mappedData.slice(0),arg);
    });

    // listen for filter events
    $scope.$on('gt-filter-table:'+$scope.gtId,function(event,arg){
        tableFilters = arg;
        applyFilter(mappedData.slice(0),searchTerms);
    });

    // listen for update table events
    $scope.$on('gt-update-structure:'+$scope.gtId,function(event,arg){
        $scope.gtFields = arg.fields;
        $scope.gtSettings = arg.settings;
        extendFieldDefinitions();
        searchColumns = $filter('map')($filter('removeWith')($scope.gtFields.slice(0),{search:false}),'objectKey');

        // if no sorting is applied or if sorting is forced...
        if(sorting === false || arg.forceSorting === true) {

            // ...set sorting order
            sorting = $filter('map')($filter('filter')($scope.gtSettings,{sort:"asc desc"},function(expected, actual){
                return actual.indexOf(expected) > -1;
            }),function(sort){
                return (sort.sort === 'desc' ? '-':'') + sort.objectKey
            }); // returns array containing sorting criteria
        } else {
            // reset sorting setting 'asc' and 'desc' to 'enable'
            $filter('map')($filter('filter')($scope.gtSettings,{sort:"asc desc"},function(expected, actual){
                return actual.indexOf(expected) > -1;
            }),function(setting){
                setting.sort = 'enable';
            });

            // update settings to match sorting in table
            $filter('map')(sorting,function(sortProperty){
                var sort = sortProperty.indexOf('-') === -1 ? 'asc':'desc';
                sortProperty = sortProperty.replace('-','');
                $filter('filter')($scope.gtSettings, {'objectKey':sortProperty},true)[0].sort = sort;
            });
        }

    });


    // listen for pagination length change
    $scope.$on('gt-paginate-table:'+$scope.gtId,function(event,arg){
        $scope.gtRows = parseInt(arg);
        applyPagination();
    });

    // listen for export event
    $scope.$on('gt-export-csv:'+$scope.gtId,function(event,arg){
        gtExport(arg);
    });


    // create pagination
    var pagination = function(totalPages, currentPage){
        $scope.pagination = [];

        // if total pages equals 0 ie. no data available
        if(totalPages === 0 ) {
            $scope.pagination = false;
            $scope.$emit('gt-table-filtered', {
                total:mappedData.length,
                filtered:0,
                showingFrom:0,
                showingTo:0,
                pageLength:$scope.gtRows,
                currentPage:0,
                numberOfPages:0
            });
            return;
        }

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

        $scope.$emit('gt-table-filtered', {
            total:mappedData.length,
            filtered:filteredData.length,
            showingFrom:$scope.currentPage*$scope.gtRows+($scope.currentPage > 1 ? 0:1),
            showingTo:$scope.currentPage*$scope.gtRows+$scope.gtDisplayData.length,
            pageLength:$scope.gtRows,
            currentPage:$scope.currentPage,
            numberOfPages:$scope.pages.length
        });
    };

    $scope.nextPage = function(){
        try {
            $scope.currentPage ++;
            $scope.gtDisplayData = $scope.pages[$scope.currentPage];
            pagination($scope.pages.length,$scope.currentPage);
            $scope.$emit('gt-started-rendering',$scope.gtId);
            $scope.$broadcast('$$rebind::gtRefresh');
        } catch(error) {
            console.log(error);
        }

    };

    $scope.previousPage = function(){
        try {
            $scope.currentPage --;
            $scope.gtDisplayData = $scope.pages[$scope.currentPage];
            pagination($scope.pages.length,$scope.currentPage);
            $scope.$emit('gt-started-rendering',$scope.gtId);
            $scope.$broadcast('$$rebind::gtRefresh');
        } catch(error) {
            console.log(error);
        }
    };
    $scope.setPage = function(page){
        try {
            $scope.currentPage = page;
            $scope.gtDisplayData = $scope.pages[$scope.currentPage];
            pagination($scope.pages.length,$scope.currentPage);
            $scope.$emit('gt-started-rendering',$scope.gtId);
            $scope.$broadcast('$$rebind::gtRefresh');
        } catch(error) {
            console.log(error);
        }
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

    // export function
    var gtExport = function(options){
        options = typeof options === 'undefined'? {}:options;

        var fileName = typeof options.fileName === 'undefined' ? 'export':options.fileName;

        // fix export data
        var exportData = JSON.parse(angular.toJson(sortedData.slice(0)));
        for (var i = 0; i < exportData.length; i++){
            var row = exportData[i];
            for (var key in row) {
                if (row.hasOwnProperty(key)) {
                    var fieldSetting = $filter('filter')($scope.gtFields, {objectKey: key}, true)[0];
                    var tableSetting = $filter('filter')($scope.gtSettings, {objectKey: key}, true)[0];

                    var exportMethod = fieldSetting.export;

                    // if export method is declared and is a function...
                    if (exportMethod && angular.isFunction(exportMethod)) {
                        // ...replace export data row value with value returned by function
                        row[key] = exportMethod(row, key);
                    }

                    // if exportColumns are passed with options...
                    if (typeof options.exportColumns !== 'undefined') {
                        // ...set value to null i.e. don't export column if it's not in the exportColumns array
                        if (options.exportColumns.indexOf(tableSetting.objectKey)===-1){
                            row[key] = null;
                        }
                    }
                    // if export is set to false for field...
                    else if (typeof tableSetting.export !== 'undefined' && tableSetting.export === false) {
                        // ...set value to null i.e. don't export column
                        row[key] = null;
                    }
                }
            }
        }

        // declare export data
        var data = exportData;//JSON.parse(angular.toJson(sortedData.slice(0)));

        // if exportColumns are passed with options...
        if (typeof options.exportColumns !== 'undefined') {
            
            // ...get field settings for all objectKeys in exportColumns array
            var exportFields = $filter('map')(options.exportColumns, function(objectKey){
                return $filter('filter')($scope.gtFields.slice(0), {objectKey:objectKey}, true)[0];
            } );
        }
        // else export all columns except columns not marked for export i.e. has field setting export:false (added to gtField
        else {
            var exportFields = $filter('orderBy')($filter('removeWith')($scope.gtFields,{exportField:false}),"columnOrder");
        }

        var headers = {
            fieldSep: typeof options.fieldSep === 'undefined' ? ";":options.fieldSep,
            header: $filter('map')(exportFields,"name"), // get headers by column order
            txtDelim: typeof options.txtDelim === 'undefined' ? '"':options.txtDelim,
            columnOrder:$filter('map')(exportFields,"objectKey"), // get column order
            decimalSep:typeof options.decimalSep === 'undefined' ? ',':options.decimalSep,
            addByteOrderMarker:typeof options.addBom === 'undefined',
            charset:typeof options.charset === 'undefined' ? 'utf-8':options.charset
        };

        CSV.stringify(data, headers).then(function(result){

            var blob;

            if (window.navigator.msSaveOrOpenBlob) {
                blob = new Blob([result], {
                    type: "text/csv;charset=utf-8;"
                });
                navigator.msSaveBlob(blob, 'export.csv');
            }
            else {
                // This is not a fully working solution, some tags (tex <BODY>) show up in excel together with the correct data.
                // We have added an alert message to urge users to use another browser or update their browser for a better looking export.
                if (window.navigator.appName === 'Microsoft Internet Explorer') {
                    window.alert("You're using an old version of Internet Explorer and the export might therefore have the wrong format, please update your browser.");
                    var iframe = angular.element('<iframe></iframe>');
                    iframe[0].style.display = "none";
                    var element = angular.element('body');
                    element.append(iframe);
                    var doc = null;
                    if (iframe[0].contentDocument) {
                        doc = iframe[0].contentDocument;
                    }else if (iframe[0].contentWindow){
                        doc = iframe[0].contentWindow.document;
                    }
                    doc.open("text/plain", "replace");
                    doc.write([result]);
                    doc.close();
                    //iframe.focus();
                    doc.execCommand('SaveAs', true, fileName+'.csv');
                }else{
                    blob = new Blob([result], {
                        type: "text/csv;charset=utf-8;"
                    });
                    var downloadLink = angular.element('<a></a>');
                    downloadLink.attr('href', window.URL.createObjectURL(blob));
                    downloadLink.attr('download',fileName+'.csv');

                    // append download link to body and click it, once clicked remove it
                    $document.find('body').append(downloadLink);
                    $timeout(function () {


                        downloadLink[0].click();
                        downloadLink.remove();
                    }, null);
                }
            }
        });

    };

}).directive('gtRow', function($compile) {
    return {
        restrict: 'A',
        scope:false,
        link: function(scope, element, attrs, fn) {
            scope.toggleRow = function(content,columns,row,key){
                if(!scope.row.isOpen){
                    var row = $compile('<tr class="expanded-row"><td colspan="'+columns+'">'+content+'</td></tr>')(scope);
                    element.after(row);
                    scope.row.isOpen = true;
                } else {
                    element.next().remove();
                    scope.row.isOpen = false;
                }
                scope.$broadcast('$$rebind::gtRefresh'); // update bindings
            };
        }
    };
}).directive('gtEvent', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, fn) {
            if (scope.$last){
                scope.$emit('gt-finished-rendering',scope.gtId);
                //scope.$parent.$parent.loading = false;
            }
        }
    };
}).directive('gtRender', function($compile) {
    return {
        restrict: 'A',
        scope:{
            row:'=rowData',
            settings:'=fieldSettings',
            compile:'=gtCompile'
        },
        link: function(scope, element, attrs, fn) {
            var row = scope.row;
            var key = scope.settings.objectKey;
            var output;

            var renderMethod = scope.settings.render;
            if(renderMethod && angular.isFunction(renderMethod)){
                output = renderMethod(row, key);
            } else {
                output = row[key];
            }
            if(scope.compile === true){
                output = $compile(output)(scope.$parent); // use same scope as row
            }

            element[0].innerHTML = output; // add html
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
}).filter('searchRow',function($filter){
    return function(array,fields,searchTerms){

        var filteredArray = [];
        var searchTerms = typeof searchTerms === 'undefined' ? '':searchTerms;
        var searchTermsArray = searchTerms.toLowerCase().split(' ');

        for (var i = 0; i < array.length; i++){
            var row = array[i];
            var string = '';
            $filter('map')(fields,function(field){
                string += row[field];
            });
            string = string.toLowerCase();
            var match = true;
            for (var k = 0; k < searchTermsArray.length;k++){
                var term = searchTermsArray[k];
                match = string.indexOf(term) !== -1;

                if(!match){
                    break;
                    // no match
                    //return match;

                }
            }
            if(match){
                //console.log('push',row);
                filteredArray.push(row)
            }
        }
        return filteredArray;
    }
}).filter('camelToDash',function(){
    return function(string){try{
        return string.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase()} catch(error){console.log('nothing to replace:', error)};
    }
}).filter('gtSort',function(){
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
        }
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