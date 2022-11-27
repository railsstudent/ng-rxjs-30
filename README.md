# NgRxjs30

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.2.

## Development server

Run `ng serve --project=<project name>` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Generate module in projects
```bash
 - change to project directory
ng g m src/app/<module name> --project=<project name> --module=src/app/app.module
```

## Generate component in a feature module of projects

```bash
 - change to project directory
 ng g c src/app/<feature module>/<component name> --change-detection=OnPush --project=<project name> --module=src/app/<feature module>.module 
```

## Build project in docs folder
```bash
./build-doc.sh  <project name>
```

## Deploy to Github page

```bash
 - switch to gh-pages branch
 - merge main to gh-pages branch
 - update angular.json to add baseHref property 
 - ng build --project=<project folder> --output-path docs/<project folder>
  - copy index.html to 404.html
git add .
git push
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
