import { activeUser } from '../data/users';

const faker = require('faker');

describe("Check 'Sign In' UI assumptions", () => {
  it('contains page title and headlines', () => {
    cy.visit('/auth/signin');
    cy.url().should('include', '/auth/signin');

    cy.get('h1').within(($h1) => {
      cy.contains('Krautland Keimgut');
    });

    cy.get('h2').within(($h2) => {
      cy.contains(/Sign in|Anmelden/g);
    });
  });
});

describe('Sign In', () => {
  beforeEach(() => {
    cy.visit('/auth/signin');

    cy.get('form[name="signin"]').as('signinForm');
    cy.get('button[type="submit"]').as('submitBtn');
    cy.get('input[formControlName="username"]').as('inputUsername');
    cy.get('input[formControlName="password"]').as('inputPassword');
  });

  it('allows sign in with username or email and valid password', () => {
    [activeUser.username, activeUser.email].forEach(
      (usernameOrEmail: string) => {
        cy.visit('/auth/signin');
        cy.url().should('include', '/auth/signin');

        cy.get('@signinForm')
          .within(($form) => {
            cy.get('@submitBtn').should('be.disabled');
            cy.get('@inputUsername').type(usernameOrEmail);
            cy.get('@submitBtn').should('be.disabled');
            cy.get('@inputPassword').type(activeUser.password);
            cy.get('@submitBtn').should('not.be.disabled');
          })
          .submit();
        cy.verifySuccessfulSigninAndSignout();
      }
    );
  });

  it('allows correcting an initially wrong username', () => {
    cy.visit('/auth/signin');

    cy.get('@signinForm')
      .within(($form) => {
        cy.get('@submitBtn').should('be.disabled');
        cy.get('@inputUsername').type(faker.internet.email());
        cy.get('@submitBtn').should('be.disabled');
        cy.get('@inputPassword').type(activeUser.password);
        cy.get('@submitBtn').should('not.be.disabled');
      })
      .submit()
      .within(($form) => {
        cy.get('@submitBtn').should('be.disabled');
        cy.contains('Invalid username or password');

        cy.get('@inputUsername').clear().type(activeUser.username);
        cy.get('@submitBtn').should('not.be.disabled');
      })
      .submit();
    cy.verifySuccessfulSigninAndSignout();
  });

  it('allows correcting an initially wrong password', () => {
    cy.visit('/auth/signin');

    cy.get('@signinForm')
      .within(($form) => {
        cy.get('@submitBtn').should('be.disabled');
        cy.get('@inputUsername').type(activeUser.username);
        cy.get('@submitBtn').should('be.disabled');
        cy.get('@inputPassword').type(faker.internet.password());
        cy.get('@submitBtn').should('not.be.disabled');
      })
      .submit()
      .within(($form) => {
        cy.get('@submitBtn').should('be.disabled');
        cy.contains('Invalid username or password');

        cy.get('@inputPassword').clear().type(activeUser.password);
        cy.get('@submitBtn').should('not.be.disabled');
      })
      .submit();
    cy.verifySuccessfulSigninAndSignout();
  });

  it("has a 'forgot password' link and redirects to that page", () => {
    const resetPasswordPath = '/auth/request-reset-password';

    cy.get(`a[href="/${Cypress.env('locale')}${resetPasswordPath}"]`)
      .click()
      .then(() => {
        cy.url().should('include', resetPasswordPath);
      });
  });

  it("has a 'sign up' link and redirects to that page", () => {
    const signupPath = '/auth/signup';
    cy.get(`a[href="/${Cypress.env('locale')}${signupPath}"]`)
      .click()
      .then(() => {
        cy.url().should('include', signupPath);
      });
  });

  it('Sign in with Google', () => {
    cy.window().then((win) => {
      cy.spy(win, 'open').as('googleSigninWindow');
      cy.get('button[aria-label="Sign in with Google"]')
        .click()
        .then(() => {
          cy.get('@googleSigninWindow').should('be.called');
        });
    });
  });
});
