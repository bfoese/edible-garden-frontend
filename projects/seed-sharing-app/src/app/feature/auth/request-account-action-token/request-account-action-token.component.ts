import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EgAuthFacadeService } from '@eg/common/src/eg/auth';
import { FormUtil } from '@eg/common/src/lib/ng/utils/form';
import { EnumUtils } from '@eg/common/src/lib/utils/enum/enum.utils';
import { SendAccountActionLinkDto } from '@eg/edible-garden-api/src/public-api';
import { IFormBuilder, IFormGroup } from '@rxweb/types';

import { NzMessageService } from 'ng-zorro-antd/message';
import { EgIconType } from 'projects/eg-ui-dynamic-icons/src/public-api';
import { BehaviorSubject, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SeedNav from '../../../service/navigation/seed-nav.constants';
import { RequestAccountActionTokenType } from './request-account-action-token-type.enum';

type RequestAccountActionTokenFormData = { email: string };

@Component({
  selector: 'seed-resend-account-activation-msg',
  templateUrl: './request-account-action-token.component.html',
  styleUrls: ['./request-account-action-token.component.scss']
})
export class RequestAccountActionTokenComponent implements OnInit, OnDestroy {
  public EgIconType = EgIconType;

  public form!: IFormGroup<RequestAccountActionTokenFormData>;
  public submitFormInProgress = true;
  public SeedNav = SeedNav;
  public RequestAccountActionTokenType = RequestAccountActionTokenType;

  public readonly action$ = new BehaviorSubject<
    RequestAccountActionTokenType | undefined
  >(undefined);

  public showInvalidTokenError = false;

  @Input() set routeParameterAction(
    routeParameterAction: RequestAccountActionTokenType
  ) {
    this.action$.next(routeParameterAction);
  }

  public showEmailSentHint = false;

  private subscription$ = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private authService: EgAuthFacadeService,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = (<IFormBuilder>(
      this.fb
    )).group<RequestAccountActionTokenFormData>({
      email: [
        null,
        [Validators.required, Validators.email] // I do not use the EgUsernameValidator here cause user can input username OR email
      ]
    });

    this.subscription$.add(
      this.activatedRoute.paramMap
        .pipe(
          map((params: ParamMap) =>
            this.mapRouteParameterAction(params.get('action') ?? undefined)
          )
        )
        .subscribe((action) => {
          if (action) {
            this.action$.next(action);
          }
        })
    );

    this.subscription$.add(
      this.activatedRoute.queryParams
        .pipe(
          map((queryParams: any) => {
            this.showInvalidTokenError =
              queryParams?.invalidToken === 'true';
          })
        )
        .subscribe()
    );
  }

  public ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  private mapSendAccountActionLinkPurpose(
    action: RequestAccountActionTokenType | undefined
  ): undefined | 'ResetPassword' | 'VerifyEmail' {
    if (action) {
      switch (action) {
        case RequestAccountActionTokenType.VerifyEmail:
          return 'VerifyEmail';
        case RequestAccountActionTokenType.ResetPassword:
          return 'ResetPassword';
      }
    }
    return undefined;
  }

  private mapRouteParameterAction(
    routeParameter: string | undefined
  ): RequestAccountActionTokenType | undefined {
    if (routeParameter === undefined) {
      return undefined;
    }
    const matchingKey = EnumUtils.getKeys(RequestAccountActionTokenType).filter(
      (key) => {
        const value = RequestAccountActionTokenType[key];
        return value === routeParameter;
      }
    );
    const result =
      matchingKey && matchingKey.length > 0
        ? RequestAccountActionTokenType[matchingKey[0]]
        : undefined;
    return result;
  }

  private resetAllAlerts(): void {
    this.showEmailSentHint = false;
    this.showInvalidTokenError = false;
  }

  public submitForm(): void {
    if (!this.form.valid || !this.form.value) {
      return; // user could have enabled submit button via dev console
    }

    this.resetAllAlerts();

    const formValues = this.form.value;

    const purposeValue = this.mapSendAccountActionLinkPurpose(
      this.action$.getValue()
    );
    if (purposeValue === undefined) {
      return;
    }

    const resendData: SendAccountActionLinkDto = {
      email: formValues.email,
      purpose: purposeValue
    };

    this.submitFormInProgress = true;
    this.authService
      .sendAccountActionEmail(resendData)
      .pipe(finalize(() => (this.submitFormInProgress = false)))
      .subscribe(
        () => {
          FormUtil.resetForm(this.form);

          this.showEmailSentHint = true;
        },
        (error: HttpErrorResponse) =>
          this.handleFormSubmitError(error, resendData)
      );
  }

  private handleFormSubmitError(
    _error: HttpErrorResponse,
    _resendData: SendAccountActionLinkDto
  ): void {
    // Server does not provide error feedback for security reasons, except
    // missing email or unexpected exceptions. Since we made sure, that email is
    // always provided, we don't even need to catch that error here. At this
    // point there probably happened an unspecified exception.
    this.showUnspecifiedErrorMsg(
      `Ooops something went wront,  we couldn't perform the request `
    );
  }

  private showUnspecifiedErrorMsg(msg: string): void {
    this.messageService.error(msg, {
      nzDuration: 5000
    });
  }


}
