import { InjectionToken } from '@angular/core';
import { AuthenticationService } from '@eg/edible-garden-api/src/public-api';

export const EG_API_AUTH_SERVICE = new InjectionToken<AuthenticationService>(
  'eg.api-auth.service'
);
