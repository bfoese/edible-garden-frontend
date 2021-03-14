import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BotanicalSpeciesSheetRoutingModule } from './botanical-species-sheet-routing.module';
import { BotanicalSpeciesSheetComponent } from './botanical-species-sheet.component';

@NgModule({
  declarations: [BotanicalSpeciesSheetComponent],
  imports: [CommonModule, BotanicalSpeciesSheetRoutingModule]
})
export class BotanicalSpeciesSheetModule {}
