import { Inject, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InMemoryCache } from '@apollo/client/core';
import { EG_I18N_CONFIG } from '@eg/common/src/eg/i18n';
import { EG_PRODUCT, EgProduct } from '@eg/common/src/eg/injectors/eg-product';
import { AntdI18nModule, AntdI18nService } from '@eg/common/src/lib/antd';
import {
  ApiConfigurationParams,
  EdibleGardenApiModule
} from '@eg/edible-garden-api/src/public-api';

import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SEED_I18N_CONFIG } from './config/i18n.config';
import { CoreModule } from './core/core.module';
import { CountryCodeDataService } from './service/country-code-data.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    EdibleGardenApiModule.forRoot({
      rootUrl: environment.apiRootUrlEdibleGarden
    } as ApiConfigurationParams),
    BrowserModule,
    BrowserAnimationsModule,

    CoreModule.forRoot(),
    AppRoutingModule,
    // ServiceWorkerModule.register('./ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the app is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // }),
    AntdI18nModule, // must be the last entry,
  ],
  providers: [
    CountryCodeDataService,
    { provide: EG_PRODUCT, useValue: { brandName: 'Krautland', productName: 'Keimgut' } as EgProduct },
    { provide: EG_I18N_CONFIG, useValue: SEED_I18N_CONFIG },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache({
          }),
          link: httpLink.create({
            uri: ` ${environment.apiRootUrlEdibleGarden}/edible-garden/graphql`,
          }),
        };
      },
      deps: [HttpLink],
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(LOCALE_ID) protected localeId: string,
    private antdI18nService: AntdI18nService
  ) {
    antdI18nService.switchLocale(localeId, 'en-GB');
  }
}
