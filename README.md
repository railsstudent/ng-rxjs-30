# NgRxjs30

This project repeats Wes Bos's JavaScript 30 challenges (https://github.com/wesbos/JavaScript30) in Angular and RxJS.

Challenges:
- Day 1: JavaScript Drum Kit (code: https://github.com/railsstudent/ng-rxjs-30/tree/main/projects/day1-javascript-drum-kit, demo: https://railsstudent.github.io/ng-rxjs-30/day1-javascript-drum-kit/)
- Day 2: Ng and CSS Clock
- Day 3: CSS Variables
- Day 4: Array Cardio Part 1
- Day 5: Flex panel gallery
- Day 6: Ng Type Ahead
- Day 7: Array Cardio Part 2
- Day 8: Ng HTML Canvas
- Day 10: Hold Shift And Check Checkboxes
- Day 11: Custom Video Player
- Day 12: Key Sequence Detection
- Day 13: Slide in on scroll
- Day 15: Local Storage
- Day 16: Mouse Move
- Day 17: Sorted without articles
- Day 18: Adding up times
- Day 19: Webcam fun
- Day 20: Speech detection
- Day 22: Follow along link highlighter
- Day 23: Speech synthesis
- Day 24: Sticky Nav
- Day 26: Stripe follow along navigation
- Day 27: Click and drag
- Day 28: Video speed controller
- Day 29: Countdown timer
- Day 30: Whack a mole

## Development server

Run `ng serve --project=<project name>` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

- Check out gh-pages branch
- Run `./build-doc.sh <project name>` to build the project. The build artifacts will be stored in the `dist/` directory.
- git commit and push gh-pages branch to deploy the project to github page

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
 - copy index.html to 404.html
ng build --project=<project folder> --output-path docs/<project folder>
git add .
git push
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
