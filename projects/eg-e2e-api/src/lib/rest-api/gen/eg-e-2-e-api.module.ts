/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AuthenticationE2EService } from './services/authentication-e-2-e.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AuthenticationE2EService,
    ApiConfiguration
  ],
})
export class EgE2EApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<EgE2EApiModule> {
    return {
      ngModule: EgE2EApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: EgE2EApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('EgE2EApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
