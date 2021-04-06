const faker = require('faker');

describe('Verify email', () => {
  beforeEach(() => {
    cy.visit('/auth/verify-email');
  });

  it('the email verification response page displays a hint about the address being verified', () => {
    cy.visit('/auth/verify-email?invalidToken=true');
    cy.get('[data-cy="msg-email-verification-failed"]').should('be.visible');
  });
});
