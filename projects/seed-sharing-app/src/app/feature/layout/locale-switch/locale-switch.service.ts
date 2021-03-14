import { Injectable } from '@angular/core';
import { EgAccountFacadeService } from '@eg/common/src/eg/account/lib/eg-account-facade.service';
import { EgI18nService } from '@eg/common/src/eg/i18n';

import { finalize } from 'rxjs/operators';

/**
 * Supposed to be a singleton service within the application.
 */
@Injectable()
export class LocaleSwitchService {
  constructor(
    public readonly i18nService: EgI18nService,
    private egAccountFacadeService: EgAccountFacadeService
  ) {}

  public changePreferredLocale(preferredLocale: string): void {
    if (preferredLocale) {
      // i18nService will route to a different application instance, so the current one will be destroyed.
      this.egAccountFacadeService
        .savePreferredLocaleForUser(preferredLocale)
        .pipe(finalize(() => this.i18nService.switchLocale(preferredLocale)))
        .subscribe(() => {});
    }
  }
}
