export type NavAuthRelChildPaths = 'signup' | 'signin' | 'request-reset-password' | 'change-password' | 'verify-email';

export default class SeedNav {

  public static readonly SeedSharing = {
    relative: 'sharing',
    full: '/sharing'
  }

  public static readonly Map = {
    relative: 'map',
    full: '/sharing/map'
  }

  public static readonly UserAccount = {
    relative: 'account',
    full: '/sharing/account'
  }

  public static readonly OfferCreate = {
    relative: 'offer',
    full: '/sharing/offer'
  }

  public static readonly OfferPreview = {
    relative: 'offer-preview',
    full: '/sharing/offer-preview'
  };

  public static readonly AccountSettings = {
    relative: 'account-settings',
    full: '/sharing/account-settings',
  }

  public static readonly Authentication = {
    full: '/auth',
    relative: 'auth',
  }

  public static readonly SignIn = {
    relative: 'signin',
    full: '/auth/signin',
  }

  public static readonly SignUp = {
    relative: 'signup',
    full: '/auth/signup'
  }

  public static readonly RequestResetPassword = {
    relative: 'request-reset-password',
    full: '/auth/request-reset-password'
  }

  public static readonly ChangePassword ={
    relative: 'change-password',
    full: '/auth/change-password'
  }

  public static readonly VerifyEmail = {
    relative: 'verify-email',
    full: '/auth/verify-email'
  }
}
