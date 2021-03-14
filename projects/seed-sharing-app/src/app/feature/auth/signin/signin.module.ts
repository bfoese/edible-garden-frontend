import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormErrorsModule } from '@eg-seed/shared/components/form-errors/form-errors.module';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import {
  EgIconModule,
  EgIconRegistry,
  egPasswordOutline,
  egUsernameOutline
} from 'projects/eg-ui-dynamic-icons/src/public-api';

import { AuthFormModule } from '../auth-form/auth-form.module';
import { SocialSigninSignupModule } from '../social-signin-signup/social-signin-signup.module';
import { SignInComponent } from './signin.component';

@NgModule({
  declarations: [SignInComponent],
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
    SocialSigninSignupModule,
    AuthFormModule,
    RouterModule,
    EgIconModule
  ],
  exports: [SignInComponent]
})
export class SignInModule {
  constructor(private iconRegistry: EgIconRegistry) {
    this.iconRegistry.registerIcon(egUsernameOutline, egPasswordOutline);
  }
}
