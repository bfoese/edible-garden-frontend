import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EgDualPaneCurtainLayoutComponent } from './dual-pane-curtain-layout.component';

@NgModule({
  declarations: [
    EgDualPaneCurtainLayoutComponent,
  ],
  imports: [CommonModule],
  exports: [
    EgDualPaneCurtainLayoutComponent,
  ]
})
export class EgDualPaneCurtainLayoutModule {}
