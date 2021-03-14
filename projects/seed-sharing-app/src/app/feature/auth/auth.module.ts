import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { EgBrandingModule } from 'projects/eg-ui-components/src/lib/components/eg-branding';
import { EgDualPaneCurtainLayoutModule } from 'projects/eg-ui-components/src/lib/layout/dual-pane-curtain-layout';
import {
  EgIconModule,
  EgIconRegistry,
  egIllCucumberBranch
} from 'projects/eg-ui-dynamic-icons/src/public-api';

import { AuthLandingComponent } from './auth-landing/auth-landing.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    EgIconModule,
    EgDualPaneCurtainLayoutModule,
    EgBrandingModule
  ],
  declarations: [AuthComponent, AuthLandingComponent]
})
export class AuthModule {
  constructor(private iconRegistry: EgIconRegistry) {
    this.iconRegistry.registerIcon(egIllCucumberBranch);
  }

  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule
    };
  }
}
