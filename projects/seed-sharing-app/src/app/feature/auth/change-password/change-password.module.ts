import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorsModule } from '@eg-seed/shared/components/form-errors/form-errors.module';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import {
  EgIconModule,
  EgIconRegistry,
  egInfoCommentOutline,
  egPasswordOutline
} from 'projects/eg-ui-dynamic-icons/src/public-api';

import { AuthFormModule } from '../auth-form/auth-form.module';
import { ChangePasswordComponent } from './change-password.component';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzToolTipModule,
    NzPopoverModule,
    NzMessageModule,
    FormErrorsModule,
    NzAlertModule,
    AuthFormModule,
    EgIconModule
  ]
})
export class ChangePasswordModule {
  constructor(private iconRegistry: EgIconRegistry) {
    this.iconRegistry.registerIcon(egPasswordOutline, egInfoCommentOutline);
  }
}
