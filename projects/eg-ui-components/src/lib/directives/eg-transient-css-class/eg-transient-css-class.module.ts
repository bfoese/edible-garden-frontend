import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EgTransientCssClassDirective } from './eg-transient-css-class.directive';

@NgModule({
  imports: [CommonModule],
  exports: [EgTransientCssClassDirective],
  declarations: [EgTransientCssClassDirective],
  providers: []
})
export class EgTransientCssClassModule {}
