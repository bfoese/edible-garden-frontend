import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BREAKPOINT } from '@bfoese/eg-ui-models';
import { BreakpointService } from '@eg-seed/core/ui/breakpoint.service';
import { EgAuthFacadeService } from '@eg/common/src/eg/auth';
import { EgI18nService } from '@eg/common/src/eg/i18n';
import { FormUtil } from '@eg/common/src/lib/ng/utils/form';
import { PatchPasswordDto } from '@eg/edible-garden-api/src/lib/rest-api/gen/models/patch-password-dto';
import { IFormBuilder, IFormGroup } from '@rxweb/types';

import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EgIconType } from 'projects/eg-ui-dynamic-icons/src/public-api';
import { Subscription } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import SeedNav from '../../../service/navigation/seed-nav.constants';
import { SigninQueryParams } from '../auth-landing/signin-query-params';
import { EgConfirmValidator } from '../shared/confirm.validator';
import { EgPasswordValidator } from '../shared/password.validator';
import { ChangePasswordFormData } from './change-password-form-data';

@Component({
  selector: 'seed-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  public EgIconType = EgIconType;
  public changePasswordForm!: IFormGroup<ChangePasswordFormData>;
  public submitFormInProgress = false;

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
      this.activatedRoute.queryParams.subscribe((queryParams) => {
        this.changePasswordForm.patchValue({
          username: queryParams?.username,
          token: queryParams?.token
        } as ChangePasswordFormData);
      })
    );
  }
  public ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  private buildForm(): void {
    this.changePasswordForm = (<IFormBuilder>(
      this.fb
    )).group<ChangePasswordFormData>(
      {
        username: new FormControl(''), // is a hidden field for accessability
        token: new FormControl(''),
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
    if (this.changePasswordForm.invalid || !this.changePasswordForm.value) {
      return; // user could have enabled submit button via dev console
    }

    const formValues = this.changePasswordForm.value;

    const changePasswordData = {
      password: formValues.password,
      token: formValues.token
    } as PatchPasswordDto;

    this.submitFormInProgress = true;
    this.authService
      .patchPassword(changePasswordData)
      .pipe(finalize(() => (this.submitFormInProgress = false)))
      .subscribe(
        () => {
          this.resetForm();
          void this.router.navigate([SeedNav.SignIn.full], {
            queryParams: {
              passwordChanged: 'true'
            } as SigninQueryParams,
            queryParamsHandling: 'merge'
          });
        },
        (error: HttpErrorResponse) =>
          this.handleRegistrationError(error, changePasswordData)
      );
  }

  private handleRegistrationError(
    _error: HttpErrorResponse,
    _patchPasswordData: PatchPasswordDto
  ): void {
    // TODO handle errors
    this.showRegistrationErrorMsg('Changing password failed');
  }

  private showRegistrationErrorMsg(msg: string): void {
    this.messageService.error(msg, {
      nzDuration: 10000
    });
  }

  private resetForm(): void {
    FormUtil.resetForm(this.changePasswordForm);
  }
}
