import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { FormErrorsModule } from '../../../shared/components/form-errors/form-errors.module';
import { AddressFormComponent } from './address-form/address-form.component';
import { EgPhoneCountryCodePipe } from './offer-contact/eg-phone-country-code.pipe';
import { OfferContactComponent } from './offer-contact/offer-contact.component';
import { OfferDescSeedComponent } from './offer-desc-seed/offer-desc-seed.component';
import { OfferDescComponent } from './offer-desc/offer-desc.component';
import { OfferEditorComponent } from './offer-editor.component';
import { OfferPriceComponent } from './offer-price/offer-price.component';
import { OfferRoutingModule } from './offer-routing.module';

@NgModule({
  declarations: [
    OfferEditorComponent,
    OfferContactComponent,
    OfferContactComponent,
    OfferDescComponent,
    OfferPriceComponent,
    OfferDescSeedComponent,
    AddressFormComponent,
    EgPhoneCountryCodePipe
  ],
  imports: [
    CommonModule,
    OfferRoutingModule,
    NzDividerModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    FormErrorsModule,
    NzCheckboxModule,
    NzRadioModule,
    NzSelectModule,
    NzMessageServiceModule
  ]
})
export class OfferEditorModule {}
