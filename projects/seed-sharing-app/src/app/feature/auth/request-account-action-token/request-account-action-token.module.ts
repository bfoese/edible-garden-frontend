import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import {
  egEmailOutline,
  EgIconModule,
  EgIconRegistry
} from 'projects/eg-ui-dynamic-icons/src/public-api';

import { FormErrorsModule } from '../../../shared/components/form-errors/form-errors.module';
import { AuthFormModule } from '../auth-form/auth-form.module';
import { RequestAccountActionTokenComponent } from './request-account-action-token.component';

@NgModule({
  declarations: [RequestAccountActionTokenComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzMessageModule,
    FormErrorsModule,
    NzAlertModule,
    AuthFormModule,
    EgIconModule
  ]
})
export class RequestAccountActionTokenModule {
  constructor(private iconRegistry: EgIconRegistry) {
    this.iconRegistry.registerIcon(egEmailOutline);
  }
}
