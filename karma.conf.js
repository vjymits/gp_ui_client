module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'app/bower_components/angular-translate/angular-translate.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-local-storage/dist/angular-local-storage.js',
            'app/bower_components/angular-translate-loader-url/angular-translate-loader-url.js',
            'app/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
            'app/**/*module.js',
            'app/common/ui-bootstrap-tpls.js',
            'app/common/**/*.js',
            'app/*.js',
            'app/login/*.js',
            'app/**/*.html'
        ],

        exclude: [
            'app/**/*.scenario.js',
            'app/common/faq.js',
            'app/common/global-sandbox.min.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            'karma-junit-reporter'
        ],
        
        preprocessors: {
            'app/**/*.html': ["ng-html2js"]
        },

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
