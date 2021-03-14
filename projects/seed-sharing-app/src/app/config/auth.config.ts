import { EgAuthConfigParams } from '@eg/common/src/eg/auth';

import { environment } from '../../environments/environment';

export const SEED_AUTH_CONFIG: EgAuthConfigParams = {
  authHeaderUris: environment.authHeaderWhitelist,
};
