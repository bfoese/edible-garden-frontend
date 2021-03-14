import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { EgAuthFacadeService } from '@eg/common/src/eg/auth';

import { EgIconType } from 'projects/eg-ui-dynamic-icons/src/public-api';
import { Subscription } from 'rxjs';

import { AuthenticatedUserGuard } from '../../../core/auth/authenticated-user.guard';
import { AppLayoutService } from '../../../core/ui/app-layout.service';
import { AppLayoutType } from '../../../core/ui/app-layout.type';
import SeedNav from '../../../service/navigation/seed-nav.constants';

@Component({
  selector: 'seed-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss',
    './header-layout-landscape.component.scss',
    './header-layout-portrait.component.scss'
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  public SeedNav = SeedNav;
  public EgIconType = EgIconType;

  public readonly linkOffer = [{outlets: {'primary': [SeedNav.OfferCreate.relative], 'secondary':[SeedNav.OfferPreview.relative]}}];
  public readonly linkMap = [SeedNav.Map.full, {outlets: {'secondary':null}}];

  private _submenuOpen = false;

  private subscription$ = new Subscription();

  @HostBinding('class') classBinding = '';
  public appLayout: AppLayoutType | null = null;

  public constructor(
    public readonly authService: EgAuthFacadeService,
    public readonly authenticatedUserGuard: AuthenticatedUserGuard,
    private appLayoutService: AppLayoutService
  ) {}

  ngOnInit(): void {
    this.subscription$.add(
      this.appLayoutService.activeLayoutType$.subscribe((type) => {
        this.appLayout = type;
        this.classBinding = [`-${type}` || ''].join(' ');
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  public toggleSubmenu(): void {
    this.submenuOpen = !this.submenuOpen;
  }

  public onSignOut(): void {
    this.authService.signOut();
  }

  public onSecondaryNavEvent(): void {
    if (this.appLayout === 'layout-portrait') {
      this.submenuOpen = false;
    }
  }

  public set submenuOpen(value: boolean) {
    if (this._submenuOpen !== value) {
      this._submenuOpen = value;
    }
  }

  public get submenuOpen(): boolean {
    return this._submenuOpen;
  }
}
