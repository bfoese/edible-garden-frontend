import { Injectable } from '@angular/core';
import { PRODUCT, THEME } from '@bfoese/eg-ui-models';

import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { AppConfiguration } from './configuration/app-configuration.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private _app: AppConfiguration = new AppConfiguration();
  private _app$: ReplaySubject<AppConfiguration> = new ReplaySubject<AppConfiguration>(
    1
  );

  get app$(): Observable<AppConfiguration> {
    return this._app$.asObservable();
  }

  /**
   * Current value
   */
  get app(): AppConfiguration {
    return this._app;
  }

  get theme$(): Observable<THEME | undefined> {
    return this.app$.pipe(
      map((app) => app.theme),
      distinctUntilChanged()
    );
  }

  get product$(): Observable<PRODUCT | undefined> {
    return this.app$.pipe(
      map((app) => app.product),
      distinctUntilChanged()
    );
  }

  updateApp(appChange: Partial<AppConfiguration>): void {
    this._app.update(appChange);
    this._app.change = appChange;
    this._app$.next(this._app);
  }
}
