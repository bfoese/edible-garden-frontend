import { Injectable, Optional, SkipSelf } from '@angular/core';
import { SingletonInjectorRuntimeGuard } from '@eg/common/src/lib/ng/guards/singleton-injector-runtime-guard';
import { AuthenticationService } from '@eg/edible-garden-api/src/public-api';

import { environment } from 'projects/seed-sharing-app/src/environments/environment';
import { fromEvent, Observable, Observer, Subscription } from 'rxjs';
import { filter, finalize, map } from 'rxjs/operators';

import { EgAuthFacadeService } from './eg-auth-facade.service';
import { EgThirdPartySigninWindowMsg } from './eg-third-party-signin-window-msg';
import { EgThirdPartySigninConstants } from './eg-third-party-signin.constants';

/**
 * Supposed to be a singleton service within the application.
 */
@Injectable({
  providedIn: 'root'
})
export class EgThirdPartySigninService {
  /**
   * For third party authentication we need to open a second window. We keep the
   * window instance to be able to automatically close it when authentication is
   * done. This will be the reference to this second window.
   */
  private thirdPartyAuthWindow: Window | undefined;

  constructor(
    private readonly egAuthFacadeService: EgAuthFacadeService,
    @Optional() @SkipSelf() parent?: EgThirdPartySigninService
  ) {
    SingletonInjectorRuntimeGuard.guardSingletonInjector(parent);
  }

  /**
   * This will open a new window to make the backend call for the Google Signin.
   * A new window was necessary, otherwise the Google redirect is blocked due to
   * CORS. If the user has not yet granted the app to signin with google, the
   * new window will show the Google acknowledgment screen. If the user already
   * granted access, the window will be blank. If the user chooses to close the
   * window without consent, the user will stay on its current page without any
   * error being thrown. When giving consent, Google will redirect to the
   * defined backend URL and the backend will call our frontend URL
   * 'auth/third-party-signin' with the result. For this URL the
   * EgThirdPartySigninGuard is active and will check if the current window
   * (which in this case will be the opened Google consent window) has a
   * window.opener (which would be the application instance that was used to
   * initiate the Google signin). If such an opener is present, the guard sends
   * a message to the window of the opener to indicate that the signin process
   * finshed.
   *
   * This method observes the incoming window messages and if a message from the
   * EgThirdPartySigninGuard comes in, the Google consent window will be closed.
   * The guard will forward a message that contains an access token, if signin
   * on server side was successful. This token will be used to init the session.
   *
   * @returns Observable that completes after firing one value. Return value
   * 'true' will indicate, that the user successfully signed in and the
   * application is in a state where authentication protected routes can be
   * accessed. Return value 'false' indicates that the signin process was not
   * sucessfull and the user is not authenticated yet.
   */
  public signInWithGoogle(): Observable<boolean> {
    const googleSigninUrl = `${environment.apiRootUrlEdibleGarden}${AuthenticationService.AuthenticationControllerSigninWithGooglePath}`;

    // window message listener to listen for signup process finshed message from the guard
    const windowMsgs$ = fromEvent<any>(window, 'message');

    let windowMsgsSubscription: Subscription;
    const windowOpenerOrigin = window.origin; // e.g. https://localhost:4200

    const signinResult$ = new Observable((observer: Observer<boolean>) => {
      windowMsgsSubscription = windowMsgs$
        .pipe(
          filter(
            (message) =>
              message.origin === windowOpenerOrigin && // make sure the message is from us
              message.data?.key ===
                EgThirdPartySigninConstants.WINDOW_MSG_ThirdPartySignin_Finished
          ),
          map((message) => message.data)
        )
        .subscribe((msg: EgThirdPartySigninWindowMsg) => {
          if (this.thirdPartyAuthWindow && !this.thirdPartyAuthWindow.closed) {
            this.thirdPartyAuthWindow.close();
          }

          if (msg?.token) {
            this.egAuthFacadeService._setThirdPartySession(msg.token);
            observer.next(true);
            observer.complete();

            // Not needed except for user preferred locale
            // this.egAuthFacadeService
            //   .refreshAuthToken()
            //   .subscribe(
            //     (result) => {
            //       // This is a workaround: currently the server can't access the preferred
            //       // locale from header or query params during 3rd party signin. We have to
            //       // explicitly update the preferred locale from the frontend after the user
            //       // signed in with a 3rd party. It would be enough to do this on inital user
            //       // signup, but frontend does not know if it is the first time for the user.
            //       this.egAccountFacadeService.saveCurrentLocaleAsPreferredLocaleForUser();
            //     },
            //     (error) => {
            //       observer.next(false);
            //     }
            //   );
          }
        });
    }).pipe(finalize(() => windowMsgsSubscription?.unsubscribe()));

    // Open a new window to start the process and prevent CORS exceptions. Window will contain the Google consent dialog.
    this.thirdPartyAuthWindow =
      window.open(
        googleSigninUrl,
        EgThirdPartySigninConstants.WINDOW_NAME_ThirdPartySignin,
        // Choose small window to fit also for mobile. Google consent dialog is responsive.
        'location=1,status=1,scrollbars=1, width=320,height=500'
      ) ?? undefined;

    return signinResult$;
  }
}
