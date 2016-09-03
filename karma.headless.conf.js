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
			'app/common/**/*.js',
			'app/common/ui-bootstrap-tpls.js',
			'app/*.js',
            'app/login/*.js',
            'app/step1/*.js',
            'app/step2/*.js',
            'app/step3/*.js',
            'app/**/*.html',
            'app/success/*.js'
        ],

        exclude: [
            'app/**/*.scenario.js',
            'app/common/faq.js',
            'app/common/global-sandbox.min.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            'karma-junit-reporter',
				'karma-coverage',
            'karma-phantomjs-launcher'
        ],
        
        reporters: ['progress', 'junit', 'coverage'],

		  preprocessors:    {
				'app/**/{*.js,!(node_modules|bower_component)/*.js}' : ['coverage']
		  },        

        junitReporter: {
            outputFile: 'reports/junit/TESTS-xunit.xml',
            suite: 'unit'
        },
		
		  coverageReporter: {
		      type:   'lcov',
            dir:    'reports',
            subdir: 'coverage'
        }
    });
};
