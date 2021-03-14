/* tslint:disable */
/* eslint-disable */
export interface SendAccountActionLinkDto {
  email: string;
  purpose: 'VerifyEmail' | 'VerifiyEmailUpdate' | 'ResetPassword' | 'DeleteAccount';
}
