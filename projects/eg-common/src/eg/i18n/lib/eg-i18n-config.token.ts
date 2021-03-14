import { InjectionToken } from '@angular/core';

import { EgI18nConfig } from './eg-i18n.config';

export const EG_I18N_CONFIG = new InjectionToken<EgI18nConfig>(
  'eg.i18n.config'
);
