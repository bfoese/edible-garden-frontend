import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrowingManualCatalogComponent } from './growing-manual-catalog.component';

const routes: Routes = [{ path: '', component: GrowingManualCatalogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrowingManualCatalogRoutingModule {}
