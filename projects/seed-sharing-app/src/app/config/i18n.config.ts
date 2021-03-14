
import { EgI18nConfig } from '@eg/common/src/eg/i18n';

import { environment } from '../../environments/environment';

export const SEED_I18N_CONFIG: EgI18nConfig = {
  availableLocales: environment.locale?.available,
  defaultLocale: environment.locale?.default,
  localeAppPathPattern: /^\/[A-Za-z]{2}\//
};
