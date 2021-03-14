import { Injectable } from '@angular/core';
import { WindowRef } from '@bfoese/eg-ui-components';
import { BREAKPOINT, THEME } from '@bfoese/eg-ui-models';
import { EnumUtils } from '@eg/common/src/lib/utils/enum/enum.utils';

import { BehaviorSubject, ReplaySubject } from 'rxjs';

import { BreakpointConfig } from '../../config/breakpoint.config';
import { ConfigurationService } from '../configuration.service';
import { AppConfiguration } from '../configuration/app-configuration.model';

export type ScreenOrientation = 'landscape' | 'portrait';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  private readonly _active$ = new BehaviorSubject<BREAKPOINT>(BREAKPOINT.XS);

  private readonly _activeOrientation$ = new BehaviorSubject<ScreenOrientation>(
    'portrait'
  );

  _rootElement!: HTMLElement;
  rootElement: ReplaySubject<HTMLElement> = new ReplaySubject(1);
  theme!: THEME;

  constructor(
    private windowRef: WindowRef,
    private configurationService: ConfigurationService
  ) {}

  public init(element: HTMLElement): void {
    this._rootElement = element;
    this.rootElement.next(this._rootElement);

    this.configurationService.app$.subscribe(
      (appConfiguration: AppConfiguration) => {
        if (appConfiguration.theme) {
          this.theme = appConfiguration.theme;
          this.getActiveBreakpoint();
        }
      }
    );

    this.windowRef.nativeWindow?.addEventListener('resize', () => {
      this.getActiveBreakpoint();
      this.getActiveOrientation();
    });

    // initial value before first window resize event
    this.getActiveBreakpoint();
    this.getActiveOrientation();
  }

  get active$(): BehaviorSubject<BREAKPOINT> {
    return this._active$;
  }

  get activeOrientation$(): BehaviorSubject<ScreenOrientation> {
    return this._activeOrientation$;
  }

  private getActiveOrientation(): void {
    if (!this.theme) {
      return;
    }

    const isLandscape =
      this.windowRef.nativeWindow.matchMedia(`(orientation: landscape)`)
        ?.matches ?? false;

    const activeOrientation = isLandscape ? 'landscape' : 'portrait';

    if (activeOrientation !== this._activeOrientation$.getValue()) {
      this._activeOrientation$.next(activeOrientation);
    }
  }

  private getActiveBreakpoint(): void {
    if (!this.theme) {
      return;
    }

    let activeBreakpoint: any = null;

    const breakpointKeys = EnumUtils.getKeys(BREAKPOINT).reverse();
    for (const key of breakpointKeys) {

      const breakpointSize = BreakpointConfig.breakpointValue(
        this.theme,
        BREAKPOINT[key]
      );

      const mediaQueryResult = this.windowRef.nativeWindow.matchMedia(
        `(min-width: ${breakpointSize}px)`
      );
      if (mediaQueryResult.matches) {
        activeBreakpoint = BREAKPOINT[key];
        break;
      }
    }

    if (activeBreakpoint !== this.active$.getValue()) {
      this._active$.next(activeBreakpoint);
    }
  }
}
