angular.module('generic.table.dev').controller('DocumentationController',function($scope){
    // Options
    $scope.optionsTable = {
        settings: [
            {
                objectKey:'name',
                visible:true,
                enabled:true,
                sort:'false',
                sortOrder:0,
                columnOrder:0
            },{
                objectKey:'type',
                visible:true,
                enabled:true,
                sort:'false',
                sortOrder:1,
                columnOrder:1
            },{
                objectKey:'default',
                visible:true,
                enabled:true,
                sort:'false',
                sortOrder:2,
                columnOrder:2
            },{
                objectKey:'description',
                visible:true,
                enabled:true,
                sort:'false',
                sortOrder:3,
                columnOrder:3
            }

        ],
        fields:[
            {
                name:'Name',
                type:"STRING",
                objectKey:'name',
                classNames:""
            },{
                name:'Type',
                type:"STRING",
                objectKey:'type',
                classNames:""
            },{
                name:'Default',
                type:"STRING",
                objectKey:'default',
                classNames:""
            },{
                name:'Description',
                type:"STRING",
                objectKey:'description',
                classNames:""
            }
        ],
        data:[{
            "name":"gt-id (optional)",
            "type":"number",
            "default":"id of table scope",
            "description":"unique id for table, if none is passed, the scope id will be returned. Use id together with events"
        },{
            "name":"gt-classes (optional)",
            "type":"string",
            "default":"",
            "description":"add classes to table element e.g. table-bordered, table-condensed etc. for bootstrap styles"
        },{
            "name":"gt-data (optional)",
            "type":"array",
            "default":"",
            "description":"data for table"
        },{
            "name":"gt-settings (required)",
            "type":"array",
            "default":"",
            "description":"settings for table fields: visible, enabled, sort, sortOrder, columnOrder"
        },{
            "name":"gt-fields (required)",
            "type":"array",
            "default":"",
            "description":"field definitions: name, classes, type, custom render function"
        },{
            "name":"gt-totals (optional)",
            "type":"object",
            "default":"",
            "description":"display totals, average etc. for defined columns"
        },{
            "name":"gt-rows (optional)",
            "type":"number",
            "default":"20",
            "description":"number of rows to be displayed in table"
        },{
            "name":"gt-row-transition (optional)",
            "type":"boolean",
            "default":"false",
            "description":"animate rows using css transitions"
        },{
            "name":"gt-pagination (optional)",
            "type":"boolean",
            "default":"true",
            "description":"show pagination"
        },{
            "name":"gt-no-data-txt (optional)",
            "type":"string",
            "default":"No table data to display",
            "description":"text for when table is empty"
        }]
    };

    // events
    $scope.eventsTable = {
        settings: [
            {
                objectKey:'name',
                visible:true,
                enabled:true,
                sort:'false',
                sortOrder:0,
                columnOrder:0
            },{
                objectKey:'description',
                visible:true,
                enabled:true,
                sort:'false',
                sortOrder:1,
                columnOrder:1
            }

        ],
        fields:[
            {
                name:'Name',
                type:"STRING",
                objectKey:'name',
                classNames:""
            },{
                name:'Description',
                type:"STRING",
                objectKey:'description',
                classNames:""
            }
        ],
        data:[{
            "name":"gt-started-rendering",
            "description":"emitted when table starts rendering"
        },{
            "name":"gt-finished-rendering",
            "description":"emitted when table finished rendering last row"
        },{
            "name":"gt-started-data-processing",
            "description":"emitted when data processing has started (table initialization and change data)"
        },{
            "name":"gt-finished-data-processing",
            "description":"emitted when data processing has finished"
        },{
            "name":"gt-table-filtered",
            "description":"emitted when table has been filtered, object containing: total, filtered, showingFrom, showingTo, pageLength, currentPage and numberOfPages."
        }]
    };

    // listeners
    $scope.listenersTable = {
        settings: [
            {
                objectKey:'name',
                visible:true,
                enabled:true,
                sort:'false',
                sortOrder:0,
                columnOrder:0
            },{
                objectKey:'description',
                visible:true,
                enabled:true,
                sort:'false',
                sortOrder:1,
                columnOrder:1
            },{
                objectKey:'options',
                visible:true,
                enabled:true,
                sort:'false',
                sortOrder:2,
                columnOrder:2
            }

        ],
        fields:[
            {
                name:'Name',
                type:"STRING",
                objectKey:'name',
                classNames:""
            },{
                name:'Description',
                type:"STRING",
                objectKey:'description',
                classNames:""
            },{
                name:'Arguments',
                type:"STRING",
                objectKey:'options',
                classNames:""
            }
        ],
        data:[{
            "name":"gt-update-table:gtId",
            "description":"update table data",
            "options":"data array, ie. $scope.$broadcast('gt-update-table:tableId', data);"
        },{
            "name":"gt-search-table:gtId",
            "description":"search (filter) table using search terms, separate terms with space",
            "options":"search string, ie. $scope.$broadcast('gt-search-table:tableId', 'my search string');"
        },{
            "name":"gt-filter-table:gtId",
            "description":"filter table data by property (objectKey)",
            "options":"filter object, ie. $scope.$broadcast('gt-filter-table:tableId', {objectKey1:['value1','value2'], objectKey2:[0,1,2]});"
        },{
            "name":"gt-update-structure:gtId",
            "description":"update structure of table (settings and field definitions)",
            "options":"object, ie. $scope.$broadcast('gt-update-structure:tableId', {fields:[],settings:[]});"
        },{
            "name":"gt-paginate-table:gtId",
            "description":"change how many rows are visible",
            "options":"number, ie. $scope.$broadcast('gt-paginate-table:tableId', 10);"
        },{
            "name":"gt-export-csv:gtId",
            "description":"export table data to csv, <a href='/#examples#exportOptions'>see all export options</a>.",
            "options":"export settings object, ie. $scope.$broadcast('gt-export-csv:tableId', {fileName:'my-custom-export'});"
        }]
    };

    // export options
    $scope.exportOptionsTable = {
        settings: [
            {
                objectKey:'name',
                visible:true,
                enabled:true,
                sort:'false',
                sortOrder:0,
                columnOrder:0
            },{
                objectKey:'description',
                visible:true,
                enabled:true,
                sort:'false',
                sortOrder:1,
                columnOrder:1
            },{
                objectKey:'default',
                visible:true,
                enabled:true,
                sort:'false',
                sortOrder:2,
                columnOrder:2
            }

        ],
        fields:[
            {
                name:'Name',
                type:"STRING",
                objectKey:'name',
                classNames:""
            },{
                name:'Description',
                type:"STRING",
                objectKey:'description',
                classNames:""
            },{
                name:'Default',
                type:"STRING",
                objectKey:'default',
                classNames:""
            }
        ],
        data:[{
            "name":"fileName",
            "description":"file name (omit file extension)",
            "default":"export.csv"
        },{
            "name":"exportColumns",
            "description":"columns to export ex. ['objectKey1','objectKey2'] overrules field settings",
            "default":"exports all column except columns with field setting export:false"
        },{
            "name":"fieldSep",
            "description":"field separator",
            "default":";"
        },{
            "name":"addByteOrderMarker",
            "description":"add byte order marker (BOM)",
            "default":"true"
        },{
            "name":"txtDelim",
            "description":"delimiter for text",
            "default":'"'
        },{
            "name":"decimalSep",
            "description":"decimal separator",
            "default":","
        },{
            "name":"charset",
            "description":"character set",
            "default":"UTF-8"
        }]
    };

}).controller('BasicExampleController',function($scope){
    // Basic table with static data
    $scope.basicTable = {
        settings: [
            {
                objectKey:'city',
                visible:true,
                enabled:true,
                sort:'enable',
                sortOrder:1,
                columnOrder:0
            },{
                objectKey:'numberOfCats',
                visible:true,
                enabled:true,
                sort:'enable',
                sortOrder:0,
                columnOrder:1
            }

        ],
        fields:[
            {
                name:'City',
                type:"STRING",
                objectKey:'city',
                classNames:""
            },{
                name:'Number of cats',
                type:"NUMBER",
                objectKey:'numberOfCats',
                classNames:"text-right"
            }
        ],
        data:[{
            "city": "Juliaca",
            "numberOfCats": 149639
        }, {
            "city": "Watergrasshill",
            "numberOfCats": 436290
        }, {
            "city": "Dondar Quşçu",
            "numberOfCats": 725965
        }, {
            "city": "Florida",
            "numberOfCats": 258855
        }, {
            "city": "Sosnovyy Bor",
            "numberOfCats": 486188
        }, {
            "city": "Bogdanovich",
            "numberOfCats": 691411
        }, {
            "city": "Zaragoza",
            "numberOfCats": 304539
        }, {
            "city": "Karlstad",
            "numberOfCats": 364097
        }, {
            "city": "Tanjay",
            "numberOfCats": 970819
        }, {
            "city": "Troparëvo",
            "numberOfCats": 768663
        }]
    };

}).controller('CustomRenderExampleController',function($scope, mockService){

    // function for exporting to csv
    $scope.exportCsv = function() {
        $scope.$broadcast('gt-export-csv:'+$scope.tableCustomRender.id);
    };

    // function for searching table
    $scope.searchTable = function(string) {
        $scope.$broadcast('gt-search-table:'+$scope.tableCustomRender.id,string);
    };

    // listen for table info events
    $scope.$on('gt-table-filtered',function(event,arg){
        $scope.tableInfo = arg;
    });

    // function for applying filters
    $scope.applyFilters = function() {
        var filters = {
            'fullName':['Gregory Little','Billy Gilbert','Jason Snyder','Brandon Austin'],
            'age':[53,39,18]
        };
        $scope.$broadcast('gt-filter-table:'+$scope.tableCustomRender.id,filters);
    };

    // function for resetting filters
    $scope.resetFilters = function() {
        var filters = {};
        $scope.$broadcast('gt-filter-table:'+$scope.tableCustomRender.id,filters);
    };

    // Table with custom render function
    $scope.tableCustomRender = {
        settings: [
            {
                objectKey:'fullName',
                visible:true,
                enabled:true,
                sort:'asc',
                sortOrder:0,
                columnOrder:0
            },{
                objectKey:'favoriteColor',
                visible:true,
                enabled:true,
                sort:'disable',
                sortOrder:0,
                columnOrder:4
            },{
                objectKey:'birthday',
                visible:true,
                enabled:true,
                sort:'enable',
                sortOrder:0,
                columnOrder:1
            },{
                objectKey:'age',
                visible:true,
                enabled:true,
                sort:'enable',
                sortOrder:0,
                columnOrder:2
            },{
                objectKey:'details',
                visible:true,
                enabled:true,
                sort:'disable',
                sortOrder:0,
                columnOrder:5,
                export:false
            }

        ],
        fields:[
            {
                name:"Favorite color",
                stackedHeading:'Custom heading for stacked',
                type:"STRING",
                objectKey:'favoriteColor',
                classNames:"text-right middle",
                render:function(row){return '<div style="float:right;width:15px;height:15px;border-radius:50%;background: '+row.favoriteColor+'"></div>'},
                search:false
            },{
                name:"Birthday",
                stackedHeading:true,
                type:"DATE",
                objectKey:'birthday',
                classNames:"",
                render: function(row){return moment.unix(row.birthday).format('YYYY-MM-DD')}
            },{
                name:'Name',
                stackedHeading:true,
                type:"STRING",
                objectKey:'fullName',
                classNames:"",
                exportEscapeString:false

            },{
                name:'Age',
                stackedHeading:true,
                type:"NUMBER",
                objectKey:'age',
                classNames:"text-right",
                render: function(row){return moment().diff(moment.unix(row.birthday),'years')},
                value: function(row){return moment().diff(moment.unix(row.birthday),'years')}
            },{
                name:'Details',
                stackedHeading:false,
                type:"NUMBER",
                objectKey:'details',
                classNames:"text-right hidden-stacked",
                render: function(row, column){ return '<a>{{row.isOpen ? "Hide":"Show"}}<a/>'},
                compile:true,
                value: function(row){return 'details'},
                expand:'<custom-dir></custom-dir>',
                search:false
            }
        ],
        data:[]
    };

    mockService.getJsonData().then(function(res){
        $scope.$broadcast("gt-update-table:"+$scope.tableCustomRender.id, res);
    });


}).factory('mockService',function($resource, $http) {

    /* remote service example
     function getData () {
     var url = 'http://example.com/json.json';
     return $http.jsonp(url).then(function (response) {
     return response.data;
     });
     }*/

    function getJsonData(){
        var url = './partial/examples/mock-data.json';
        return $http.get(url).then(function (response) {
            //console.log(response.data);
            return response.data;
        });
    }

    return {
        "getJsonData":getJsonData
    };
}).directive('customDir', function() {
    return {
        replace:true,
        template:'<div><div class="pull-left"><label>Name:&nbsp;</label>{{row.fullName}}<br><label>Age:&nbsp;</label>{{row.age}}<br><label>Favorite random number:&nbsp;</label>{{randomNumber}}<br><a ng-click="update()">Update</a></div> <a class="pull-right" ng-click="close()">Close</a> </div>',
        restrict: 'E',
        link: function(scope, element, attrs, fn) {
            console.log(scope.row); // log row object
            scope.close = scope.toggleRow; // assign close function to button in directive
            scope.randomNumber = Math.random();
            scope.update = function(){
                scope.randomNumber = Math.random();
                console.log('update something');
            };
        }
    };
});