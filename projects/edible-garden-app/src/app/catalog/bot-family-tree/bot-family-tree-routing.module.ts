import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotFamilyTreeComponent } from './bot-family-tree.component';

const routes: Routes = [{ path: '', component: BotFamilyTreeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotFamilyTreeRoutingModule {}
