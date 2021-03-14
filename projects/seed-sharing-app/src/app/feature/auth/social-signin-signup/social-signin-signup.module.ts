import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import {
  EgIconModule,
  EgIconRegistry,
  egSocialSigninGoogle
} from 'projects/eg-ui-dynamic-icons/src/public-api';

import { SocialSigninSignupComponent } from './social-signin-signup.component';

@NgModule({
  declarations: [SocialSigninSignupComponent],
  imports: [
    CommonModule,
    EgIconModule,
    NzDividerModule,
  ],
  exports: [SocialSigninSignupComponent]
})
export class SocialSigninSignupModule {
  constructor(private iconRegistry: EgIconRegistry) {
    this.iconRegistry.registerIcon(egSocialSigninGoogle);
  }

}
