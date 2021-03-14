import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { SEED_AUTH_CONFIG } from '@eg-seed/config/auth.config';
import { EG_API_AUTH_SERVICE, EgAuthModule } from '@eg/common/src/eg/auth';
import { AntdI18nModule } from '@eg/common/src/lib/antd';
import { SingletonInjectorRuntimeGuard } from '@eg/common/src/lib/ng/guards/singleton-injector-runtime-guard';
import { AuthenticationService } from '@eg/edible-garden-api/src/public-api';

import { UserService } from './auth/user.service';
import { HttpErrorInterceptor } from './http/http-error.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, EgAuthModule.forRoot(SEED_AUTH_CONFIG), HttpClientModule, AntdI18nModule]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    SingletonInjectorRuntimeGuard.guardSingletonInjector(parentModule);
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true
        },
        { provide: EG_API_AUTH_SERVICE, useExisting: AuthenticationService },
        UserService
      ]
    };
  }
}
