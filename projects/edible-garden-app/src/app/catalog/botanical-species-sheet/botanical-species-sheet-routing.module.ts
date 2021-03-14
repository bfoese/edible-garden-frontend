import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BotanicalSpeciesSheetComponent } from './botanical-species-sheet.component';

const routes: Routes = [
  { path: '', component: BotanicalSpeciesSheetComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotanicalSpeciesSheetRoutingModule {}
