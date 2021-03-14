# EgUiComponents

This library was generated with [Angular
CLI](https://github.com/angular/angular-cli) version 11.0.5.

## Code scaffolding

Run `ng generate component component-name --project eg-ui-components` to
generate a new component. You can also use `ng generate
directive|pipe|service|class|guard|interface|enum|module --project
eg-ui-components`.
> Note: Don't forget to add `--project eg-ui-components` or else it will be
> added to the default project in your `angular.json` file.

## Build

Run `ng build eg-ui-components` to build the project. The build artifacts will
be stored in the `dist/` directory.

## Publishing

After building your library with `ng build eg-ui-components`, go to the dist
folder `cd dist/eg-ui-components` and run `npm publish`.

## Running unit tests

Run `ng test eg-ui-components` to execute the unit tests via
[Karma](https://karma-runner.github.io).

## Component Customization

Components should use CSS custom properties whenever possible (there are still
selectors, where custom properties don't work!), because they reduce the need to
use ::ng-deep. Each component should document the used custom properties in the
top of the stylesheet.

### Custom Property overrides from JavaScript

It is possible to read and modify custom properties from JavaScript. It would be
possible to modify them from within the component code.

```bash
// Override a property that is used within the stylesheet of the component host
public constructor(private hostElemRef: ElementRef) {

    // read a property that is used within the stylesheet of the component host
    const styles = getComputedStyle(this.hostElemRef.nativeElement).getPropertyValue('--eg-fixed-height');

    // write a property that is used within the stylesheet of the component host
    this.hostElemRef.nativeElement.style.setProperty('--eg-fixed-height', '100%');
}
```

BUT it would be more flexible to override the properties of a component from
CSS, because the JavaScript API has the major limitation that the value of a
property is beaing read at one point in time and it will be computed for this
exact moment. You have to keep in mind, that custom properties are of dynamic
nature: they can be overridden based on media queries so they could change based
on window size style classes which have been applied dynamically due to
application state changes. At this point my understanding from the JavaScript
API is, that the values are not given by reference but by value. When I read a
value with the API, the type is a string/number, not a reference to the custom
property. It is not possible to hand over a custom property reference from
outside to this libarary you can only hand over values at one point in time. So,
the JavaScript API should only be used to provide values which do not change
frequently or even worse frequently due to different parameters like screen size
or application logic.

### Custom Property overrides from CSS

A better approach to override the styling of the components within the library
from outside is to provide custom properties via CSS. One example to highlight
the process:


You create a library component and use custom properties within the library
stylesheets. Be aware that when you assign a value to a custom property in the
library component stylesheet, it is not possible anymore to override the value
from outside.

```bash
// Library component stylesheet

:host {
    // you can provide fallback values as demonstrated here
    background-color: var(--color-100, red);
}
```

Outside of the library you create a component which is using a library
component. The custom properties used by the library component can be provided
via the CSS file of the outside component, as highlighted here:

```bash
// External component HTML which uses the library component
<external-component>
    <library-component></library-component>
<external-component>

// External component SCSS
:host {
    library-component {
        --color-100: blue;

        @include breakpoint(MD) {
            --color-100: green;
        }
    }
}
```

In this example the custom property for the color will change with the
breakpoint and the change is reflected in the library component!
