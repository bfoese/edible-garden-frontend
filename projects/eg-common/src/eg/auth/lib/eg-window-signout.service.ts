import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { SingletonInjectorRuntimeGuard } from '@eg/common/src/lib/ng/guards/singleton-injector-runtime-guard';
import { AuthenticationService } from '@eg/edible-garden-api/src/public-api';

import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

/**
 * Supposed to be a singleton service within the application.
 */
@Injectable({
  providedIn: 'root'
})
export class EgWindowSignoutService {
  private static readonly LOCAL_STORAGE_LOGOUT_INDICATOR = 'eg-window-signout';

  private isLogoutEventSource = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    @Optional() @SkipSelf() parent?: EgWindowSignoutService
  ) {
    SingletonInjectorRuntimeGuard.guardSingletonInjector(parent);

    if (window.addEventListener) {
      window.addEventListener('storage', this.logoutEventCallback, false);
    }
  }

  public signOut(): Observable<void> {
    return this.signOutImpl();
  }

  private signOutImpl(opts?: {
    skipSignoutOtherWindowTabs: boolean;
  }): Observable<void> {
    const stream = this.authenticationService
      .authenticationControllerSignout()
      .pipe(share());

    stream.subscribe(() => {
        if (!opts || !opts.skipSignoutOtherWindowTabs) {
          this.signoutAllTabsInWindow();
        }
        this.navigateToAppRoot();
    });
    return stream;
  }

  private logoutEventCallback = (): void => {
    const value = localStorage.getItem(
      EgWindowSignoutService.LOCAL_STORAGE_LOGOUT_INDICATOR
    );
    if (value) {
      // TODO also check the user name from the value: the user could have
      // logged in with different accounts and only the account he requested
      // logout for should be logged out in all tabs

      if (this.isLogoutEventSource) {
        // the event source is already logged out, we just reset the field here for the next logout event
        this.isLogoutEventSource = false;
      } else {
        // if logout source was another tab, then this application instance still needs to request logout
        this.signOutImpl({ skipSignoutOtherWindowTabs: true }); // prevent loop by skipping
      }
      // now we can remove the entry to save space
      localStorage.removeItem(
        EgWindowSignoutService.LOCAL_STORAGE_LOGOUT_INDICATOR
      );
    }
  };

  private signoutAllTabsInWindow(): void {
    this.isLogoutEventSource = true;
    localStorage.setItem(
      EgWindowSignoutService.LOCAL_STORAGE_LOGOUT_INDICATOR,
      JSON.stringify({ userName: '', timestamp: new Date().getTime() })
    );
  }

  private navigateToAppRoot(): void {
    void this.router.navigateByUrl('/');
  }
}
