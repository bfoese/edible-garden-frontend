import { NgModule } from '@angular/core';

import { EgHighlightPipe } from './pipe/highlight.pipe';
import { NutritionDemandPercentPipe } from './pipe/nutrition-demand-percent.pipe';
import { PopularNamePipe } from './pipe/popular-name.pipe';

@NgModule({
  imports: [],
  declarations: [NutritionDemandPercentPipe, PopularNamePipe, EgHighlightPipe],
  providers: [EgHighlightPipe],
  exports: [NutritionDemandPercentPipe, PopularNamePipe, EgHighlightPipe]
})
export class SharedModule {}
