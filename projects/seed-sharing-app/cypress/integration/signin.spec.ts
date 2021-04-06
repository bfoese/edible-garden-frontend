import { MockUserCredentialsFactory } from '../data/mock-user-credentials.factory';

const faker = require('faker');

describe("Sign in page with query params", () => {
  it('email verification response page', () => {
    cy.visit('/auth/signin?emailVerified=true');
    cy.get('[data-cy="msg-email-verification-success"]').should('be.visible');
  });

  it('email verification link sent', () => {
    cy.visit('/auth/signin?emailVerificationLinkSent=true');
    cy.get('[data-cy="msg-email-verif-link-sent"]').should('be.visible');
  });
});

describe('[Edge Cases] Sign In Process', () => {
  beforeEach(() => {
    cy.visitSignin();

    cy.get('form[name="signin"]').as('signinForm');
    cy.get('button[type="submit"]').as('submitBtn');
    cy.get('input[formControlName="username"]').as('inputUsername');
    cy.get('input[formControlName="password"]').as('inputPassword');
  });

  it('allows correcting an initially wrong username', () => {
    cy.get('@signinForm')
      .within(($form) => {
        cy.get('@submitBtn').should('be.disabled');
        cy.get('@inputUsername').type(faker.internet.email());
        cy.get('@submitBtn').should('be.disabled');
        cy.get('@inputPassword').type(MockUserCredentialsFactory.activatedUser().password);
        cy.get('@submitBtn').should('not.be.disabled');
      })
      .submit()
      .within(($form) => {
        cy.get('@submitBtn').should('be.disabled');
        cy.get('[data-cy="form-errors-invalid-credentials"]').should('be.visible');
        cy.get('@inputUsername').clear().type(MockUserCredentialsFactory.activatedUser().username);
        cy.get('[data-cy="form-errors-invalid-credentials"]').should('not.exist');
        cy.get('@submitBtn').should('not.be.disabled');
      })
      .submit();
    cy.verifySuccessfulSigninAndSignout();
  });

  it('allows correcting an initially wrong password', () => {
    cy.get('@signinForm')
      .within(($form) => {
        cy.get('@submitBtn').should('be.disabled');
        cy.get('@inputUsername').type(MockUserCredentialsFactory.activatedUser().username);
        cy.get('@submitBtn').should('be.disabled');
        cy.get('@inputPassword').type(faker.internet.password());
        cy.get('@submitBtn').should('not.be.disabled');
      })
      .submit().within(($form) => {
        cy.get('@submitBtn').should('be.disabled');
        cy.get('[data-cy="form-errors-invalid-credentials"]').should('be.visible');

        cy.get('@inputPassword').clear().type(MockUserCredentialsFactory.activatedUser().password);
        cy.get('[data-cy="form-errors-invalid-credentials"]').should('not.exist');
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
