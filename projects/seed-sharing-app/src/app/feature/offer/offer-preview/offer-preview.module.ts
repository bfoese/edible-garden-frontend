import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';



import { OfferPreviewRoutingModule } from './offer-preview-routing.module';
import { OfferPreviewComponent } from './offer-preview.component';

@NgModule({
  declarations: [OfferPreviewComponent],
  imports: [
    CommonModule,
    OfferPreviewRoutingModule,
  ]
})
export class OfferPreviewModule { }
