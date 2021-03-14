import {
  Inject,
  Injectable,
  LOCALE_ID,
  Optional,
  SkipSelf
} from '@angular/core';
import { SingletonInjectorRuntimeGuard } from '@eg/common/src/lib/ng/guards/singleton-injector-runtime-guard';
import { JwtUtils } from '@eg/common/src/lib/utils/jwt/jwt.utils';
import { httpRetryStrategy } from '@eg/common/src/lib/utils/rxjs/http-retry.strategy';
import {
  JwtTokenDto,
  SendAccountActionLinkDto,
  SigninResponseDto,
  SigninUserDto,
  SignupUserDto,
  UserDto
} from '@eg/edible-garden-api/src/lib/rest-api/gen/models';
import { PatchPasswordDto } from '@eg/edible-garden-api/src/lib/rest-api/gen/models/patch-password-dto';
import { AuthenticationService } from '@eg/edible-garden-api/src/public-api';

import { JwtPayload } from 'jwt-decode';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import {
  finalize,
  map,
  retryWhen,
  scan,
  share,
  shareReplay,
  startWith,
  switchMap,
  takeWhile,
  tap
} from 'rxjs/operators';

import { EG_API_AUTH_SERVICE } from './eg-api-auth-service.token';
import { EgThirdPartySigninConstants } from './eg-third-party-signin.constants';
import { EgWindowSignoutService } from './eg-window-signout.service';

/**
 * Supposed to be a singleton service within the application.
 */
@Injectable({
  providedIn: 'root'
})
export class EgAuthFacadeService {
  /**
   * Scaling factor for delay time between auth request retries. 1st retry will
   * be delayed for this time. 2nd retry will be delayed twice this time, 3rd
   * retry will be delayed tripple this time...
   */
  private static readonly AUTH_RETRY_SCALING = 2000;

  /**
   * Number of retries for token refresh/ token acquisition in case of errors
   * which indicate that auth server might not be up.
   */
  private static readonly AUTH_RETRY_ATTEMPTS = 5;

  /**
   * Time in seconds needed for refresh with retries and 5sec buffer for network latency.
   */
  private static readonly AUTH_REFRESH_RETRY_TIME =
    EgAuthFacadeService.calcRetryTime() / 1000 - 5;

  public readonly accessToken: BehaviorSubject<
    string | null
  > = new BehaviorSubject<string | null>(null);

  /**
   * Seconds until the access token expires.
   */
  public readonly logoutTime$: BehaviorSubject<
    Date | undefined
  > = new BehaviorSubject<Date | undefined>(undefined);

  public readonly secondsTillLogout$ = new BehaviorSubject<number>(0);

  /**
   * Auth token refresh in action.
   */
  private authTokenRefreshInProgress$: Observable<SigninResponseDto> | null = null;

  public readonly user$: BehaviorSubject<
    UserDto | undefined
  > = new BehaviorSubject<UserDto | undefined>(undefined);

  constructor(
    @Inject(EG_API_AUTH_SERVICE)
    private authenticationService: AuthenticationService,
    private windowSignoutService: EgWindowSignoutService,
    @Inject(LOCALE_ID) protected localeId: string,
    @Optional() @SkipSelf() parent?: EgAuthFacadeService
  ) {
    SingletonInjectorRuntimeGuard.guardSingletonInjector(parent);

    this.initAutoRefreshAuthToken();
  }

  /**
   * Calculating the time in milliseconds which are needed for retry.
   */
  private static calcRetryTime(): number {
    let time = 0;
    for (let i = EgAuthFacadeService.AUTH_RETRY_ATTEMPTS; i > 0; i--) {
      time = i * EgAuthFacadeService.AUTH_RETRY_SCALING;
    }
    return time;
  }

  /**
   * Initializes the recurring routine for refreshing the access-token shortly
   * before the access token reaches expiry time. This will ensure that the user
   * stays authenticated. An alternative approach would have been to use an HTTP
   * interceptor which could have made the refresh request whenever a 401
   * Unauthorized response came in and then redirect the user to the page which
   * resulted in the 401. This would result in fewer requests compared to the
   * auto-refresh approach, but I decided against it, because the UI looks
   * different based on authenticated state (certain links only visible when
   * user is authenticated). Without auto-refresh, options would disappar from the
   * UI on access token expiry and this would not be a good UX.
   */
  private initAutoRefreshAuthToken(): void {
    this.logoutTime$
      .pipe(
        map((logoutTime) =>
          logoutTime
            ? Math.floor((logoutTime.getTime() - new Date().getTime()) / 1000)
            : 0
        ),
        startWith(0),
        switchMap((secondsUntilSessionExpiry) =>
          timer(0, 1000).pipe(scan((acc) => --acc, secondsUntilSessionExpiry))
        ),
        takeWhile((x) => x >= 0),
        tap((second: number) => {
          this.secondsTillLogout$.next(second);
          if (second === EgAuthFacadeService.AUTH_REFRESH_RETRY_TIME) {
            // here we reached the point where we should start refreshing the
            // session to get it done just before our session expires
            this.refreshAuthToken();
          }
        })
      )
      .subscribe();
  }

