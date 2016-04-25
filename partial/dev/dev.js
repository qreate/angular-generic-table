angular.module('generic.table').controller('DevController',function($scope){
    var showSomething = function(id){
        console.log(id);
    };

    $scope.exportCsv = function() {
        var options = {
          fileName:'test'
        };
        $scope.$broadcast('gt-export-csv',options);
    };

    // Basic table with static data
    $scope.basicTable = {
        settings: [
            {
                objectKey:'city',
                visible:true,
                enabled:true,
                sort:'enable',
                sortOrder:1,
                columnOrder:2
            },{
                objectKey:'numberOfCats',
                visible:true,
                enabled:true,
                sort:'enable',
                sortOrder:0,
                columnOrder:1
            },{
                objectKey:'percentHappyCats',
                visible:true,
                enabled:true,
                sort:'enable',
                sortOrder:0,
                columnOrder:0
            }

        ],
        fields:[
            {
                name:'City',
                type:"STRING",
                objectKey:'city',
                classNames:"",
                click:function(row){showSomething(row.numberOfCats);}
            },{
                name:'Number of cats',
                type:"NUMBER",
                objectKey:'numberOfCats',
                classNames:"text-right"
            },{
                name:'% Happy cats',
                type:"NUMBER",
                objectKey:'percentHappyCats',
                classNames:"text-right",
                render:function(row){ return '<span>'+row.numberOfCats/(row.numberOfCats*1.2)+'%</span>';},
                value:function(row){ return row.numberOfCats/(row.numberOfCats*1.2);}
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

});
