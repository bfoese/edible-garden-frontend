import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { BREAKPOINT } from '@bfoese/eg-ui-models';
import { BreakpointService } from '@eg-seed/core/ui/breakpoint.service';
import { FormUtil } from '@eg/common/src/lib/ng/utils/form';
import {
  SeedSharingOfferCreationDto,
  SeedSharingOfferDto
} from '@eg/edible-garden-api/src/lib/rest-api/gen/models';
import { SeedSharingOfferService } from '@eg/edible-garden-api/src/public-api';
import { IFormBuilder, IFormGroup } from '@rxweb/types';

import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import { OfferEditorFormData } from './contract/offer-editor-form-data.interface';

@Component({
  selector: 'seed-offer-editor',
  templateUrl: './offer-editor.component.html',
  styleUrls: ['./offer-editor.component.scss']
})
export class OfferEditorComponent implements OnInit {
  public submitFormInProgress = false;

  public offerForm!: IFormGroup<OfferEditorFormData>;

  public formLayout: NzFormLayoutType = 'vertical';

  private subscription$ = new Subscription();

  constructor(
    private messageService: NzMessageService,
    private seedSharingOfferService: SeedSharingOfferService,
    private formBuilder: FormBuilder,
    private breakpointService: BreakpointService
  ) {}
  public ngOnInit(): void {
    this.offerForm = (<IFormBuilder>(
      this.formBuilder
    )).group<OfferEditorFormData>({
      offerDesc: new FormControl(''),
      offerAddress: new FormControl(''),
      offerContact: new FormControl('')
    });

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
  }
  public onSubmit(): void {
    if (this.offerForm.invalid || !this.offerForm.value) {
      return; // user could have enabled submit button via dev console
    }

    const formValues: OfferEditorFormData = this.offerForm.value;

    const createOfferData: SeedSharingOfferCreationDto = {
      address: {
        city: formValues.offerAddress.city,
        countryCode: formValues.offerAddress.countryCode,
        line1: formValues.offerAddress.line1,
        postalCode: formValues.offerAddress.postalCode
      },
      botanicalNodeId: '',

      cultivarEpithet: 'Roter Augsburger',
      cultivationPrinciple: 'organic',
      shareableReproductiveMaterial: 'seed',
      description: formValues.offerDesc.description
    };

    // const registrationData: SeedSharingOfferDto = {

    //   address: {
    //     city: formValues.offerAddress.,
    //     countryCode: undefined,
    //     line1: undefined,
    //     postalCode: undefined
    //   },
    //   botanicalNode: undefined,
    //   cultivarEpithet: undefined,
    //   cultivationPrinciple: undefined,
    //   description: undefined,
    //   entityInfo: undefined,
    //   phoneNumber: undefined,
    //   shareableReproductiveMaterial: undefined,
    //   user: undefined
    // };

    this.submitFormInProgress = true;
    this.seedSharingOfferService
      .seedSharingOfferControllerCreateOffer({ body: createOfferData })
      .pipe(finalize(() => (this.submitFormInProgress = false)))
      .subscribe(
        (success: SeedSharingOfferDto) => {
          if (success) {
            // this.resetForm();
            // this.router.navigate([SeedNav.Authentication.SignIn.relative], {
            //   queryParams: { activationEmailHint: true },
            //   queryParamsHandling: 'merge',
            //   relativeTo: this.activatedRoute,
            // });
          }
        },
        (error: HttpErrorResponse) => this.handleRegistrationError(error)
      );
  }

  private handleRegistrationError(error: HttpErrorResponse): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const backendError = error?.error;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const _namedServerError = backendError ? backendError.message : undefined;

    // unspecified error
    this.showRegistrationErrorMsg('Account registration failed');
  }

  private showRegistrationErrorMsg(msg: string): void {
    this.messageService.error(msg, {
      nzDuration: 10000
    });
  }

  private resetForm(): void {
    FormUtil.resetForm(this.offerForm);
  }
}
