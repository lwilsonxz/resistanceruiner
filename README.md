# Do Math Instead of Fun

A simple tool that assists players of the game, The Resistance I made over the weekend. Works by running Bayesian analysis on given gamestates.

The tool keeps track of probabilities persistently, but does not fully manage gamestates or completely simulate the game.

In other words, users are responsible for inputting and maintaining legal gamestates.

Since I am new to Angular.js, I decided to do my rudimentary UI in Angular. The UI isn't really the point of the project, but as long as I'm making one, I might as well learn something new.

The UI is based originally on the Angular Tour of Heroes tutorial, found here: https://angular.io/tutorial/toh-pt1

The fun stuff is the Bayesian analysis. All the gamestate management and analysis takes place within the game.ts file. If you want to check out the code and the implementation of Bayes' theorem in javascript, this is what you should look at.

# What's next?

There are a few improvements to make to the project yet. First and foremost, a better UI. A running display of the players currently on a mission would be great. Perhaps some sort of visual drag-and-drop teambuilding UI for missions. The details view doesn't actually provide much in the way of information, so putting all that information on interactable UI elements might be good.

Next, the game should generate suggestions for teams. This is easy: you should always send a team of the players with the lowest chance of being spies... except we can't repeat losing teams, and we should favor players who have never been on a losing team. This seemed like a lot of data to store and process, so I wrote it off for later.

User input sanitization. Currently, the program relies on good user input. Even capping the number of fail votes to the number of spies or players on the mission, whichever is lower, would have helped. More broadly, it would be great if the game object could actually properly manage the gamestate, that is prevent illegal moves.

Even more verbose documentation of the math. I tried to be thourough with my comments, but another readthrough of the code in a few weeks time with in-depth explanations of the steps of implementing the theorem would help parsability.

Hosting. It would be cool to actually host the service somewhere, just to show it to my friends. There are a lot of improvements I'd like to make before I would consider that worthwhile.

All in all, this was a fun way to kill a weekend. I mostly focused on the fun part: the math, but I intend to revisit the UI at least a little bit. It was nice to check myself and make sure I actually understood Bayes' theorem, and I have a lot to learn about the MEAN stack, but my first experience with Angular.js left a positive impression.

Automatic documention from CLI as below:

# ResistanceRuiner

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
