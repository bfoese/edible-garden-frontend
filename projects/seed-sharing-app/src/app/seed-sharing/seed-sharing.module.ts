import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AngularSplitModule } from 'angular-split';

import { HeaderModule } from '../feature/layout/header/header.module';
import { SeedSharingRoutingModule } from './seed-sharing-routing.module';
import { SeedSharingComponent } from './seed-sharing.component';

@NgModule({
  declarations: [SeedSharingComponent],
  imports: [
    CommonModule,
    SeedSharingRoutingModule,
    HeaderModule,
    AngularSplitModule
  ]
})
export class SeedSharingModule {}
