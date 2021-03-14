/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { BotanicalNodeService } from './services/botanical-node.service';
import { GrowingManualService } from './services/growing-manual.service';
import { MixedCultureService } from './services/mixed-culture.service';
import { SeedSharingService } from './services/seed-sharing.service';
import { SeedSharingOfferService } from './services/seed-sharing-offer.service';
import { SeedSharingAccountService } from './services/seed-sharing-account.service';
import { AuthenticationService } from './services/authentication.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    BotanicalNodeService,
    GrowingManualService,
    MixedCultureService,
    SeedSharingService,
    SeedSharingOfferService,
    SeedSharingAccountService,
    AuthenticationService,
    ApiConfiguration
  ],
})
export class EdibleGardenApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<EdibleGardenApiModule> {
    return {
      ngModule: EdibleGardenApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: EdibleGardenApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('EdibleGardenApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
