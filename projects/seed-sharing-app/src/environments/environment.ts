// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { SeedEnvironment } from './seed-environment';

export const environment = {
  production: false,
  apiRootUrlEdibleGarden: 'https://localhost:3001',
  backendBaseUrl: 'https://localhost:3001',
  thirdPartyAuthBaseUrl: 'https://localhost:3001',
  frontendBaseUrl: 'https://localhost:4200',

  authHeaderWhitelist: ['https://localhost:3001', '/edible-garden/'],
  locale: {
    default: 'en',
    available: ['en', 'de']
  },
} as SeedEnvironment;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error'; // Included with Angular CLI.
