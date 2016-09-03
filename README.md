# Synchronoss Portal Seed

Project originally imported from https://github.com/JshReynolds/sncr-portal-seed.  It is an application skeleton for a typical [AngularJS](http://angularjs.org/) web app. 

The sncr-portal-seed repo is a fork of the [angular-seed] (https://github.com/angular/angular-seed) project that is refactored to use the [Best Practices / Style Guide](https://github.com/johnpapa/angular-styleguide) written and maintained by John Papa.  Please review this guide and strive to
keep the application in conformity with the principles it describes.

This seed wires together
 
*  a basic app, 
*  two components/controllers and 
*  one service.  

## Audience 
This seed is intended for Synchronoss developers who want to create the initial structure of a simple Angular application that:

* Reflects best practices
* Does not overwhelm with "unnecessary" tools and process

The project has a coherent and standard file structure.  It includes configuration for standalone front-end development, unit testing (executable on ever file change) and end-to-end testing.

## Getting Started

To get you started you 

* Install prerequisite software
* Clone the sncr-portal-seed repository 
* Import the project into your own repo

### Prerequisites

* Install git
* Install node.js and its package manager (npm).
* Install npm package dependencies as needed (python etc).

### Clone sncr-portal-seed

Clone the sncr-portal-seed repository using [git][git].  Copy the
project to a new directory.

```
git clone ssh://git@stash.synchronoss.net:7999/arch_act3/sncr-portal-seed.git
```	

### Create your Own Project from the Seed Repo

Request a new repository be created in Stash.  Once it is available,
you can copy and import the seed project into your new repo.

```	
mv sncr-portal-seed <your project name>
cd <your project name>
git remote set-url origin ssh://git@stash.synchronoss.net:7999/<your project>/<your new repo>.git
```

Verify the application running the unit tests and end-to-end tests as described below.

To rename your root module from `myApp` replace the `YOUR_APP_NAME` text in `package.json`.   To preview what will be changed, run:

```
npm run replace-name-preview
```

To make the changes:

```
npm run replace-name
```

## Application Development Notes

### Tool Dependencies

* npm: the [node package manager][npm] for build deps.
* bower: a [client-side code package manager][bower] for app deps.

Running `npm` will automatically invoke bower for you.

```
npm install
```

This will result in the following third-part modules.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would _normally_ be installed in the root folder but
sncr-portal-seed (and sncr-portal-seed) changes this location through the `.bowerrc` file.  Putting it in the app folder makes it easier to serve the files by a webserver.*

### Run the Application

Front end developers can run the application using node independently of
backend gateway work required for ajax responses.  This is for development
purposes only.  It allows front end development to proceed independently
from (and in parallel to) backend development work.

```
npm start
```

Now browse to the app at `http://localhost:8000/index.html`.


## Directory Layout

```
app/                    --> Source files for the application
  css/app.css           --> default stylesheet
  components/           --> Specific modules
  app.js                --> Main application module
  index.html            --> app layout file (main html file)
  index-async.html      --> Identical to index.html, but loads js files asynchronously
karma.conf.js           --> config for running unit tests with Karma
e2e-tests/              --> end-to-end tests
  protractor-conf.js    --> config for running end-to-end tests with Protractor 
  scenarios.js          --> end-to-end scenarios to be run by Protractor
```

## Testing

There are two kinds of tests in the sncr-portal-seed application: 

* Unit tests 
* End to End tests.

### Running Unit Tests

Unit tests are written in [Jasmine][jasmine], and run with [Karma Test Runner][karma]. 

* configuration file: `karma.conf.js`
* test files are next to the code and named: `*.spec.js`.

To run, use the npm script:

```
npm test
```

Karma will watch files for changes and rerun tests each time a change is detected.  The test results are displayed in the terminal where you ran the `npm test` command.

If you just want a single run then...

```
npm run test-single-run
```


### End to end testing

The sncr-portal-seed app comes with end-to-end tests written in [Jasmine][jasmine] and run with [Protractor][protractor].
 
* the configuration is found at `protractor-conf.js`
* the end-to-end tests are found alongside the components they are testing.

**NOTE: The node/npm webserver must be running to perform end-to-end tests.  It start it with:**

```
npm start
```

The port has been assigned 8077.  Documentation online will often reference the standard use of port 8000, but this conflicts with applications on the local development environment virtual machine which is why it was reassigned.

To test, run:

```
npm run protractor
```

This will download and install the latest version of the stand-alone WebDriver tool if necessary and run protractor using the configuration file.

## Updating Tools and Packages

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.


### Running the App during Development

```
npm start
```

This will run your app in an http server accessible at [http://localhost:8077](http://localhost:8077)

## Gateway Integration
When you are ready to do development with the actual backend Gateway:

* Set up a ChefDk local development environment using your project's cookbook.
* Consult the resources in the cookbook in the frontend_development directory for more information.

## Continuous Integration

### Bamboo
TODO - discuss front end testing in Bamboo.  The Linux Bethlehem Bamboo servers do have node installed.  However, work needs to be done to support Sonar
Integration.

## Links

For more information on AngularJS please check out http://angularjs.org/

[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[http-server]: https://github.com/nodeapps/http-server
