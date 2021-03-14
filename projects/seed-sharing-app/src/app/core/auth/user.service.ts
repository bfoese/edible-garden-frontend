import { Injectable, Optional, SkipSelf } from '@angular/core';
import { EgAuthFacadeService } from '@eg/common/src/eg/auth';
import { SingletonInjectorRuntimeGuard } from '@eg/common/src/lib/ng/guards/singleton-injector-runtime-guard';
import { AuthenticationService } from '@eg/edible-garden-api/src/lib/rest-api/gen/services';
import { UserDto } from '@eg/edible-garden-api/src/public-api';

import { BehaviorSubject } from 'rxjs';

/**
 * Supposed to be a singleton service within the application.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private authFacadeService: EgAuthFacadeService,
    private authenticationService: AuthenticationService,
    @Optional() @SkipSelf() parent?: UserService
  ) {
    SingletonInjectorRuntimeGuard.guardSingletonInjector(parent);
  }

  public getUser$(): BehaviorSubject<UserDto | undefined> {
    return this.authFacadeService.user$;
  }
}
