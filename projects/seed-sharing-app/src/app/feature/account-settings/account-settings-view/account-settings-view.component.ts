import { Component, Inject, LOCALE_ID, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeedSharingAccountDto } from '@eg/edible-garden-api/src/public-api';

import { EgIconType } from 'projects/eg-ui-dynamic-icons/src/public-api';
import { Subscription } from 'rxjs';

import { UserService } from '../../../core/auth/user.service';

@Component({
  selector: 'seed-account-settings-view',
  templateUrl: './account-settings-view.component.html',
  styleUrls: ['./account-settings-view.component.scss']
})
export class AccountSettingsViewComponent implements OnDestroy {
  private subscription$ = new Subscription();

  public accountSettings: SeedSharingAccountDto | undefined;

  public EgIconType = EgIconType;

  constructor(
    @Inject(LOCALE_ID) public readonly localeId: string,
    public readonly userService: UserService,
    private route: ActivatedRoute
  ) {
    this.subscription$.add(
      route.data.subscribe((data) => {
        this.accountSettings = data?.accountSettings;
        console.log('profile', this.accountSettings);
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
