import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import de from '@angular/common/locales/de';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ApiConfigurationParams,
  EdibleGardenApiModule
} from '@eg/edible-garden-api/src/public-api';

import { de_DE, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

registerLocaleData(de);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    EdibleGardenApiModule.forRoot({
      rootUrl: environment.apiRootUrlEdibleGarden
    } as ApiConfigurationParams),
  ],
  providers: [{ provide: NZ_I18N, useValue: de_DE }],
  bootstrap: [AppComponent]
})
export class AppModule {}
