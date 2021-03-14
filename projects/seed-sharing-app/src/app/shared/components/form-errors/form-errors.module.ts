import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FormErrorsComponent } from './form-errors.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [FormErrorsComponent],
  exports: [FormErrorsComponent]
})
export class FormErrorsModule {}
