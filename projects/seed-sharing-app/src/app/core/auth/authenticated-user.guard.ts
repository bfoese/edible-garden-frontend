import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {
  EgAuthenticatedUserGuard,
  EgAuthFacadeService
} from '@eg/common/src/eg/auth';

import SeedNav from '../../service/navigation/seed-nav.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUserGuard extends EgAuthenticatedUserGuard {
  public static NAV_EXTRA_REDIRECT_URL = 'redirect';

  constructor(
    protected authService: EgAuthFacadeService,
    private router: Router
  ) {
    super(authService);
  }

  protected redirectToSignin(redirectUrl: string | undefined): void {
    const navExtras: { [k: string]: any } = {};
    navExtras[AuthenticatedUserGuard.NAV_EXTRA_REDIRECT_URL] = redirectUrl;
    void this.router.navigate([SeedNav.SignIn.full], {
      state: navExtras,
      skipLocationChange: true // login page should not appear in browser history
    } as NavigationExtras);
  }
}
