import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NamedErrorUtil } from '@bfoese/eg-be-contract/dist';
import { AuthenticatedUserGuard } from '@eg-seed/core/auth/authenticated-user.guard';
import { SigninQueryParams } from '@eg-seed/feature/auth/auth-landing/signin-query-params';
import { NavUtil } from '@eg-seed/service/navigation/nav.util';
import SeedNav from '@eg-seed/service/navigation/seed-nav.constants';
import { EgAuthFacadeService } from '@eg/common/src/eg/auth';
import { FormUtil } from '@eg/common/src/lib/ng/utils/form/form.util';
import {
  SigninResponseDto,
  SigninUserDto
} from '@eg/edible-garden-api/src/lib/rest-api/gen/models';

import { NzMessageService } from 'ng-zorro-antd/message';
import { EgIconType } from 'projects/eg-ui-dynamic-icons/src/public-api';
import { BehaviorSubject, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { EgCredentialsValidator } from './credentials.validator';

@Component({
  selector: 'seed-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  public EgIconType = EgIconType;
  public loginForm!: FormGroup;

  public submitFormInProgress = true;

  private invalidCredentials$ = new BehaviorSubject<SigninUserDto | null>(null);

  public SeedNav = SeedNav;
  public NavUtil = NavUtil;

  public showHint:
    | 'EmailVerificationSuccess'
    | 'EmailVerificationError'
    | 'EmailVerificationRequired'
    | 'InactiveAccountError'
    | 'PasswordChanged'
    | 'EmailVerificationLinkSent'
    | undefined = undefined;

  private subscription$ = new Subscription();

  /** The user can call 'signin' explicitly or implicitly by clicking a link
   * that requires authentication. For implicit routes to signin page we want to
   * redirect the user to the page which was originally requested after signin
   * was successful. This field stores this URL which the user should be
   * redirected to after signin. */
  private redirectAfterLoginUrl: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private authService: EgAuthFacadeService,
    private messageService: NzMessageService,
    private router: Router
  ) {
    // router.getCurrentNavigation() is only available in constructor, not later from other methods!
    this.redirectAfterLoginUrl = this.router.getCurrentNavigation()?.extras?.state?.[
      AuthenticatedUserGuard.NAV_EXTRA_REDIRECT_URL
    ];
  }

  ngOnInit(): void {
    this.subscription$.add(
      this.activatedRoute.queryParams
        .pipe(
          map((queryParams: SigninQueryParams) => {
            if (queryParams?.emailVerificationLinkSent === 'true') {
              this.showHint = 'EmailVerificationLinkSent';
            }
            if (queryParams?.passwordChanged === 'true') {
              this.showHint = 'PasswordChanged';
            }
            if (queryParams?.emailVerified === 'true') {
              this.showHint = 'EmailVerificationSuccess';
            }
            if (queryParams?.emailVerified === 'false') {
              this.showHint = 'EmailVerificationError';
            }
          })
        )
        .subscribe()
    );

    this.loginForm = this.fb.group(
      {
        username: [
          null,
          [Validators.required] // I do not use the EgUsernameValidator here cause user can input username OR email
        ],
        password: [
          null,
          [Validators.required] // I do not use the password pattern validator here in case the pattern changed over time
        ]
      },
      {
        validators: [
          EgCredentialsValidator(
            this.invalidCredentials$,
            'username',
            'password'
          )
        ],
        updateOn: 'change'
      }
    );

    this.invalidCredentials$.subscribe((invalidCredentials) => {
      if (invalidCredentials === null) {
        // prevents error on empty form
        return;
      }

      FormUtil.markControlsAsDirty(this.loginForm);
    });
  }

  public ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  public submitForm(): void {
    if (!this.loginForm.valid) {
      return; // user could have enabled submit button via dev console
    }

    const formValues = this.loginForm.value;

    const loginData: SigninUserDto = {
      password: formValues.password,
      username: formValues.username
    };

    this.resetHintAndErrorMessages();
    this.submitFormInProgress = true;
    this.authService
      .signIn(loginData)
      .pipe(finalize(() => (this.submitFormInProgress = false)))
      .subscribe(
        (result: SigninResponseDto) => {
          if (result) {
            FormUtil.resetForm(this.loginForm);
            if (this.redirectAfterLoginUrl) {
              void this.router.navigate([this.redirectAfterLoginUrl]);
            } else {
              void this.router.navigate([SeedNav.SeedSharing.full]);
            }
          }
        },
        (error: HttpErrorResponse) => this.handleLoginError(error, loginData)
      );
  }

  private resetHintAndErrorMessages(): void {
    this.showHint = undefined;
  }

  private handleLoginError(
    error: HttpErrorResponse,
    loginData: SigninUserDto
  ): void {
    const namedServerError = error?.error?.message;
    if (NamedErrorUtil.isError('InvalidUsernameOrPassword', namedServerError)) {
      this.invalidCredentials$.next(loginData);
      return;
    }

    if (NamedErrorUtil.isError('AccountNotActivated', namedServerError)) {
      this.showHint = 'InactiveAccountError';
      return;
    }

    if (NamedErrorUtil.isError('EmailNotVerified', namedServerError)) {
      this.showHint = 'EmailVerificationRequired';
      return;
    }

    // unspecified error
    this.showLoginErrorMsg('Login failed');
  }

  private showLoginErrorMsg(msg: string): void {
    this.messageService.error(msg, {
      nzDuration: 5000
    });
  }
}
