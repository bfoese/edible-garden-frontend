import { MockUserCredentialsFactory } from '../data/mock-user-credentials.factory';

describe('[Critical Path] Sign Up Process', () => {
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

  before(() => {
    cy.visit('/auth/signup');
  });

  beforeEach(() => {
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

  it('Sign up page contains relevant info', function () {
    cy.visit('/auth/signup');
    cy.url().should('include', '/auth/signup');

    cy.get('h1').within(($h1) => {
      cy.contains('Krautland Keimgut');
    });

    cy.get('h2').within(($h2) => {
      cy.contains(/Sign up|Registrieren/g);
    });
  });

  it('Accessable link to sign in page', function () {
    cy.visit('/auth/signup');
    const signinPath = '/auth/signin';
    cy.get(`a[href="/${Cypress.env('locale')}${signinPath}"]`)
      .click()
      .then(() => {
        cy.url().should('include', signinPath);
      });

    it('contains page title and headlines', () => {
      cy.get('h1').within(($h1) => {
        cy.contains('Krautland Keimgut');
      });

      cy.get('h2').within(($h2) => {
        cy.contains(/Sign in|Anmelden/g);
      });
    });
  });

  it('Sign in page contains relevant info', function () {
    cy.visit('/auth/signin');
    cy.url().should('include', '/auth/signin');

    cy.get('h1').within(($h1) => {
      cy.contains('Krautland Keimgut');
    });

    cy.get('h2').within(($h2) => {
      cy.contains(/Sign in|Anmelden/g);
    });
  });

  it('Accessable link to sign up page', function () {
    cy.visit('/auth/signin');
    const signupPath = '/auth/signup';
    cy.get(`a[href="/${Cypress.env('locale')}${signupPath}"]`)
      .click()
      .then(() => {
        cy.url().should('include', signupPath);
      });
  });

  it('User can sign up', () => {
    cy.visit('/auth/signup');
    cy.get('@signupForm')
      .within(($form) => {
        cy.get('@submitBtn').should('be.disabled');
        cy.get('@inputUsername').type(signupUser.username);
        cy.get('@submitBtn').should('be.disabled');
        cy.get('@inputEmail').type(signupUser.email);
        cy.get('@submitBtn').should('be.disabled');
        cy.get('@inputPassword').type(signupUser.password);
        cy.get('@submitBtn').should('be.disabled');
        cy.get('@inputConfirmPassword').type(signupUser.password);
        cy.get('@submitBtn').should('not.be.disabled');

        cy.intercept('POST', '/edible-garden/auth/signup').as('signup-request');
      })
      .submit()
      .wait('@signup-request')
      .should((obj) => {
        const request = (obj as any).request;
        // expect all input values to be sent as given
        expect(request.body.email).to.equal(signupUser.email);
        expect(request.body.username).to.equal(signupUser.username);
        expect(request.body.password).to.equal(signupUser.password);

        // expect preferred locale which is not a visible form input
        expect(request.body.preferredLocale).to.equal(Cypress.env('locale'));

        // expect visible info about email verification link being sent
        cy.url().should('include', '/signin?emailVerificationLinkSent=true');
        cy.get('[data-cy="msg-email-verif-link-sent"]').should('be.visible');
      });
  });

  it("User can't sign in before email address has been validated", () => {
    cy.visitSignin();
    cy.get('@signinForm')
      .within(($form) => {
        cy.get('@inputUsername').type(signupUser.email);
        cy.get('@inputPassword').type(signupUser.password);
      })
      .submit();
    // sign in not allowed
    cy.url().should('include', '/auth/signin');
    cy.get('[data-cy="msg-email-verif-required"]').should('be.visible');
  });

  it('User received email with valid email verification link', function () {
    cy.spyUsersEmailInbox(signupUser.email, signupDate, 1).then((emails) => {
      // email query is done by date and there is no possibility to narrow
      // further by providing timestamp (no backend support), but since we generate a random email address for each new user, we can expect to receive exactly one email
      expect(emails?.length).to.equal(1);
      const welcomeEmail = emails[0];

      // make sure the E2E service fetched the right email
      expect(welcomeEmail.to).to.be.equal(signupUser.email);
      const emailText = welcomeEmail.body;
      expect(emailText?.length).to.be.greaterThan(0);
      cy.extractAccountActionUrlFromEmail(emailText!).then(
        (verifyEmailAddressLink: string) => {
          // first call to verifyEmailAddressLink
          expect(verifyEmailAddressLink).not.to.be.undefined;

          if (!verifyEmailAddressLink) {
            this.skip(); // following tests would require the link
          }
          cy.verifyEmailAddress(verifyEmailAddressLink, true);

          cy.log(
            'Allow clicking email verification link multiple times without error, to not confuse the user'
          );
          cy.verifyEmailAddress(verifyEmailAddressLink, true);
        }
      );
    });
  });

  it('User can sign in with verified email address', () => {
    cy.visitSignin();

    cy.get('@signinForm')
      .within(($form) => {
        cy.get('@submitBtn').should('be.disabled');
        cy.get('@inputUsername').type(signupUser.email);
        cy.get('@submitBtn').should('be.disabled');
        cy.get('@inputPassword').type(signupUser.password);
        cy.get('@submitBtn').should('not.be.disabled');
      })
      .submit();
    cy.verifySuccessfulSigninAndSignout();
  });
});
