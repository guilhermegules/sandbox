# AngularOptimizations

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## What we wanna optimize?

- Loading time - the moment when the user requests the page in the browser until the moment when it is ready to be used by him.
  - Bundling;
  - Minification and tree shaking;
  - Template optimization;
  - Tree-shakeable providers;
  - AoT;
  - Compression;
  - Pre loading of resources;
  - Lazy loading of resources;
  - Server side rendering;
  - Cache;
  - App shell - (concept) try to return the max of the static content for the client;
  - Service workers.
- Execution time - Improved navigation and rendering time for elements in the DOM
  - Use of _enableProdMode_;
  - Ahead-of-time compile;
  - Web workers;
  - Server side rendering;
  - changeDetection - Looking for components tree them render the component again;
  - Pure pipes - Treat data in the template;
  - _trackBy_ in \*ngFor;
  - reduce amount of elements in the DOM;
  - Template optimization.

## Useful info

- [Angular Performance Checklist](https://github.com/mgechev/angular-performance-checklist/blob/master/README.pt-BR.md)
- [Angular preloading](https://www.digitalocean.com/community/tutorials/angular-preloading)
