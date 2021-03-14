import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfferEditorComponent } from './offer-editor.component';

const routes: Routes = [
  {
    path: '',
    component: OfferEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule {}
