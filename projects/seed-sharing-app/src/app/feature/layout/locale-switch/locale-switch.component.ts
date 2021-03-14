import { Component } from '@angular/core';
import { EgI18nService } from '@eg/common/src/eg/i18n';

import { EgIconType } from 'projects/eg-ui-dynamic-icons/src/public-api';

import { LocaleSwitchService } from './locale-switch.service';

@Component({
  selector: 'seed-locale-switch',
  templateUrl: './locale-switch.component.html',
  styleUrls: ['./locale-switch.component.scss'],
  providers: [LocaleSwitchService]
})
export class LocaleSwitchComponent {

  EgIconType = EgIconType;

  public currentLocale: string | undefined;


  public constructor(
    public readonly i18nService: EgI18nService,
    private localeSwitchService: LocaleSwitchService
  ) {
    this.currentLocale = this.i18nService.getCurrentLocale();
  }

  public onPreferredLocaleChanged(preferredLocale: string): void {
    // localeSwitchService will issue a window location change. so actually we
    // do not need to update our state or listen to anything as the application
    // will be loaded from scratch. I set it here anyway.
    this.currentLocale = preferredLocale;

    // small timeout to have the UI animation visible. the service call will
    // open a new application instance in the current tab
    setTimeout(() => {
      this.localeSwitchService.changePreferredLocale(preferredLocale)
    }, 500);
  }

  public getAvailableLocales(): string[] {
    return this.i18nService.getAvailableLocales();
  }
}
