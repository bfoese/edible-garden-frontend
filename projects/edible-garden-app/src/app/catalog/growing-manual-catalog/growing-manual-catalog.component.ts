import { Component, OnInit } from '@angular/core';
import { GrowingManualDto } from '@eg/edible-garden-api/src/public-api';

import { Observable } from 'rxjs';

import { GrowingManualReqCacheService } from './growing-manual-req-cache.service';

@Component({
  selector: 'eg-growing-manual-catalog',
  templateUrl: './growing-manual-catalog.component.html',
  styleUrls: ['./growing-manual-catalog.component.scss']
})
export class GrowingManualCatalogComponent implements OnInit {
  public growingManual$!: Observable<GrowingManualDto[]>;

  constructor(
    private growingManualReqCacheService: GrowingManualReqCacheService
  ) {}

  ngOnInit(): void {
    this.growingManual$ = this.growingManualReqCacheService.findAll();
  }
}
