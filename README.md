# PCI NGX CONNECTABLES
An angular 4+ solution providing reusable components to render SOURCE and TARGET boxes and map them with Arrows.
One to one, One to Many, Many to Many mappings are allowed. 
Specially created to fulfill a requirement but wanted to help others with similar requirements as such implementations are rare for angular.

[[https://github.com/pyramidsoftwaresolutions/pci-ngx-connectables/pci-ngx-connectables.png|alt=pci-ngx-connectables]]

## Dependency javascrip libraries used from
https://anseki.github.io/leader-line/#outline
https://anseki.github.io/plain-draggable/

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.3.

## Example implementation
Example sample implementation is given in the app.component.html and ts.
Reusable components available in the folder "pci-connectables".

## Steps you should follow
1. Don't miss to include the "assets/pci-connectables" folder containing JS libraries and css
2. Don't miss to include the files in "angular.json" as done in the application.

## How to use
<div class="content">
  <pci-connectables-container 
  [sourceItems]="sourceItems"
  [targetItems]="targetItems"
  [mappedItems]="mappedItems"
  [sourceSelectionMode]="'Single'"
  [targetSelectionMode]="'Single'"></pci-connectables-container>
</div>

sourceItems: ConnectableItemModel[] = [];
targetItems: ConnectableItemModel[] = [];
mappedItems: MappedSourceTargetItem[] = [];

## ConnectableItemModel
- data: any data to represent a box item in the source or target list
- displayFieldName: optional to below. if provided, will render the item text from data[displayFieldName]
- displayText: option to above. if provided, will render the text in the item box
- color: a string which represents HTML color name or code. this will be used to render the arrow color for the item. otherwise default.

##MappedSourceTargetItem
- source: A ConnectableItemModel that will represent the mapping with target. this will initialize the connector line on load of view
- target: A ConnectableItemModel that will represent the mapping with source. this will initialize the connector line on load of view

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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
