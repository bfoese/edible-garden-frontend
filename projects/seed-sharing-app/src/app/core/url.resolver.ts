import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { WindowRef } from '@bfoese/eg-ui-components';
import { THEME } from '@bfoese/eg-ui-models';

import { Observable } from 'rxjs';

import { ConfigurationService } from './configuration.service';
import { AppConfiguration } from './configuration/app-configuration.model';
import { CoreModule } from './core.module';
import { SeedUrlPathParams } from './url-path-params';

@Injectable({
  providedIn: CoreModule
})
export class UrlResolver implements Resolve<any> {
  constructor(
    private configurationService: ConfigurationService,
    private windowRef: WindowRef
  ) {}

  resolve(
    route?: ActivatedRouteSnapshot
  ): Observable<any> | Promise<any> | any {
    const appConfig = this.configurationService.app;

    let params: SeedUrlPathParams;

    if (!route) {
      const href = this.windowRef.nativeWindow.location.href;
      // const match = href.match(/\/([A-Za-z]{2}-[A-Za-z]{2})/); // matcher for locale: de-DE
      const match = href.match(/\/([A-Za-z]{2})/); // matcher for language: de

      if (!match) {
        return;
      } else {
        params = {
          locale: match[1]
        };
      }
    } else {
      params = route.params as SeedUrlPathParams;
    }

    const newAppConfig: Partial<AppConfiguration> = {
      theme: THEME.SSD,
    };

    const appConfigChanged = !(
      (
        appConfig.theme === newAppConfig.theme
      )
    );
    if (appConfigChanged) {
      this.configurationService.updateApp(new AppConfiguration(newAppConfig));
    }

    return this.configurationService.app;
  }
}
