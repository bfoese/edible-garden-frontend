/**
 * Contract for our environment.*.ts files to ensure that existence of properties is
 * consistent among each of them.
 */
export interface SeedEnvironment {
  production: boolean;
  apiRootUrlEdibleGarden: string;
  backendBaseUrl: string;
  thirdPartyAuthBaseUrl: string;
  frontendBaseUrl: string;

  authHeaderWhitelist: string[];
  locale: {
    default: 'en'| 'de';
    available: ('en'| 'de')[];
  };
}
