import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { SharedModule } from '../../shared/shared.module';
import { GrowingManualCatalogRoutingModule } from './growing-manual-catalog-routing.module';
import { GrowingManualCatalogComponent } from './growing-manual-catalog.component';
import { GrowingManualReqCacheService } from './growing-manual-req-cache.service';

@NgModule({
  imports: [
    CommonModule,
    GrowingManualCatalogRoutingModule,
    ScrollingModule,
    NzListModule,
    NzSkeletonModule,
    NzRateModule,
    NzProgressModule,
    SharedModule,
    FormsModule
  ],
  declarations: [GrowingManualCatalogComponent],
  providers: [GrowingManualReqCacheService]
})
export class GrowingManualCatalogModule {}
