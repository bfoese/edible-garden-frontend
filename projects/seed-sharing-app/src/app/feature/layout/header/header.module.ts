import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EgI18nModule } from '@eg/common/src/eg/i18n';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { EgBrandingModule } from 'projects/eg-ui-components/src/lib/components/eg-branding';
import { EgTransientCssClassModule } from 'projects/eg-ui-components/src/lib/directives/eg-transient-css-class';
import {
  egActionLeafAdd,
  egActionSignin,
  egActionSignout,
  egActionSignup,
  EgIconModule,
  EgIconRegistry,
  egIllRadish,
  egMenuOptionMore,
  egMenuOptionProfile,
  egPinLeaf
} from 'projects/eg-ui-dynamic-icons/src/public-api';

import { LocaleSwitchModule } from '../locale-switch/locale-switch.module';
import { HeaderComponent } from './header.component';
import { TimePipe } from './time.pipe';

@NgModule({
  declarations: [HeaderComponent, TimePipe],
  imports: [
    CommonModule,
    RouterModule,
    NzAvatarModule,
    NzPopoverModule,
    NzDividerModule,
    NzButtonModule,
    FormsModule,
    EgI18nModule,
    LocaleSwitchModule,
    EgIconModule,
    EgBrandingModule,
    EgTransientCssClassModule
  ],
  exports: [HeaderComponent],
  providers: [TimePipe]
})
export class HeaderModule {
  constructor(private iconRegistry: EgIconRegistry) {
    this.iconRegistry.registerIcon(
      egPinLeaf,
      egActionLeafAdd,
      egMenuOptionMore,
      egActionSignin,
      egActionSignout,
      egMenuOptionProfile,
      egActionSignup,
      egIllRadish
    );
  }
}
