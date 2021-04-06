// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './auth.commands';

import { CypressMxReport } from '@bfoese/cypress-mx-report/dist/support';

const addContext = require('mochawesome/addContext');

CypressMxReport.includeMedia(Cypress);

// add context info about test environment
Cypress.on('test:after:run', (test, runnable) => {
  addContext(
    { test },
    {
      title: 'browser',
      value: `${Cypress.browser.displayName}${Cypress.browser.majorVersion} (${
        Cypress.browser.isHeadless ? 'headless' : 'headed'
      })`
    }
  );
  addContext(
    { test },
    {
      title: 'viewport',
      value: `${Cypress.config('viewportWidth') ?? '?'}x${
        Cypress.config('viewportHeight') ?? '?'
      }`
    }
  );

  const locale = Cypress.env('locale');
  if (locale) {
    addContext({ test }, { title: 'locale', value: locale });
  }
});
