import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { EgWindowRefModule } from '@bfoese/eg-ui-components';
import { SingletonInjectorRuntimeGuard } from '@eg/common/src/lib/ng/guards/singleton-injector-runtime-guard';

import { EgAuthFacadeService } from './eg-auth-facade.service';
import { EgAuthConfig, EgAuthConfigParams } from './eg-auth.config';
import { EgAuthInterceptor } from './eg-auth.interceptor';
import { EgCookieInterceptor } from './eg-cookie.interceptor';
import { EgPreferredLocaleInterceptor } from './eg-preferred-locale.interceptor';

@NgModule({
  imports: [CommonModule, HttpClientModule, EgWindowRefModule],
  exports: [],
  declarations: [],
  providers: []
})
export class EgAuthModule {
  constructor(
  private egAuthConfig: EgAuthConfig, @Optional() @SkipSelf() parentModule?: EgAuthModule) {
    SingletonInjectorRuntimeGuard.guardSingletonInjector(parentModule);
    const egAuthHeaderUris = this.egAuthConfig.authHeaderUris;
    if (!egAuthHeaderUris || egAuthHeaderUris.length === 0) {
      console.debug('[EgAuthModule] Incomplete module configuration: \'authHeaderUris\' is not defined. You shoud define it to indicate which outgoing requests must be enhanced with the authorization header. Without configuation of this property the authorization header will not be attached to any outgoing request.');
    }
  }

  static forRoot(params: EgAuthConfigParams): ModuleWithProviders<EgAuthModule> {
    return {
      ngModule: EgAuthModule,
      providers: [
        {
          provide: EgAuthConfig,
          useValue: params
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: EgAuthInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: EgCookieInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: EgPreferredLocaleInterceptor,
          multi: true
        },
        EgAuthFacadeService
      ]
    };
  }
}
