angular.module('generic.table.dev').controller('DevController',function($scope){
    var showSomething = function(id){
        console.log(id);
    };

    $scope.exportCsv = function() {
        var options = {
            fileName:'test'
        };
        $scope.$broadcast('gt-export-csv:'+$scope.basicTableId,options);
    };

    $scope.searchTable = function(string){
        console.log(string);
        $scope.$broadcast('gt-search-table:'+$scope.basicTableId,string);
    };

    $scope.removeCity = function(){
        $scope.selectedRows.row1 = false;
    };
    $scope.selectedRows = {
        row1:true
    };
    // Basic table with static data
    $scope.basicTable = {
        settings: [
            {
                objectKey:'expandRow',
                visible:true,
                enabled:true,
                sort:'enable',
                sortOrder:1,
                columnOrder:5
            },{
                objectKey:'city',
                visible:true,
                enabled:true,
                sort:'enable',
                sortOrder:1,
                columnOrder:20
            },{
                objectKey:'numberOfCats',
                visible:true,
                enabled:true,
                sort:'enable',
                sortOrder:0,
                columnOrder:10
            },{
                objectKey:'percentHappyCats',
                visible:true,
                enabled:true,
                sort:'enable',
                sortOrder:0,
                columnOrder:5
            },{
                objectKey:'checkbox',
                visible:true,
                enabled:true,
                sort:'enable',
                sortOrder:0,
                columnOrder:20
            },{
                objectKey:'id',
                visible:true,
                enabled:true,
                sort:'enable',
                sortOrder:0,
                columnOrder:-1
            }

        ],
        fields:[
            {
                name:'Number of cats',
                stackedHeading:'No. of cats',
                objectKey:'expandRow',
                className:'expand',
                expand:'<custom-dir></custom-dir>',
                render:function(row, column){ return '<a>{{row.isOpen ? "Hide":"Show"}}<a/>'},
                compile:true,
                value:function(row){ return 'expand';},
                search:false
            },
            {
                name:'City',
                stackedHeading:true,
                objectKey:'city',
                classNames:"",
                click:function(row){showSomething(row.numberOfCats);}
            },{
                name:'Id',
                stackedHeading:true,
                objectKey:'id',
                classNames:""
            },{
                name:'Number of cats',
                stackedHeading:'No. of cats',
                type:"NUMBER",
                objectKey:'numberOfCats',
                classNames:"text-right",
                sort:function (row,column) { return row.numberOfCats.toString()}
            },{
                name:'% Happy cats',
                stackedHeading:true,
                objectKey:'percentHappyCats',
                classNames:"text-right",
                render:function(row){ return '<span>'+row.numberOfCats/(row.numberOfCats*1.2)+'%</span>';},
                value:function(row){ return row.numberOfCats/(row.numberOfCats*1.2);},
                search:function(row, column){ return row.numberOfCats }
            },{
                name:'',
                stackedHeading:'Checkbox',
                objectKey:'checkbox',
                classNames:"text-center",
                render:function(row){
                    var modelName = 'row'+row.id;
                    return '<input type="checkbox" ng-model="selectedRows.'+modelName+'" >';

                },
                compile:$scope
            }
        ],
        data:[{
            "city": "Juliaca",
            "numberOfCats": 149639,
            "id":1
        }, {
            "city": "Watergrasshill",
            "numberOfCats": 436290,
            "id":2
        }, {
            "city": "Dondar Quşçu",
            "numberOfCats": 725965,
            "id":3
        }, {
            "city": "Florida",
            "numberOfCats": 258855,
            "id":4
        }, {
            "city": "Sosnovyy Bor",
            "numberOfCats": 486188,
            "id":5
        }, {
            "city": "Bogdanovich",
            "numberOfCats": 691411,
            "id":6
        }, {
            "city": "Zaragoza",
            "numberOfCats": 304539,
            "id":7
        }, {
            "city": "Karlstad",
            "numberOfCats": 364097,
            "id":8
        }, {
            "city": "Tanjay",
            "numberOfCats": 970819,
            "id":9
        }, {
            "city": "Troparëvo",
            "numberOfCats": 768663,
            "id":10
        }]
    };

});
