export interface ChangePasswordFormData {
  /**
   * Username is in fact not needed but will be added as a hidden field, because the browser password managers needs it to associate the new password with the username.
   * @see https://www.chromium.org/developers/design-documents/create-amazing-password-forms
   */
  username: string;
  password: string;
  confirmPassword: string;
  token: string;
}
