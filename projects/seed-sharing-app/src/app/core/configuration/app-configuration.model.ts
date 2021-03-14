import {
  COUNTRY,
  LANGUAGE,
  LOCALE,
  PRODUCT,
  THEME
} from '@bfoese/eg-ui-models';

import { environment } from 'projects/seed-sharing-app/src/environments/environment';

import { Configuration } from './configuration.model';

export class AppConfiguration extends Configuration<AppConfiguration> {
  public country: COUNTRY | undefined;
  public locale: LOCALE | undefined;
  public language: LANGUAGE | undefined;
  public theme: THEME | undefined;
  public product: PRODUCT | undefined;
  public change?: Partial<AppConfiguration>;

  constructor(appConfiguration?: Partial<AppConfiguration>) {
    super();

    if (appConfiguration) {
      this.update(appConfiguration);
    }
  }

  get langTheme(): string {
    return `${this.locale}_${this.theme}_${this.product}}`;
  }

  public copy(): AppConfiguration {
    const copy = new AppConfiguration();
    copy.update(this);
    return copy;
  }

  public rootUrl(): string {
    // Could add locale etc. in future
    return `${environment.backendBaseUrl}/`;
  }
}
