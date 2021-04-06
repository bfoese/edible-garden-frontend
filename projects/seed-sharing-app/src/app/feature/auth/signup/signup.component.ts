import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NamedErrorUtil } from '@bfoese/eg-be-contract/dist';
import { BREAKPOINT } from '@bfoese/eg-ui-models';
import { BreakpointService } from '@eg-seed/core/ui/breakpoint.service';
import { EgAuthFacadeService } from '@eg/common/src/eg/auth';
import { EgI18nService } from '@eg/common/src/eg/i18n';
import { FormUtil } from '@eg/common/src/lib/ng/utils/form';
import { SignupUserDto } from '@eg/edible-garden-api/src/public-api';
import { IFormBuilder, IFormGroup } from '@rxweb/types';

import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EgIconType } from 'projects/eg-ui-dynamic-icons/src/public-api';
import { BehaviorSubject, Subscription } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import SeedNav from '../../../service/navigation/seed-nav.constants';
import { SigninQueryParams } from '../auth-landing/signin-query-params';
import { EgConfirmValidator } from '../shared/confirm.validator';
import { EgPasswordValidator } from '../shared/password.validator';
import { SignupFormData } from './signup-form-data';
import { EgUsernameValidator } from './username.validator';

@Component({
  selector: 'seed-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  public EgIconType = EgIconType;
  public registrationForm!: IFormGroup<SignupFormData>;
  public submitFormInProgress = false;

  /**
   * If server response indicates a unique key violation, the username will be
   * pushed in here. For email address the server will never send a unique key
   * violaion in order to not expose registered user addresses.
   */
  private usernameUniqueViolation$ = new BehaviorSubject<string | null>(null);

  public showInvalidActivationTokenError = false;
  public formLayout: NzFormLayoutType = 'vertical';

  private subscription$ = new Subscription();

  public constructor(
    private readonly fb: FormBuilder,
    private readonly authService: EgAuthFacadeService,
    private messageService: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breakpointService: BreakpointService,
    public readonly i18nService: EgI18nService
  ) {
    this.buildForm();
  }

  public ngOnInit(): void {
    this.subscription$.add(
      this.breakpointService.active$
        .pipe(
          map((activeBreakpoint: BREAKPOINT) => {
            return activeBreakpoint >= BREAKPOINT.SM
              ? 'horizontal'
              : 'vertical';
          }),
          tap((value: NzFormLayoutType) => (this.formLayout = value))
        )
        .subscribe()
    );

    this.subscription$.add(
      this.activatedRoute.queryParams
        .pipe(
          map((queryParams: SigninQueryParams) => {
            this.showInvalidActivationTokenError =
              queryParams?.invalidActivationToken === 'true';
          })
        )
        .subscribe()
    );

    this.usernameUniqueViolation$.subscribe((uniqueViolation) => {
      if (uniqueViolation === null) {
        // prevents error on empty form
        return;
      }
      const usernameCtrl = this.registrationForm.get('username');
      if (usernameCtrl) {
        usernameCtrl.markAsDirty();
        usernameCtrl.updateValueAndValidity();
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  private usernameUniqeValidator: ValidatorFn = (control: AbstractControl) => {
    const ctrlValue = control?.value;
    const notUnique = this.usernameUniqueViolation$.getValue();
    return ctrlValue === notUnique
      ? ({ notUnique: true } as ValidationErrors)
      : null;
  };

  private buildForm(): void {
    this.registrationForm = (<IFormBuilder>this.fb).group<SignupFormData>(
      {
        username: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            EgUsernameValidator(),
            this.usernameUniqeValidator
          ])
        ),
        email: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.email])
        ),
        password: new FormControl(
          '',
          Validators.compose([Validators.required, EgPasswordValidator()])
        ),
        confirmPassword: new FormControl(
          '',
          Validators.compose([Validators.required])
        )
      },
      {
        validators: [EgConfirmValidator('password', 'confirmPassword')],
        updateOn: 'change'
      }
    );
  }

  public submitForm(): void {
    if (this.registrationForm.invalid || !this.registrationForm.value) {
      return; // user could have enabled submit button via dev console
    }

    const formValues = this.registrationForm.value;

    const registrationData: SignupUserDto = {
      email: formValues.email,
      password: formValues.password,
      username: formValues.username,
      preferredLocale: this.i18nService.getCurrentLocale()
    };

    this.submitFormInProgress = true;
    this.authService
      .signup(registrationData)
      .pipe(finalize(() => (this.submitFormInProgress = false)))
      .subscribe(
        (success: boolean) => {
          if (success) {
            this.navigateToSignupSucessPage();
            void this.router.navigate([SeedNav.SignIn.full], {
              queryParams: {
                emailVerificationLinkSent: 'true'
              } as SigninQueryParams,
              queryParamsHandling: 'merge',
              relativeTo: this.activatedRoute
            });
          }
        },
        (error: HttpErrorResponse) =>
          this.handleRegistrationError(error, registrationData)
      );
  }

  private handleRegistrationError(
    error: HttpErrorResponse,
    registrationData: SignupUserDto
  ): void {
    const namedServerError = error?.error?.message;

    if (
      NamedErrorUtil.isError('UniqueKeyConstraintViolation', namedServerError)
    ) {
      this.usernameUniqueViolation$.next(registrationData?.username);
      return;
    }

    if (
      NamedErrorUtil.isError(
        'ActionDeniedConsultEmailAccount',
        namedServerError
      )
    ) {
      // Yes, we want to indicate success. User will get more information about the error in the email.
      this.navigateToSignupSucessPage();
      return;
    }

    // unspecified error
    this.showRegistrationErrorMsg('Account registration failed');
  }

  private showRegistrationErrorMsg(msg: string): void {
    this.messageService.error(msg, {
      nzDuration: 10000
    });
  }

  private navigateToSignupSucessPage() {
    this.resetForm();
    void this.router.navigate([SeedNav.SignIn.full], {
      queryParams: {
        emailVerificationLinkSent: 'true'
      } as SigninQueryParams,
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute
    });
  }

  private resetForm(): void {
    FormUtil.resetForm(this.registrationForm);
  }
}