  public signup(data: SignupUserDto): Observable<boolean> {
    if (data) {
      data.preferredLocale = this.localeId;
    }
    return this.authenticationService.authenticationControllerSignup({
      body: data
    });
  }

  public sendAccountActionEmail(
    data: SendAccountActionLinkDto
  ): Observable<void> {
    return this.authenticationService.authenticationControllerSendAccountActionEmail(
      { body: data }
    );
  }

  public signIn(signinData: SigninUserDto): Observable<SigninResponseDto> {
    return this.authenticationService
      .authenticationControllerSignin({ body: signinData })
      .pipe(
        tap({
          next: (authResult: SigninResponseDto) => {
            this.setSession(authResult);
          }
        }),
        shareReplay()
      );
  }

  public signOut(): void {
    this.windowSignoutService.signOut().subscribe(() => {
      this.setSession(null);
      // this will update the timer
      this.logoutTime$.next(undefined);
    });
  }

  public patchPassword(
    patchPasswordData: PatchPasswordDto
  ): Observable<SigninResponseDto> {
    return this.authenticationService
      .authenticationControllerPatchPassword({ body: patchPasswordData })
      .pipe(
        tap({
          next: (authResult: SigninResponseDto) => {
            this.setSession(authResult);
          }
        }),
        shareReplay()
      );
  }

  /**
   * Underscore in method name makes it package protected in JavaScript
   */
  public _setThirdPartySession(token: string) {
    this.setSession({
      accessToken: { token: token } as JwtTokenDto
    } as SigninResponseDto);
  }

  private setSession(authResult: SigninResponseDto | null): void {
    const accessToken = authResult?.accessToken?.token ?? null;
    const expiry = this.getTokenExpirationDate(accessToken);
    this.logoutTime$.next(expiry ?? undefined);
    this.accessToken.next(accessToken);
    this.user$.next(authResult?.user);
  }

  public isAccessTokenExpired(): boolean {
    const sessionExpiration = this.getTokenExpirationDate(
      this.getSessionToken()
    );
    return sessionExpiration &&
      sessionExpiration.getTime() > new Date().getTime()
      ? false
      : true;
  }

  public getSessionToken(): string | null {
    return this.accessToken.getValue();
  }

  private isRunningInThirdPartySigninWindow(): boolean {
    return (
      window.opener &&
      window.name === EgThirdPartySigninConstants.WINDOW_NAME_ThirdPartySignin
    );
  }

  public refreshAuthToken(): Observable<any> {
    if (this.isRunningInThirdPartySigninWindow()) {
      // This is the app instance opened in a second window which sole purpose
      // is the Google login. Performing a refresh from that window can cause
      // the signin process to fail.
      return of(undefined);
    }

    if (!this.authTokenRefreshInProgress$) {
      this.authTokenRefreshInProgress$ = this.authenticationService
        .authenticationControllerRefresh()
        .pipe(
          share(),
          tap((response: SigninResponseDto) => this.setSession(response)),
          retryWhen(
            httpRetryStrategy({
              maxRetryAttempts: EgAuthFacadeService.AUTH_RETRY_ATTEMPTS,
              scalingDuration: EgAuthFacadeService.AUTH_RETRY_SCALING,
              // 401 means, that we have no or an expired refresh cookie: makes no sense to retry then
              excludedStatusCodes: [500, 401]
            })
          ),
          finalize(() => {
            this.authTokenRefreshInProgress$ = null;
          })
        );
    }
    return this.authTokenRefreshInProgress$!;
  }

  public isSignedIn(): boolean {
    const accessToken = this.accessToken.getValue();
    const expiry: Date | null = accessToken
      ? this.getTokenExpirationDate(accessToken)
      : null;
    return !!expiry && expiry.getTime() > new Date().getTime();
  }

  /**
   * Extracts the expiry date from a JWT
   */
  private getTokenExpirationDate(
    jwtToken: string | null | undefined
  ): Date | null {
    const jwtExpirationTime: number | null | undefined = jwtToken
      ? (JwtUtils.decodePayload(jwtToken) as JwtPayload)?.exp
      : null;
    return jwtExpirationTime
      ? JwtUtils.jwtTimestampToDate(jwtExpirationTime)
      : null;
  }
}
