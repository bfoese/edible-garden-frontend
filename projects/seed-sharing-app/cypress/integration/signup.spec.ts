import { MockUserCredentialsFactory } from '../data/mock-user-credentials.factory';

describe('[Edge Cases] Sign Up Process', () => {
  const baseUrl_e2e_api = Cypress.env('e2e-api-url');

  const signupUser = MockUserCredentialsFactory.createForSignup();
  const signupDate = new Date();

  after(() => {
    const deleteAccountUrl = `${baseUrl_e2e_api}/edible-garden/v1/e2e/auth/account?email=${encodeURIComponent(
      signupUser.email
    )}`;
    cy.request({
      method: 'DELETE',
      url: deleteAccountUrl,
      failOnStatusCode: false
    }).then((response) => cy.log('Deleted user', JSON.stringify(response)));
  });

  before(() => {});

  beforeEach(() => {
    cy.visitSignup();
    cy.url().then((url) => {
      if (url.includes('/auth/signup')) {
        cy.get('form[name="signup"]').as('signupForm');
        cy.get('button[type="submit"]').as('submitBtn');
        cy.get('input[formControlName="username"]').as('inputUsername');
        cy.get('input[formControlName="email"]').as('inputEmail');
        cy.get('input[formControlName="password"]').as('inputPassword');
        cy.get('input[formControlName="confirmPassword"]').as(
          'inputConfirmPassword'
        );
      } else if (url.includes('/auth/signin')) {
        cy.get('form[name="signin"]').as('signinForm');
        cy.get('button[type="submit"]').as('submitBtn');
        cy.get('input[formControlName="username"]').as('inputUsername');
        cy.get('input[formControlName="password"]').as('inputPassword');
      }
    });
  });

  it('Password must match pattern and be confirmed', () => {
    cy.get('@signupForm')
      .within(($form) => {
        cy.get('@inputUsername').type(signupUser.username);
        cy.get('@inputEmail').type(signupUser.email);

        const invalidPassword = 'invalidPasswordPattern';
        cy.get('@inputPassword').type(invalidPassword);
        cy.get('[data-cy="form-errors-regex"]').should('be.visible');
        cy.get('@inputConfirmPassword').type(invalidPassword);
        cy.get('@submitBtn').should('be.disabled'); // password not fulfilling required pattern

        cy.get('@submitBtn').click({ force: true });
        cy.url().should('include', '/auth/signup');

        cy.get('@inputPassword').clear().type(signupUser.password);
        cy.get('[data-cy="form-errors-regex"]').should('not.exist');
        cy.get('@submitBtn').should('be.disabled'); // confirm password not matching
        cy.get('@inputConfirmPassword')
          .clear()
          .type(`${signupUser.password}+random`);
        cy.get('[data-cy="form-errors-invalid-confirm"]').should('be.visible');
        cy.get('@submitBtn').should('be.disabled'); // confirm password not matching

        cy.get('@inputConfirmPassword').clear().type(signupUser.password);
        cy.get('[data-cy="form-errors-invalid-confirm"]').should('not.exist');
        cy.get('@submitBtn').should('not.be.disabled');
      })
      .submit()
      .then(() => {
        // expect visible info about email verification link being sent
        cy.url().should('include', '/signin?emailVerificationLinkSent=true');
      });
  });

  it('The user tries to sign up a second time', () => {
    cy.get('@signupForm')
      .within(($form) => {
        const newUserName = 'foobar';
        cy.get('@inputUsername').type(newUserName);
        cy.get('@inputEmail').type(signupUser.email);
        cy.get('@inputPassword').type(signupUser.password);
        cy.get('@inputConfirmPassword').type(signupUser.password);

        cy.intercept('POST', '/edible-garden/auth/signup').as(
          'duplicate-signup-request'
        );
      })
      .submit()
      .wait('@duplicate-signup-request')
      .should((obj) => {
        const response = (obj as any).response;
        expect(response.statusCode).to.equal(400);

        if (response.statusCode !== 400) {
          cy.log('Duplicate Signup - unexpected success', JSON.stringify(obj));
        }
        expect(response.body.message).to.contain(
          '[Error 2001] ActionDeniedConsultEmailAccount'
        );

        cy.url().should('include', '/signin?emailVerificationLinkSent=true');

        cy.spyUsersEmailInbox(signupUser.email, signupDate, 2).then(
          (emails: string[]) => {
            // user should have received two emails: email verification email and account reminder
            expect(emails && emails.length).to.equal(2);


            let accountReminderEmail: any;
            let verifyAddressEmail: any;

            if ((emails[0] as any).date < (emails[1] as any).date) {
              verifyAddressEmail = emails[0];
              accountReminderEmail = emails[1];
            } else {
              verifyAddressEmail = emails[1];
              accountReminderEmail = emails[0];
            }

            if (Cypress.env('locale') === 'en') {
              expect(accountReminderEmail.subject).to.contain(
                'Your account signup'
              );
            }
            // account reminder email should not have another link to verify email address
            cy.extractAccountActionUrlFromEmail(accountReminderEmail).then(
              (link) => {
                expect(link).to.be.undefined;
              }
            );
            cy.extractAccountActionUrlFromEmail(verifyAddressEmail).then(
              (link) => {
                cy.verifyEmailAddress(link, true);
                if (!link) {
                  cy.task('log', `Could not extract action link from ${JSON.stringify(verifyAddressEmail)}`)
                }
              }
            );
          }
        );
      });
  });
});
