import { Injectable, Optional, SkipSelf } from '@angular/core';
import { EgI18nService } from '@eg/common/src/eg/i18n';
import { SingletonInjectorRuntimeGuard } from '@eg/common/src/lib/ng/guards/singleton-injector-runtime-guard';
import {
  PatchSeedSharingAccountDto,
  SeedSharingAccountDto,
  SeedSharingAccountService
} from '@eg/edible-garden-api/src/public-api';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { EgAuthFacadeService } from '../../auth/lib/eg-auth-facade.service';

/**
 * Supposed to be a singleton service within the application.
 */
@Injectable({
  providedIn: 'root'
})
export class EgAccountFacadeService {

  constructor(
    private readonly egAuthFacadeService: EgAuthFacadeService,
    private readonly egI18nService: EgI18nService,
    private readonly seedSharingAccountService: SeedSharingAccountService,
    @Optional() @SkipSelf() parent?: EgAccountFacadeService,
  ) {
    SingletonInjectorRuntimeGuard.guardSingletonInjector(parent);
  }

  public savePreferredLocaleForUser(
    preferredLocale: string
  ): Observable<boolean> {
    if (this.egAuthFacadeService.isSignedIn()) {
      const patchValues = {
        preferredLocale: preferredLocale
      } as PatchSeedSharingAccountDto;

      return this.seedSharingAccountService
        .seedSharingAccountControllerPatchSettings({ body: patchValues })
        .pipe(
          map(
            (dto: SeedSharingAccountDto) =>
              dto?.preferredLocale === preferredLocale
          )
        );
    }
    return of(false);
  }

  public saveCurrentLocaleAsPreferredLocaleForUser(): Observable<boolean> {
    const currentLocale = this.egI18nService.getCurrentLocale();
    return this.savePreferredLocaleForUser(currentLocale);
  }
}
