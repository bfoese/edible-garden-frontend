import { SeedEnvironment } from './seed-environment';

export const environment = {
  production: true, // yes, should be true for QA. Is used by Angular
  apiRootUrlEdibleGarden: '', // needs to be empty so that we generate relative URLs: we proxy these calls with nginx
  backendBaseUrl: '', // needs to be empty so that we generate relative URLs: we proxy these calls with nginx
  authHeaderWhitelist: ['/edible-garden/'], // just the path because of nginx proxy
  thirdPartyAuthBaseUrl: 'https://edible-garden-backend.herokuapp.com',
  frontendBaseUrl: 'https://edible-garden.herokuapp.com',

  locale: {
    default: 'en',
    available: ['en', 'de']
  }
} as SeedEnvironment;
