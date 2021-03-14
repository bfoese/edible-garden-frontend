# EdibleGardenFrontend

## Start

`$ npm install`
`$ npm run start:dev`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the
`dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via
[Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via
[Protractor](http://www.protractortest.org/).


## Notes
### Handling Connection to Backend APi

OpenApi generated a class AppConfiguration having a field "rootUrl". This field
is undefined. OpenApi Generator team suggests, that the rootUrl field should be
overridden before making the first call.

Another option is to have a proxy.conf.json (or multiple for dev/prod) which
would rewrite the URL on the fly based on URL patterns. You can tell
angular.json which proxy.conf.json should be used for normal build and which one
for production build. Solution is described here:
https://stackoverflow.com/a/60601353 What I personally don't like about this
approach: When debugging the frontend, you see the the original URL in Chrome
developer console. It is not transparent that there was an URL rewrite from the
frontend to a different location, this information is only printed out in the
logs.

### NgZorro

Use values of less variables in scss: https://github.com/NG-ZORRO/ng-zorro-antd/discussions/2243#discussioncomment-108865

### Nginx

This project uses Nginx server in production. Main reason is, that a reverse
proxy was needed to access the API server, which is hosted under a different
domain but sends same-site cookies for authentication. At this point, the
production nginx configuration does not use SSL. In production SSL is provided
by HEROKU.

Reverse Proxy: https://www.journaldev.com/27234/nginx-reverse-proxy-node-angular
Subdomain Handling Heroku with Nginx: https://mrvautin.com/enabling-custom-domain-for-saas-application-on-heroku/
Heroku Nginx Docker example: https://github.com/rjoonas/heroku-docker-nginx-example

TODO Brotli: https://github.com/google/ngx_brotli/issues/89#issuecomment-761929582


### Heroku

<ul>
<li>heroku.yaml,app.json and .Procfile are not necessarily needed in this docker container setup.</li>
<li>This  repo https://github.com/rjoonas/heroku-docker-nginx-example has a 'Deploy to Heroku' button which upon click will redirect to Heroku where you just type in a name for the app and everything will be setup based on the source code from the repo. To orchestrate this setup, the file 'app.json' is needed. This is the manifest of a Heroku app.
<ul><li>https://devcenter.heroku.com/articles/setting-up-apps-using-the-heroku-platform-api</li>
<li>https://devcenter.heroku.com/articles/app-json-schema</li></ul></li>
<li>Get Heroku app name as variables: https://stackoverflow.com/questions/38087125/set-host-name-as-an-environment-variable-in-heroku-review-app and https://github.com/heroku/heroku-buildpack-cli</li>
</ul>

### i18n Localization

To be able to use AOT, we use one build per language. The languages to be built
are defined in angular.json. The default 'ng build' statement will create one
app bundle per language in the dist directory of the app. Nginx is configured to
check the preferred language of the browser and to route to that language if
available. If the preferred browser language is not available, a default
language will be selected.

Adding a new language

<ul>
    <li>Add language code mapping in nginx/nginx.conf</li>
    <li>Add language code in location path in nginx/default.conf</li>
    <li>Create i18n/messages.xlf file for that language</li>
    <li>Check in AntdI18nService if the locale for the language is included, if not, check if NgZorro has this locale and add it to the list.</li>
    <li>Update available and default locales in environment.ts files</li>
    <li>Provide an web app manifest.[locale].json for the new language</li>
</ul>

Library i18n example:
https://github.com/michaelhunziker/angular-i18n-library

### SVG

#### ClipPath

In order to scale the SVG to the size of its bounding box, 'objectBoundingBox' must be used:

```html
// objectBoundingBox indicates that SVG should be scaled to size of its bounding
box <clipPath id="mapClipPath" clipPathUnits="objectBoundingBox"></clipPath>
```

But pay attention that 'objectBoundingBox' units requires the SVG coordinates to
be between 0 and 1, because (0,0) represents the top left of the outer bounding
box and (1,1) the bottom right. The clip path must either be within this
coordinate system, which would look like this:

```html
// all coordinates within the path must be between 0 and 1 and viewBox as
presendet
<svg viewBox="0 0 1 1" width="1pt" height="1pt">
  <clipPath id="mapClipPath" clipPathUnits="objectBoundingBox">
    <path d=" M 0.012 0.545 C 0.07 0.38 0.341 0.326 0.506 ..." />
  </clipPath>
</svg>
```

Or the second option, if the path is much bigger and you don't want to use a
graphic tool, you can apply a scale transformation to the paths:

```html
// instead of 300*200 we apply a transform and scale it by x=1/300 and y=1/200

<svg viewBox="0 0 300 200">
  <clipPath id="mapClipPath" clipPathUnits="objectBoundingBox">
    <path
      transform="scale(0.003333, 0.005)"
      d=" M 162.3 216.9 C 162.3 214.5 160.2 212.4 157.8 212.4 C 152.1 212.1 141.9 213 135.6 219.3 C 129.3 225.6 ..."
    />
    <path
      transform="scale(0.003333, 0.005)"
      d=" M 203.7 212.4 C 198 212.1 187.8 213 181.5 219.3 C 175.2 225.6 174.6 235.8 174.6 241.5 C 174.6 243.9 ... "
    />
  </clipPath>
</svg>
```

One problem left at this point: The SVG is being stretched to the size of the
bounding box and does not keep its aspect ratio. Played with
"preserveAspectRatio", but couldn't figure it out yet.

#### Animation

To animate an object along a path, the object to be animated must not be a path
but a simple object like a polygon, circle etc. A path can be converted into a
polygon. Didn't found a way in illustrator, but it can be done via script:
https://stackblitz.com/edit/typescript-ugdczs

https://www.sarasoueidan.com/blog/css-svg-clipping/
https://codepen.io/yshlin/pen/dxGlH

SVG Path Modification via CSS
https://codepen.io/chriscoyier/pen/NRwANp


#### Other SVG related content
Different ways of including SVG, also in combination with second link concerning
the cascade of the different solutions
https://www.mediaevent.de/svg-in-html-seiten/
https://wiki.selfhtml.org/wiki/SVG/Tutorials/Einstieg/SVG_mit_CSS_stylen#XML_vs._CSS

Responsive SVG, which I used as inspiration to create the concave corners
https://codepen.io/ND44/pen/oRReWR

Rotate around own center:
<g transform = "translate(100, 100) rotate(45 $halfOfSvgWidth $halfOfSvgHeight)">


### Angular Specifics

#### Auxiliary Routes

Auxiliary routes must be children to a parent route with path not being ''. They
won't work as children of empty path route. They are isolated within the parent
route. Their matching rule is completely different from standard Angular routing
rule.

```
// URL
/parent/(primaryOutletPath//auxOutletName:auxOutletPath)
https://localhost:4200/en/sharing/(offer//secondary:offer-preview)

// Router Link HTML
[routerLink]="['parentRoutes',{outlets: {outletName:['outletPath', param]}}]"
[routerLink]="[{outlets: {'primary': ['offer'],  'secondary': ['offer-preview']}}]"
// Router Link TS
this.router.navigate(['parentRoutes',{outlets: {outletName:['outletPath', param]}}]

// Remove outlet: specify 'null' in url or router link
 {outletName: null}
```

The ugly URL can be modified by implementing a custom URL serializer which
extends DefaultUrlSerializer. This serializer must be listed in the providers
array of the main app routing module.

```
class CustomUrlSerializer extends DefaultUrlSerializer {}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: UrlSerializer, useClass: CustomUrlSerializer }
  ]
})
export class AppRoutingModule {}
```
