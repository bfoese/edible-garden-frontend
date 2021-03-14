export interface EgI18nConfig {
  /**
   * Locales which are available within the application, e.g. 'de', 'en', 'fr'
   */
  availableLocales: string[];
  /**
   * Locale which should be used as default locale
   */
  defaultLocale: string;
  /**
   * Pattern to match the locale for a path which starts with (including) the
   * base href. In the current i18n setup Angular will create the base href
   * containing the locale. The paths look like this: '/en/foo/bar/baz'
   */
  localeAppPathPattern: RegExp;
}
