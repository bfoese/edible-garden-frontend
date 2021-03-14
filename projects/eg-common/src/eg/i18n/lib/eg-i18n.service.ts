import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ArrayUtils } from '@eg/common/src/lib/utils/array/array.utils';

import { EG_I18N_CONFIG } from './eg-i18n-config.token';
import { EgI18nConfig } from './eg-i18n.config';

@Injectable({
  providedIn: 'root',
})
export class EgI18nService {
  constructor(
    @Inject(LOCALE_ID) protected localeId: string,
    @Inject(EG_I18N_CONFIG)
    private i18nConfig: EgI18nConfig,
    @Inject(DOCUMENT) private document: Document
  ) {}

  public switchLocale(newLocale: string): void {
    if (
      this.localeId !== newLocale &&
      ArrayUtils.contains(this.getAvailableLocales(), newLocale)
    ) {
      const host = window.location.origin;
      const currentPathWithBaseHref = window.location.pathname;

      const newPath = currentPathWithBaseHref.replace(
        this.i18nConfig.localeAppPathPattern,
        `/${newLocale}/`
      );

      if (newPath !== currentPathWithBaseHref) {
        const redirectUrlForNewLocale = `${host}${newPath}`;
        this.document.location.href = redirectUrlForNewLocale;
      }
    }
  }

  public getAvailableLocales(): string[] {
    const available = this.i18nConfig.availableLocales;
    if (ArrayUtils.isEmpty(available)) {
      return [this.localeId];
    }
    return available;
  }

  public getDefaultLocale(): string {
    return this.i18nConfig.defaultLocale ?? this.localeId;
  }

  public getCurrentLocale(): string {
    return this.localeId;
  }
}
