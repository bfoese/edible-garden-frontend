// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

export { }; // needed for declare global

declare global {
  namespace Cypress {
    interface Chainable {
      verifySuccessfulSigninAndSignout(): typeof verifySuccessfulSigninAndSignout;
      extractAccountActionUrlFromEmail(
        emailText: string | undefined
      ): Chainable;

      visitSignin(): Chainable;
      visitSignup(): Chainable;

      spyUsersEmailInbox(emailAdress: string, since: Date, exptectedNumber: number): Chainable;

      verifyEmailAddress(emailVerificationLink: string, expectSuccess: boolean): Chainable;

      baseUrlE2EApi(): Chainable;
    }
  }
}

Cypress.Commands.add('baseUrlE2EApi', () => {
  return cy.wrap(Cypress.env('e2e-api-url'));
});

Cypress.Commands.add('visitSignin', () => {
  return cy.visit('/auth/signin');
});

Cypress.Commands.add('visitSignup', () => {
  return cy.visit('/auth/signup');
});


Cypress.Commands.add(
  'verifySuccessfulSigninAndSignout',
  verifySuccessfulSigninAndSignout
);

Cypress.Commands.add('verifyEmailAddress', (emailVerificationLink: string, expectSuccess: boolean) => {
  cy.request({
    url: emailVerificationLink,
    followRedirect: false
  }).then((response) => {
    expect(response.status).to.eq(302);

    if (expectSuccess) {
      expect(response.redirectedToUrl).to.contain(
        '/auth/signin?emailVerified=true'
      );
    } else {
      expect(response.redirectedToUrl).not.to.contain(
        '/auth/signin?emailVerified=true'
      );
    }
  });
});

Cypress.Commands.add(
  'spyUsersEmailInbox',
  (emailAdress: string, since: Date, expectedNumber: number) => {

    const dateSince = since.toISOString().substring(0, 10); // YYYY-MM-DD - Backend does not support time/timezone
    const fetchEmailsUrl = `${Cypress.env('e2e-api-url')}/edible-garden/v1/e2e/auth/emails?recipientEmail=${encodeURIComponent(
      emailAdress
    )}&since=${dateSince}`;

    let attempt = 0;
    function requestWithRetry() {
      ++attempt;
      cy.request({
        url: fetchEmailsUrl,
        failOnStatusCode: false
      }).then((response) => {
        const emails = typeof response.body === 'object' ? response.body : undefined ;
        if (!emails || emails.length !== expectedNumber) {
          if (attempt === 5) throw new Error('Succeeding spies into email inbox did not return expected number of emails')
          else {
            cy.wait(5000);
            return requestWithRetry();
          }
        }
        return cy.wrap(response.body);
      });
    }
    return requestWithRetry();
  }
);

Cypress.Commands.add(
  'extractAccountActionUrlFromEmail',
  (emailText: string) => {
    if (emailText) {
      // This pattern matches the beginning of the link including protocol,
      // domain & port but the full token is not matched. At this point there is
      // only one link contained in the email but this might change. Would be
      // better fo find the link by ID/class. First try did not work:
      // investigate later. Basic idea is to create a DOM model from the email
      // text and query the desired link by ID:
      // const doc = new DOMParser().parseFromString(`<div>${emailText}</div>`, 'text/html');
      // const link = doc.body.querySelector("#accountActionLink");
      const regexHtmlLink = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

      const match = emailText ? regexHtmlLink.exec(emailText) : undefined;

      const matchedHtmlLink = match && match.length > 0 ? match[0] : undefined;
      if (matchedHtmlLink) {
        const linkIndexStart = emailText.indexOf(matchedHtmlLink);
        const linkIndexEnd = emailText.indexOf('"', linkIndexStart);

        // At the end we need to replace some encodings to be able to call the
        // link with Cypress. To see what the link of the email looks like
        // encoded: open the mail in Gmail > Choose 'Mehr' > 'Original anzeigen'.
        // This slightly differs from the JSON result when calling the API.
        return cy.wrap(
          emailText
            .substr(linkIndexStart, linkIndexEnd - linkIndexStart)
            .replace(/(=\r\n)+/g, '')
            .replace(/(=3D)+/g, '=')
            .replace(/(&#x3D;)+/g, '=')
        );
      }
    }
    return cy.wrap(undefined);
  }
);

function verifySuccessfulSigninAndSignout(): void {
  cy.url().should('include', '/sharing/map');
  cy.get('nav[aria-label="Main"]').within(($headerNav) => {
    cy.get('a[aria-label="Toggle sidebar"]').click();
  });

  cy.get('nav[aria-label="Sidebar"]').within(($sidebar) => {
    cy.contains('Profile').should('be.visible');
    cy.get('Sign in').should('not.exist');
    cy.contains('Logout').should('be.visible').click();
    cy.contains('Sign in').should('be.visible');
    cy.get('Logout').should('not.exist');
  });
}
