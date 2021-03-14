import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import {
  egEmailOutline,
  EgIconModule,
  EgIconRegistry,
  egInfoCommentOutline,
  egPasswordOutline,
  egUsernameOutline
} from 'projects/eg-ui-dynamic-icons/src/public-api';

import { FormErrorsModule } from '../../../shared/components/form-errors/form-errors.module';
import { AuthFormModule } from '../auth-form/auth-form.module';
import { SocialSigninSignupModule } from '../social-signin-signup/social-signin-signup.module';
import { SignUpComponent } from './signup.component';

@NgModule({
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
    SocialSigninSignupModule,
    AuthFormModule,
    EgIconModule
  ],
  declarations: [SignUpComponent],
  exports: [SignUpComponent]
})
export class SignUpModule {
  constructor(private iconRegistry: EgIconRegistry) {
    this.iconRegistry.registerIcon(egUsernameOutline, egEmailOutline, egPasswordOutline, egInfoCommentOutline);
  }
}
