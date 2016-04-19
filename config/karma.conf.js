module.exports = function(config){
    config.set({
        preprocessors: {
            '*/directive/**/*.html': ['ng-html2js'],
            '*/partial/**/*.html': ['ng-html2js'],
            '*/modal/**/*.html': ['ng-html2js'],
            '*/directive/**/!(*spec|*mock).js': ['coverage'],
            '*/partial/**/!(*spec|*mock).js': ['coverage'],
            '*/modal/**/!(*spec|*mock).js': ['coverage'],
            '*/service/**/!(*spec|*mock).js': ['coverage'],
            '*/filter/**/!(*spec|*mock).js': ['coverage']
        },
        basePath : '../',

        ngHtml2JsPreprocessor: {
            // ADDED THIS: the name of the Angular module to create
            moduleName: "templates"//,

            //stripPrefix: 'C:/Dev/TradingStationT2_Devel/t2/nos/fxlc_web/'
        },

        files : [
            'bower_components/angular/angular.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'service/**/*.js',
            'directive/**/*.js',
            'partial/**/*.js',
            'modal/**/*.js',
            'app.js'
        ],

        //exclude: [
        //],

        // optionally, configure the reporter
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        },

        logLevel:'ERROR',
        autoWatch : false,
        singleRun: true,

        frameworks: ['jasmine'],
        reporters: ['mocha', 'coverage'],
        browsers: ['PhantomJS'],

        plugins: [
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            'karma-phantomjs-launcher',
            'karma-mocha-reporter',
            'karma-js-coverage'
        ]

    });
};
