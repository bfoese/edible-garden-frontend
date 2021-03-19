import { EgAuthConfigParams } from '@eg/common/src/eg/auth';
import { AuthenticationService } from '@eg/edible-garden-api/src/public-api';

import { environment } from '../../environments/environment';

export const SEED_AUTH_CONFIG: EgAuthConfigParams = {
  authHeaderUris: environment.authHeaderWhitelist,
  googleSigninUri: `${environment.apiRootUrlEdibleGarden}${AuthenticationService.AuthenticationControllerSigninWithGooglePath}`
};
