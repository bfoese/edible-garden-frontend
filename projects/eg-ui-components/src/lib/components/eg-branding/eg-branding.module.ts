import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  EgIconModule,
  EgIconRegistry,
  egSeedLeaf
} from 'projects/eg-ui-dynamic-icons/src/public-api';

import { EgAlternateBrandingFontPipe } from './eg-alternate-branding-font.pipe';
import { EgBrandingComponent } from './eg-branding.component';

@NgModule({
  declarations: [EgBrandingComponent, EgAlternateBrandingFontPipe],
  imports: [CommonModule, EgIconModule],
  providers: [EgAlternateBrandingFontPipe],
  exports: [EgBrandingComponent]
})
export class EgBrandingModule {
  constructor(private iconRegistry: EgIconRegistry) {
    this.iconRegistry.registerIcon(egSeedLeaf);
  }
}
