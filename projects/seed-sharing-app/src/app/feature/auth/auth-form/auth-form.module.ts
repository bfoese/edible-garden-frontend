import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EgBrandingModule } from 'projects/eg-ui-components/src/lib/components/eg-branding';

import { AuthFormComponent } from './auth-form.component';

@NgModule({
  declarations: [
    AuthFormComponent,
  ],
  imports: [CommonModule, EgBrandingModule],
  exports: [
    AuthFormComponent,
  ]
})
export class AuthFormModule {}
