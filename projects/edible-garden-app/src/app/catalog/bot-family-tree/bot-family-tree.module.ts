import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';

import { SharedModule } from '../../shared/shared.module';
import { BotFamilyTreeRoutingModule } from './bot-family-tree-routing.module';
import { BotFamilyTreeComponent } from './bot-family-tree.component';

@NgModule({
  declarations: [BotFamilyTreeComponent],
  imports: [
    SharedModule,
    CommonModule,
    BotFamilyTreeRoutingModule,
    NzTreeViewModule,
    NzTreeViewModule,
    NzInputModule,
    FormsModule
  ]
})
export class BotFamilyTreeModule {}
