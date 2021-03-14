import { Injectable } from '@angular/core';
import { BREAKPOINT } from '@bfoese/eg-ui-models';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AppLayoutType } from './app-layout.type';
import { BreakpointService } from './breakpoint.service';

export type ScreenOrientation = 'landscape' | 'portrait';

@Injectable({
  providedIn: 'root'
})
export class AppLayoutService {
  private readonly _activeLayoutType$ = new BehaviorSubject<AppLayoutType | null>(
    null
  );

  constructor(private breakpointService: BreakpointService) {
    combineLatest([
      this.breakpointService.active$,
      this.breakpointService.activeOrientation$
    ])
      .pipe(
        map(
          ([activeBreakpoint, activeOrientation]): AppLayoutType => {
            if (activeBreakpoint < BREAKPOINT.MD) {
              return activeOrientation === 'landscape'
                ? 'layout-landscape'
                : 'layout-portrait';
            }
            return 'layout-landscape';
          }
        ),
        tap((value: AppLayoutType) => {
          if (this._activeLayoutType$.getValue() !== value) {
            this._activeLayoutType$.next(value);
          }
        })
      )
      .subscribe();
  }

  get activeLayoutType$(): BehaviorSubject<AppLayoutType | null> {
    return this._activeLayoutType$;
  }
}
