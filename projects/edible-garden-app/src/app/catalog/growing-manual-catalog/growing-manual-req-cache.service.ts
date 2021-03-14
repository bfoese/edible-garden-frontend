import { Injectable } from '@angular/core';
import {
  GrowingManualDto,
  GrowingManualService
} from '@eg/edible-garden-api/src/public-api';

import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GrowingManualReqCacheService {
  private cacheFindAll$!: Observable<GrowingManualDto[]>;

  public constructor(private growingManualService: GrowingManualService) {}

  public findAll(): Observable<GrowingManualDto[]> {
    if (!this.cacheFindAll$) {
      this.cacheFindAll$ = this.growingManualService
        .growingManualControllerFindAll()
        .pipe(shareReplay(1));
    }

    return this.cacheFindAll$;
  }
}
