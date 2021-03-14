import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  RouterStateSnapshot
} from '@angular/router';
import { StringUtils } from '@eg/common/src/lib/utils/string';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EgAuthFacadeService } from './eg-auth-facade.service';

export abstract class EgAuthenticatedUserGuard
  implements CanActivateChild, CanActivate, CanLoad {
  constructor(protected authService: EgAuthFacadeService) {}

  public isSignedIn(): boolean {
    return this.authService.isSignedIn();
  }

  public canActivate(
    route: ActivatedRouteSnapshot | null,
    state: RouterStateSnapshot | null
  ): boolean {
    if (!this.authService.isSignedIn()) {
      this.redirectToSignin(state?.url);
      return false;
    }
    return true;
  }

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isSignedIn()) {
      this.redirectToSignin(state?.url);
      return false;
    }
    return true;
  }

  public canLoad(route: Route): boolean {
    if (!this.authService.isSignedIn()) {
      return false;
    }
    return true;
  }

  /**
   * Can be called to determine if a Link that points to a route which
   * requires authentication should be enabled or disabled based on current
   * authentication state. <br/> The implementation only checks, if we
   * currently have an access token, not if the access token is still valid.
   * This is because when the user clicks on a link which requires
   * authentication and the users access token is already expired, a token
   * refresh call will be performed in the background for silent re-login.
   */
  canActivateLink(): Observable<boolean> {
    return this.authService.accessToken.pipe(
      map((value: string | null) => StringUtils.isNotEmpty(value)),
    );
  }

  protected abstract redirectToSignin(redirectUrl: string | undefined): void;
}
