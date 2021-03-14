# EgIcons

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## Code scaffolding

Run `ng generate component component-name --project eg-ui-dynamic-icons` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project eg-ui-dynamic-icons`.
> Note: Don't forget to add `--project eg-ui-dynamic-icons` or else it will be added to the default project in your `angular.json` file.

## Build

Run `npm run icons:gen` to generate the icon files based on icons currently
contained in projects asset directory.

## Customize SVG Optimization

The SVG files can be optimized which is recommended to keep them as small as
possible which will benefit the site performance. The svg-to-ts lib has multiple
options to customize the optimization process. Study the source code to get an
overview of possible options:

https://github.com/kreuzerk/svg-to-ts/blob/master/src/lib/options/default-options.ts

Considerations:
- For CSS animations and SVG styling the IDs inside the SVG files must not be stripped out
- width/height of the SVG will be stripped out so that the component can define them to be 100% for responsive icons
