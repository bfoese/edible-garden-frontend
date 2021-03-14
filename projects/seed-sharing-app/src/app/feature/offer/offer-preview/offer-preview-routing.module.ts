import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfferPreviewComponent } from './offer-preview.component';

const routes: Routes = [
  {
    path: '',
    component: OfferPreviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferPreviewRoutingModule {}
