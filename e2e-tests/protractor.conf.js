exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        '*.js'
    ],

    capabilities: {
        // You can use other browsers
        // like firefox, phantoms, safari, IE (-_-)
        //'browserName': 'firefox'
        //'browserName': 'internet explorer'
        'browserName': 'chrome', chromeOptions: {args: ['start-maximized']}
    },
    seleniumArgs: ['-avoidProxy', '-browserSessionReuse', '-debug', '-Dwebdriver.ie.driver=node_modules/protractor/selenium/IEDriverServer.exe'],
    chromeDriver: '../node_modules/chromedriver/lib/chromedriver/chromedriver.exe',
    seleniumServerJar: '../node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.47.1.jar',


    baseUrl: 'http://localhost:3000/#/',

    framework: 'jasmine2',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
