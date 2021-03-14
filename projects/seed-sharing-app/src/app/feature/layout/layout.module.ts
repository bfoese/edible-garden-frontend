import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EgI18nModule } from '@eg/common/src/eg/i18n';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

import { HeaderModule } from './header/header.module';
import { TimePipe } from './header/time.pipe';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    NzAvatarModule,
    NzPopoverModule,
    NzButtonModule,
    FormsModule,
    EgI18nModule,
    HeaderModule
  ],
  exports: [
  ],
  providers: [TimePipe]
})
export class SeedLayoutModule {}
