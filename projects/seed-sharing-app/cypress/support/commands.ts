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

declare namespace Cypress {
  interface Chainable<Subject = any> {
    verifySuccessfulSigninAndSignout(): typeof verifySuccessfulSigninAndSignout;
  }
}

function verifySuccessfulSigninAndSignout(): void {

    cy.url().should('include','/sharing/map');
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

Cypress.Commands.add("verifySuccessfulSigninAndSignout", verifySuccessfulSigninAndSignout);
