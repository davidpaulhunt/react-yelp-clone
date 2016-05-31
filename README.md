A Yelp Clone
============

#### TL;DR
- built using **React**
- written in **ES2015**
- bundled via **webpack**
- compiled by **Babel**
- developed through **TDD**

### Anatomy
Webpack sets the entry point to `app.js` where the App container is initialized (it lives in `containers/App/App.js`).

The `<App />` container injects the necessary instance of react-router as the page content. Application routes are built in `routes.js` where it requires `views/Main/routes.js` and nests it inside a react-router `<Route />` object.

While `<App />` contains our injected routes, `views/Main/Container.js` is the wrapper that binds our components together, allowing us to bind those components to parent functions and data. `<Container />` uses its render() function to glue all of our components together.

> NOTE - Each component and container includes `styles.module.css` and `{Name}.spec.js` files. Styles are modularized and managed by precss and cssnano. More on spec files below.

### Installation
Clone it
```
$ mkdir react-yelp-clone && cd react-yelp-clone
$ git clone git@github.com:davidpaulhunt/react-yelp-clone.git
```
Install node modules
```
$ npm install
```
Start the server
```
$ npm start
```
Open http://localhost:3000/ in a browser.

### Testing
Tests are built and run by committee using karma, mocha, chai, enzyme, jasmine-core, and phantomjs.

> NOTE - As mentioned above, each component and container includes a `{Name}.spec.js` file. A shallow instance of the react component/container is built before each test using enzyme. Tests are run in a headless browser via PhantomJS.

First, install the karma-cli
```
$ npm install -g karma-cli
```
To run tests once
```
$ npm test
```
To utilize webpack's hot reloading i/e have the tests run after each time a file changes
```
$ npm run test:watch
```

### License
MIT

### Acknowledgement
This example application, especially the structure and modules used, come from Fullstack React's [tutorial](https://www.fullstackreact.com/articles/react-tutorial-cloning-yelp/). Big thanks to those folks for helping me get started with the stack!
