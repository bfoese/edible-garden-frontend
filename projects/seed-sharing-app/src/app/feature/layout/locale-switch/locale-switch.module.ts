import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EgI18nModule } from '@eg/common/src/eg/i18n';

import {
  EgIconModule,
  EgIconRegistry,
  egRaindrop
} from 'projects/eg-ui-dynamic-icons/src/public-api';

import { LocaleSwitchComponent } from './locale-switch.component';

@NgModule({
  declarations: [LocaleSwitchComponent],
  imports: [CommonModule, FormsModule, EgI18nModule, EgIconModule],
  providers: [],
  exports: [LocaleSwitchComponent]
})
export class LocaleSwitchModule {
  constructor(private iconRegistry: EgIconRegistry) {
    this.iconRegistry.registerIcon(egRaindrop);
  }
}
