import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EgWindowRefModule } from '@bfoese/eg-ui-components';
import { SingletonInjectorRuntimeGuard } from '@eg/common/src/lib/ng';

import { EgAccountFacadeService } from './eg-account-facade.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, EgWindowRefModule],
  exports: [],
  declarations: [],
  providers: [EgAccountFacadeService]
})
export class EgAccountModule {
  constructor(
  @Optional() @SkipSelf() parentModule?: EgAccountModule) {
    SingletonInjectorRuntimeGuard.guardSingletonInjector(parentModule);
  }
}
