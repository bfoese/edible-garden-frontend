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

## Running E2E tests

Run `ng e2e` to execute the end-to-end tests via Cypress

E2E test report: https://bfoese.github.io/edible-garden-frontend/e2e-report.html

### E2E Implementation

E2E is implemented with Cypress. Cypress test runner can be used for free but if
you want to use any of these flags `--ci-build-id, --group, --tag, or
--parallel`, you need to also provide your `--record key` which links the test
runs to your Cypress Dashboard account. Cypress Dashboard is a service that
offers a free plan, but depending on your test strategy you will quickly outrun
the free plan boundaries.

As an alternative to Cypress Dashboard you can integrate third-party reporters
with Cypress. One example is Mochawesome in combination with Mochawesome-Merge
and Mochawesome-Report-Generator, which are used by this repo to automate E2E
testing and report generation. It requires own work though to come anywhere near
the possibilities that Cypress Dashboard offers.

### E2E Strategy
The strategy is to mock as little as possible, preferebly nothing, and instead
perform realistic E2E tests in a deployed staging environment which mirrors the
production environment. Another constraint is to keep things frugal, which means
not to rely on external services which need to be paid.

Since the App workflows include emails being sent to the users which
require user interaction, you need to find a way to cover this as realistic as
possible. The approach for this is the following:

<ul>
<li>Setup new Gmail Account for the sole purpose of Cypress testing the App</li>
<li>Gmail allows you to generate an unlimited number of aliases for you email address (e.g. my-address+somealias@gmail.com) which can be leveraged to sign up an unlimited number of different users</li>
<li>Gmail provides an OAuth protected Gmail API to fetch emails from the inbox via REST. This API can be consumed via Frontend or Backend. The drawback of this approach is the need for manual interaction at least once, to grant permissions by acknowledging the Google OAuth consent screen. One cypress plugin that is making use of the OAuth Gmail API is https://github.com/levz0r/gmail-tester.</li>
<li>Another, I think more flexible, solution is to use plain old IMAP to fetch the emails from the test account. The benefit compared to the OAuth solution is, that you can code the solution and it can be integrated into the CI pipeline without requiring manual interaction to grant permissions in an OAuth consent screen.</li>
</ul>

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


