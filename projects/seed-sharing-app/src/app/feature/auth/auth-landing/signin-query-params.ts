/***
 * Query parameters from known by the application
 */
export interface SigninQueryParams {

  passwordChanged?: 'true';

  /**
   * Used for sign up URL to indicate that activating the user account failed
   * due to an invalid token. The page will suggest the user to sign up again.
   */
  invalidActivationToken?: 'true';

  /**
   * Used for sign in URL to indicate that the user email address was verified
   * and signin is now possible.
   */
  emailVerified?: 'true' | 'false';

  emailVerificationLinkSent?: 'true';
}
