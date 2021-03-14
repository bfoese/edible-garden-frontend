import { Injectable } from '@angular/core';
import {
  BotanicalNodeService,
  BotanicalTreeNodeDto
} from '@eg/edible-garden-api/src/public-api';

import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BotanicalNodeReqCacheService {
  private cacheFindAll$!: Observable<BotanicalTreeNodeDto[]>;

  public constructor(private botanicalNodeService: BotanicalNodeService) {}

  public getTree(): Observable<BotanicalTreeNodeDto[]> {
    if (!this.cacheFindAll$) {
      this.cacheFindAll$ = this.botanicalNodeService
        .botanicalNodeControllerGetTree()
        .pipe(shareReplay(1));
    }

    return this.cacheFindAll$;
  }
}
