import { Injectable } from '@angular/core';

import { NzI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';

@Injectable()
export class AntdI18nService {
  /**
   * Locales registered in package 'ng-zorro-antd/i18n'. List is incomplete,
   * there exist a little bit more, but not every locale. If new locales are
   * introduced to the app, this list should be checked and updated.
   */
  private static readonly NZ_LOCALES: string[] = [
    'ar_EG',
    'az_AZ',
    'bg_BG',
    'by_BY',
    'ca_ES',
    'cs_CZ',
    'da_DK',
    'de_DE',
    'el-GR',
    'en_GB',
    'en_US',
    'es_ES',
    'et_EE',
    'fa_IR',
    'fi_FI',
    'fr_BE',
    'fr_FR',
    'ga_IE',
    'gl_ES',
    'he_IL',
    'hi_IN',
    'hr_HR',
    'hu_HU',
    'hy_AM',
    'it_IT',
    'sl_SI'
  ];

  constructor(private antI18nService: NzI18nService) {}

  /**
   * Switch locale of ng-zorro library components.
   *
   * @param locale - preferred locale in format 'de', 'de-AT' or 'de_AT'. If
   * preferred locale is not available, the language code of the locale will be
   * used to find a fallback which is available in ng-zorro. If no fallback for
   * this language code is being found, the second fallback locale will be used.
   * @param fallback - fallback locale in format 'de', 'de-AT' or 'de_AT'. Will
   * be used if locale and language code of the locale do not have matching
   * locales in ng-zorro.
   */
  public switchLocale(locale: string, fallback: string): void {
    const nzLocale =
      this.getMatchingNzLocale(locale) ?? this.getMatchingNzLocale(fallback);
    if (nzLocale) {
      this.antI18nService.setLocale({ locale: nzLocale } as NzI18nInterface);
    }
  }

  /**
   * Get matching ng-zorro locale for given locale.
   *
   * @param locale - Locale ID in format 'de', 'de-AT' or 'de_AT'
   */
  private getMatchingNzLocale(locale: string): string | undefined {
    if (locale) {
      const antFormat = locale.replace('-', '_');
      if (
        AntdI18nService.NZ_LOCALES.some((antLocale) => antLocale === antFormat)
      ) {
        return antFormat;
      }
      const language = antFormat.substr(0, 2);
      const fallbackLocale = AntdI18nService.NZ_LOCALES.find((antLocale) =>
        antLocale.startsWith(language)
      );
      if (fallbackLocale) {
        console.warn(
          `NZ locale ${locale} does not exist. Use fallback value: ${fallbackLocale}`
        );
      } else {
        console.warn(
          `NZ locale ${locale} does not exist. No fallback defined. Check and update list of available locales!`
        );
      }
      return fallbackLocale;
    }
    return undefined;
  }
}
