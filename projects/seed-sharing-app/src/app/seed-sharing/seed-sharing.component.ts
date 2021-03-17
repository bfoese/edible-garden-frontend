import {
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit
} from '@angular/core';
import { AppLayoutType } from '@eg-seed/core/ui/app-layout.type';
import { BreakpointService } from '@eg-seed/core/ui/breakpoint.service';
import { EgAuthFacadeService } from '@eg/common/src/eg/auth';
import { StringUtils } from '@eg/common/src/lib/utils/string';

import { combineLatest, Subscription } from 'rxjs';

import { AuthenticatedUserGuard } from '../core/auth/authenticated-user.guard';
import { AppLayoutService } from '../core/ui/app-layout.service';
import SeedNav from '../service/navigation/seed-nav.constants';
import { HeaderService } from './header.service';

@Component({
  selector: 'seed-sharing',
  templateUrl: './seed-sharing.component.html',
  styleUrls: ['./seed-sharing.component.scss'],
  providers: [HeaderService]
})
export class SeedSharingComponent implements OnInit, OnDestroy {
  public SeedNav = SeedNav;

  private subscription$ = new Subscription();

  @HostBinding('class') classBinding = '';

  public isSecondaryOutletActive = false;
  public appLayoutType: AppLayoutType | undefined;

  public splitPaneGutterSize: number = 11;

  public constructor(
    public authenticatedUserGuard: AuthenticatedUserGuard,
    private appLayoutService: AppLayoutService,
    private breakpointService: BreakpointService,
    public authService: EgAuthFacadeService,
    private readonly hostElemRef: ElementRef,
    public readonly headerService: HeaderService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.appLayoutService.activeLayoutType$,
      this.breakpointService.active$
    ]).subscribe(([appLayoutType, _breakpoint]) => {
      this.hostElemRef.nativeElement.styles;
      this.appLayoutType = appLayoutType ?? undefined;
      this.classBinding = [`--${appLayoutType}` || ''].join(' ');

      // TODO Refactor into a split pane directive
      this.splitPaneGutterSize =
        this.calcSplitGutterSize(appLayoutType ?? undefined) ?? 11;
    });
  }

  /**
   * Requires re-computing after font size or the custom property for the panel
   * border radius might have changed. At this point, these properties are only
   * dependent on breakpoint size.
   * @returns - Panel border radius in pixels or undefined
   */
  private calcSplitGutterSize(
    appLayoutType: AppLayoutType | undefined
  ): number {
    const computedStyles = this.hostElemRef
      ? getComputedStyle(this.hostElemRef.nativeElement)
      : undefined;
    if (computedStyles) {
      try {
        const fontSizePx = parseFloat(computedStyles.fontSize ?? '0');
        const panelBorderRadiusPx =
          this.getCustomPropertyValueInPx(
            computedStyles,
            '--eg-panel-border-radius',
            fontSizePx
          ) ?? 0;
        const scrollbarWidthPx =
          this.getCustomPropertyValueInPx(
            computedStyles,
            '--eg-scrollbar-width',
            fontSizePx
          ) ?? 0;
        const scrollbarMarginPx =
          this.getCustomPropertyValueInPx(
            computedStyles,
            '--eg-split-panel-scrollbar-margin',
            fontSizePx
          ) ?? 0;

        if (appLayoutType && appLayoutType === 'layout-landscape') {
          return panelBorderRadiusPx + scrollbarWidthPx + scrollbarMarginPx;
        } else {
          return panelBorderRadiusPx;
        }
      } catch (error) {}
    }
    return 0;
  }

  private getCustomPropertyValueInPx(
    computedStyles: CSSStyleDeclaration,
    propertyName: string,
    fontSizePx: number
  ): number | undefined {
    const value: string = propertyName
      ? computedStyles.getPropertyValue(propertyName)
      : '';

    if (value && StringUtils.contains(value, 'em', true)) {
      const emValue = parseFloat(value);

      if (fontSizePx != undefined && emValue != undefined) {
        return fontSizePx * emValue;
      }
    }
    if (value && StringUtils.contains(value, 'px', true)) {
      return parseFloat(value);
    }
    return undefined;
  }

  /**
   * @param $event - Contains a reference to the loaded component
   */
  public onSecondaryOutletActivated($event: any): void {
    this.isSecondaryOutletActive = true;
  }

  /**
   * @param $event - Contains a reference to the loaded component
   */
  public onSecondaryOutletDeactivated($event: any): void {
    this.isSecondaryOutletActive = false;
  }

  public ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
